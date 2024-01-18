(function () {

    function initial() {
        registerEvents();
    };

    function registerEvents() {

        $(document).on('click', '#btn-load-more', function () {
            $.blockUI();

            const genreId = $('#current-genre').val();
            const pageIndex = parseInt($('#current-page-index').val()) + 1;

            $.ajax({
                url: `/shop/getbooksbypagination?genre=${genreId}&pageIndex=${pageIndex}`,
                method: 'GET',
                success: function (response) {
                    if (response) {

                        let html = '';

                        response.books.forEach((book, index) => {

                            html += `<div class="col-lg-3 col-md-4 col-sm-6 col-12  mb-2">
                                        <div class="product">
                                            <div class="product__thumb">
                                                <a class="first__img" href="#">
                                                    <img src="/images/book/${book.id}.png" alt="book image" height="300" class="img-book">
                                                </a>
                                                <span class="hot-label">BEST SALLER</span>
                                            </div>
                                            <div class="product__content mt-2">
                                                <div class="product__title">
                                                    <h6>${book.title}</h6>
                                                </div>
                                                <ul class="prize d-flex">
                                                    <li class="orig">${formatCurrencyVN(book.cost)}
                                                    </li>
                                                </ul>
                                                <div class="action">
                                                    <div class="actions_inner">
                                                        <ul class="add_to_links d-flex">
                                                            <li><a class="cart" href="#"><i class="fa fa-eye"></i></a></li>
                                                            <li><a class="wishlist btn-add-cart" href="#" data-code="${book.code}"><i class="fa fa-shopping-cart"></i></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;

                        });

                        $('#content-book').append(html);

                        $('#txt-pagination').html(`${response.currentRecord} items of ${response.totalRecord}`);

                        if (response.isDisable) {
                            $('#btn-load-more').attr('disabled', 'disabled');
                        }

                        $('#current-page-index').val(pageIndex);

                        $('#progressbar').attr('style', `width: ${response.progressingValue}%`);

                        $.unblockUI();
                    }
                }
            })
        });
    }

    initial();
})();