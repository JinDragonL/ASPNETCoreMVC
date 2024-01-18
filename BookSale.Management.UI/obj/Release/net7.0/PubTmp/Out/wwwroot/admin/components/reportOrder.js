(function () {

    function intial() {
        registerDatePicker();
        registerEvents();
    }

    function registerDatePicker() {
        jQuery('#date-range').datepicker({
            toggleActive: true,
            format: 'dd/mm/yyyy'
        });

        const start = new Date();
        const end = new Date();

        start.setDate(end.getDate() - 7);

        const startStr = formateDateDDMMYYYY(start);
        const endStr = formateDateDDMMYYYY(end);

        $('#date-range input[name=start]').datepicker('setDate', startStr);
        $('#date-range input[name=end]').datepicker('setDate', endStr);

        function formateDateDDMMYYYY(date) {
            if (date) {
                const day = `0${date.getDate()}`.slice(-2);
                const month = `0${date.getMonth() + 1}`.slice(-2);

                return `${day}/${month}/${date.getFullYear()}`;
            }
        }
    }

    function registerEvents() {
        $(document).on('click', '#btn-submit', function () {
            const { from, to, genreId, status } = getFilterData();
            location.href = `/admin/report?from=${from}&to=${to}&genreId=${genreId}&status=${status}`;
        });

        $(document).on('click', '#btn-export', function () {
            const { from, to, genreId, status } = getFilterData();
            location.href = `/admin/report/exportExcelOrder?from=${from}&to=${to}&genreId=${genreId}&status=${status}`;
        });
    }

    function getFilterData() {
        const from = $('#start').val();
        const to = $('#end').val();

        if (!from || !to) {
            showToaster('Warning', 'Please select from and to');
            return;
        }

        const genreId = $('#ddl-genre').val();
        const status = $('#ddl-status').val();

        return { from, to, genreId, status };
    }

    intial();

})();