(function () {
 
    function initial() {

        $(document).ready(function () {
            registerPlugin();
            registerPaypal();
            registerEvent();
        });
    }

    function registerPlugin() {
        $('.address').tooltip({
            html: true,
            trigger: 'hover focus',
            template: '<div class="tooltip"><div class="tooltip-inner"></div></div>',
        });
    }

    function registerPaypal() {
        paypal.Buttons({
            createOrder: function (data, action) {
                return action.order.create({
                    "purchase_units": [
                        {
                            "amount": {
                                "currency_code": "USD",
                                "value": "1"
                            },
                            "items": []
                        }
                    ]
                })
            },
            onApprove: function (data, action) {
                return action.order.capture().then(function (response) {
                    console.log(response);

                    if (response?.status === "COMPLETED") {
                        $('#OrderId').val(response.id);
                    }
                })
            },
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'paypal'
            }
        }).render('#paypal-button-container');
    }

    function registerEvent() {
        $(document).on('click', '#btn-address', function () {
            $('#modal-address').modal('show');
        });
    }


    initial();

})();