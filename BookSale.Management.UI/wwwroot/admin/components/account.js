(function () {

    const elementName = "#tbl-account";
    const columns = [
        {
            data: 'id', name: 'id', width: '30',
            render: function (key) {
                return `
                    <span data-key="${key}">
                        <a href="/admin/account/savedata?id=${key}"><i class="sl-icon-pencil"></i></a> &nbsp;
                                            <a href="#" class="btn-delete"><i class="sl-icon-trash"></i></a>
                    </span>
                `;
            }
        },
        { data: 'username', name: 'username', autoWidth: true },
        { data: 'fullname', name: 'fullname', autoWidth: true },
        { data: 'email', name: 'email', autoWidth: true },
        { data: 'phone', name: 'phone', autoWidth: true },
        { data: 'isActive', name: 'isActive', width: '100' }
    ];

    const urlApi = "/admin/account/getaccountpagination";

    registerDatatable(elementName, columns, urlApi);

    $(document).on('click', '.btn-delete', function () {

        const self = $(this);

        const key = self.closest('span').data('key');

        fetch(`account/delete?id=${key}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': $('input[name="_RequestVerificationToken"]').val()
            }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);

                //should check if successful
                self.closest('tr').remove();
            })
            .catch(error => {
                console.error('Error:', error);
            });

    });

})();