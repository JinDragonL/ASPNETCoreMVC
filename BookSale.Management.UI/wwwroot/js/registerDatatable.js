function registerDatatable(elementName, columns, urlApi) {

    $(elementName).DataTable({
        scrollY: ($(window).height() - 400),
        scrollX: true,
        processing: true,
        serverSide: true,
        columns: columns,
        ajax: {
            url: urlApi,
            type: 'POST',
            dataType: 'json'
        }
    });


}