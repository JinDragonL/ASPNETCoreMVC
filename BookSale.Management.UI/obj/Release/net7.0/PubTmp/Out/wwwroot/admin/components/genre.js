(function () {

    const elementName = "#tbl-genre";
    const columns = [
        {
            data: 'id', name: 'id', width: '30',
            render: function (key) {
                return `
                    <span data-key="${key}">
                        <a href="#" class="btn-edit"><i class="sl-icon-pencil"></i></a> &nbsp;
                        <a href="#" class="btn-delete"><i class="sl-icon-trash"></i></a>
                    </span>
                `;
            }
        },
        { data: 'name', name: 'name', autoWidth: true }
    ];

    const urlApi = "/admin/genre/getgenrepagination";

    registerDatatable(elementName, columns, urlApi);

    //$(document).on('click', '.btn-delete', function () {

    //    const key = $(this).closest('span').data('key');

    //    $.ajax({
    //        url: `/admin/account/delete/${key}`,
    //        dataType: 'json',
    //        method: 'POST',
    //        success: function (response) {

    //            if (!response) {
    //                showToaster("Error", "Delete failed.");
    //                return;
    //            }

    //            $(elementName).DataTable().ajax.reload();
    //            showToaster("Success", "Delete successful");
    //        }
    //    })
    //});

    $(document).on('click', '#btn-add', function () {
        $('#Id').val(0);
        $('#Name').val('');
        $('#genre-modal').modal('show');
    });

    $(document).on('click', '.btn-edit', function () {

        const key = $(this).closest('span').data('key');

        //const name = $(this).closest('tr').find('td:eq(1)').text();

        //$('#Id').val(key);
        //$('#Name').val(name);
        $.ajax({
            url: `/admin/genre/getbyid?id=${key}`,
            method: "GET",
            success: function (response) {
                mapObjectToControlView(response);
                $('#genre-modal').modal('show');
            },
            error: function (error) {

            }
        });

        $('#genre-modal').modal('show');
    });


    $('#formGenre').submit(function (e) {
        e.preventDefault();

        const formData = $(this).serialize();

        $.ajax({
            url: $(this).attr('action'),
            method: $(this).attr('method'),
            data: formData,
            success: function (response) {
                console.log(response);

                //$(elementName).DataTable().ajax.reload();
                //showToaster("Success", "Delete successful");
                $('#genre-modal').modal('hide');
            },
            error: function (error) {

            }
        })
    })

})();