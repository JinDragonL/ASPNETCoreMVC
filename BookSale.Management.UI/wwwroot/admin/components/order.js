(function () {

    const elementName = "#tbl-order";
    const columns = [
        {
            data: 'id', name: 'id', width: '30',
            render: function (key) {
                return `
                    <span data-key="${key}">
                        <a href="/admin/order/savedata?id=${key}" title="Edit"><i class="sl-icon-pencil"></i></a> &nbsp;
                        <a href="#" class="btn-delete" title="Delete"><i class="sl-icon-trash"></i></a> &nbsp;
                        <a href="/admin/report/ExportPdfOrder?id=${key}" title="Export report"><i class="sl-icon-arrow-down-circle"></i> </a>
                    </span>
                `;
            }
        },
        { data: 'fullname', name: 'fullname', autoWidth: true },
        { data: 'code', name: 'code', autoWidth: true },
        {
            data: 'createdOn', name: 'createdOn', width: "100px",
            render: function (data) {
                return `<div class="text-center">${moment(data).format("DD/MM/YYYY")}</div>`
            }
        },
        {
            data: 'totalPrice', name: 'totalPrice', width: "80px", render: function (data) {

                return `<div class="text-right">${formatCurrencyVN(data)}</div>`
            }
        },
        { data: 'paymentMethod', name: 'paymentMethod', width: "100px" },
        {
            data: 'status', name: 'status', width: "100px", render: function (data) {
                return `<div class="text-center ">${formatStatus(data)}</div>`
            } },
    ];

    const urlApi = "/admin/order/getbypagination";

    registerDatatable(elementName, columns, urlApi);

    $(document).on('click', '.btn-delete', function () {

        //const key = $(this).closest('span').data('key');

        //$.ajax({
        //    url: `/admin/account/delete/${key}`,
        //    dataType: 'json',
        //    method: 'POST',
        //    success: function (response) {

        //        if (!response) {
        //            showToaster("Error", "Delete failed.");
        //            return;
        //        }
                
        //        $(elementName).DataTable().ajax.reload();
        //        showToaster("Success", "Delete successful");
        //    }
        //})

    });

    function formatStatus(data) {

        switch (data.toLowerCase()) {
            case 'new':
                return `<span class="badge badge badge-info">${data}</span>`;
            case 'processing':
                return `<span class="label label-warning font-weight-100">${data}</span>`;
            case 'cancel':
                return `<span class="label label-danger font-weight-100">${data}</span>`;
            default:
                return `<span class="label label-success font-weight-100">${data}</span>`;
        }
    }

})();