using BookSale.Management.Application.Abstracts;
using BookSale.Management.Application.DTOs.Book;
using BookSale.Management.Application.DTOs.Cart;
using BookSale.Management.Application.DTOs.Order;
using BookSale.Management.Application.DTOs.User;
using BookSale.Management.Application.Services;
using BookSale.Management.Domain.Enums;
using BookSale.Management.Domain.Setting;
using BookSale.Management.Infrastruture.Services;
using BookSale.Management.UI.Models;
using BookSale.Management.UI.Ultility;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BookSale.Management.UI.Controllers
{
    public class CheckOutController : Controller
    {
        private readonly IUserAddressService _userAddressService;
        private readonly IBookService _bookService;
        private readonly ICartService _cartService;
        private readonly IOrderService _orderService;
        private readonly IEmailService _emailService;

        public CheckOutController(IUserAddressService userAddressService,
            IBookService bookService,
            ICartService cartService,
            IOrderService orderService,
            IEmailService emailService)
        {
            _userAddressService = userAddressService;
            _bookService = bookService;
            _cartService = cartService;
            _orderService = orderService;
            _emailService = emailService;
        }
        public async Task<IActionResult> Index(string returnUrl)
        {
            UserAddressDTO addressDTO = new UserAddressDTO();

            IEnumerable<UserAddressDTO> addressDTOs = new List<UserAddressDTO>();

            if (HttpContext.User.Identity!.IsAuthenticated)
            {
                ViewBag.Books = await GetCartFromSessionAsync();

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                addressDTOs = await _userAddressService.GetUserAddressListForSiteAsync(userId);
                ViewBag.AddressDTO = addressDTOs;
            }
            else
            {
                return RedirectToAction("", "Login", new { ReturnUrl = returnUrl });
            }

            return View(addressDTO);
        }

        private List<CartModel>? GetSessionCart()
        {
            return HttpContext.Session.Get<List<CartModel>>(CommonConstant.CartSessionName);
        }

        [HttpPost]
        public async Task<IActionResult> CompleteCart(UserAddressDTO userAddressDTO)
        {
            string codeOrder = $"ORDER_{DateTime.Now.ToString("ddMMyyyyhhmmss")}";

            if (ModelState.IsValid)
            {
                string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

                var books = await GetCartFromSessionAsync();

                userAddressDTO.UserId = userId;

                var addressId = await _userAddressService.SaveAsync(userAddressDTO);

                var cart = new CartRequestDTO
                {
                    CreatedOn = DateTime.Now,
                    Code = $"CART_{DateTime.Now.ToString("ddMMyyyyhhmmss")}",
                    Status = StatusProcessing.New,
                    Books = books.ToList()
                };

                var cartResult = await _cartService.SaveAsync(cart);

                if(cartResult)
                {
                    var order = new OrderRequestDTO
                    {
                        Books = books.ToList(),
                        CreatedOn = DateTime.Now,
                        Code = codeOrder,
                        PaymentMethod = userAddressDTO.PaymentMethod,
                        Status = StatusProcessing.New,
                        TotalAmount = 0,
                        UserId = userId,
                        AddressId = addressId,
                        Id = userAddressDTO.PaymentMethod == PaymentMethod.Paypal ? userAddressDTO.OrderId : Guid.NewGuid().ToString()
                    };

                    var orderResult = await _orderService.SaveAsync(order);

                    if (orderResult)
                    {
                        var emailInfo = new EmailSetting
                        {
                            Name = "Mr Test",
                            To = "****@gmail.com",
                            Subject = "Your order is be processing",
                            Content = @$"<h2>Checkout Complete</h2>
                                    <p style='color:red;'>Thanks for your order! Your order number is: {codeOrder}</p>"
                        };

                        await _emailService.Send(emailInfo);

                        HttpContext.Session.Remove(CommonConstant.CartSessionName);
                    }
                    else
                    {
                        ModelState.AddModelError("error", "Create order failed.");
                    }
                }
                else
                {
                    ModelState.AddModelError("error", "Process cart failed.");
                }
            }

            ViewBag.OrderCode = codeOrder;

            return View();
        }

        private async Task<IEnumerable<BookCartDTO>> GetCartFromSessionAsync()
        {
            List<BookCartDTO> bookCartDTOs = new List<BookCartDTO>();

            var carts = GetSessionCart();

            if (carts is not null)
            {
                var codes = carts.Select(x => x.BookCode).ToArray();

                var books = await _bookService.GetBooksByListCodeAsync(codes);

                books = books.Select(book =>
                {
                    var item = carts.FirstOrDefault(x => x.BookCode == book.Code);

                    if (item is not null)
                    {
                        book.Quantity = item.Quantity;
                    }

                    return book;
                });

                bookCartDTOs = books.ToList();
            }

            return bookCartDTOs;
        }
    }
}
