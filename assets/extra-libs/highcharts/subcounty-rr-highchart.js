$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1/pmi/json/subcountiesrates.json',
    success: function (data) {
        var scjson = data;
        
        countiesdata=scjson.rows;

        var thecounties = [];
        var therate = [];
        $.each(countiesdata, function (index, acounty) {
            thecounties.push(acounty[1]);
            therate.push(parseFloat(acounty[2]));
        });





        // Highcharts
        Highcharts.chart('sc_rrchart', {
            data: {
                table: 'datatable'
            },
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Latest reporting rate by Sub-County (MCF)'
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: 'Units'
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.point.y + ' ' + this.point.name.toLowerCase();
                }
            }
        });


        
        Highcharts.chart('sc_rrchart', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Latest Reporting Rate by Sub-County (MCF)'
            },
            subtitle: {
                text: ' '
            },
            exporting: {
                enabled: false
            },
            xAxis: {
                categories: thecounties,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'Reporting Rate (%)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Sub-County RR',
                data: therate
            }]
        });
        // end Highcharts
    },
    error: function (request, status, error) {
        console.log('Subcounty-RRates: error fetching json. :- '+error);
        $('#sc_rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});