$(document).ready(function () {

    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    initial();

    function initial() {
        loadDataChartOrder();
        registerEvents();
    }

    function loadDataChartOrder() {

        const genreId = $('#ddl-genre').val();

        $.ajax({
            url: `/admin/chart/getDataOrderByGenre?genreId=${genreId}`,
            method: 'GET',
            success: function (response) {

                if (!response?.length) {
                    return;
                }

                const colors = ['#670e94', '#f0d917', '#f9f962', '#000080', '#00c3e3', '#e52b50'];

                const result = response.map((item, index) => {
                    return { ...item, itemStyle: { color: colors[index] } }
                });

                intialChartOrder(result, genreId);
            }
        });
    }

    function intialChartOrder(dataSource, genreId) {

        genreId = parseInt(genreId);

        let options = {
            legend: {
                show: true,
            },
        };

        myChart.setOption(options);

       options = {
            title: {
                text: 'Order By Genre',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return `${params.data.value} ${(genreId ? ' products' : ' orders')}`;
                }
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: dataSource
                }
            ]
        };

        if (genreId) {
            options.legend = {
                show: false
            }
        }

        myChart.setOption(options);
    }

    function registerEvents() {

        $(document).on('change', '#ddl-genre', function () {
            loadDataChartOrder();
        });
    }
});

