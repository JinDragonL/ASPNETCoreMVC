(function () {

    function initial() {
        registerEvents();
    }

    function registerEvents() {

        $(document).on('blur', '.txt-quantity-cart', function () {

            const self = $(this);
            const parentTr = self.closest('tr');

            const price = parseInt(parentTr.find('.txt-price').text().replaceAll('₫', '').replaceAll('.',''));
            const quantity = parseInt(self.val());

            const total = price * quantity;

            parentTr.find('.txt-total').text(formatCurrencyVN(total));

            calculateCartTotal();

        });

        function calculateCartTotal() {
            let totalCart = 0;
            const trs = $('#tbody-cart tr');

            for (var i = 0; i < trs.length; i++) {
                if (i === $('#tbody-cart tr').length - 1) {
                    break;
                }

                const total = parseInt($(trs[i]).find('.txt-total').text().replaceAll('₫', '').replaceAll('.', ''));

                totalCart += total;
            }

            $('#txt-total-cart').text(formatCurrencyVN(totalCart));
        }

        $(document).on('click', '#btn-save-cart', function () {

            $.blockUI();

            const trs = $('#tbody-cart tr');

            let books = [];

            for (var i = 0; i < trs.length; i++) {
                if (i === $('#tbody-cart tr').length - 1) {
                    break;
                }

                const quantity = parseInt($(trs[i]).find('.txt-quantity-cart').val());
                const code = $(trs[i]).data('code');

                books.push({ bookCode: code, quantity });
            }

            $.ajax({
                url: '/cart/update',
                method: 'POST',
                data: JSON.stringify(books),
                contentType: 'application/json',
                success: function (response) {
                    if (response) {
                        showToaster('Success', 'Save cart successful');
                    }

                    $.unblockUI();
                },
                error: function () {
                    $.unblockUI();
                }
            })

        });

        $(document).on('click', '.btn-delete-cart', function () {

            const self = $(this);
            const code = self.closest('tr').data('code');

            $.ajax({
                url: `cart/delete?code=${code}`,
                method: 'POST',
                success: function (response) {
                    if (response) {
                        self.closest('tr').remove();
                        calculateCartTotal();

                        const amountItems = $('#tbody-cart tr').length - 1;
                        $('.cart-number').text(amountItems);
                        showToaster('Success', 'Delete cart successful');

                        if (!amountItems) {
                            $('#btn-checkout').addClass('disable-link');
                        }
                    }
                }
            })
        });
    }

    initial();

})();