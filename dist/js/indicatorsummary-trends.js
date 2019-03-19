function getTrends(the_url) {
    $.ajax({
        type: "GET",
        url: the_url,
        crossDomain: true,
        success: function (data) {
            $('.isstate').addClass('hidden');
            $('.loader-sp.is-sub').addClass('hidden');
            $('#indi-trends').removeClass('hidden');
            
            var thedata = [];
            var the_periods = [];
            $.each(data.metaData.dimensions.dx, function (indx, one_dx) {
                var data_foreach_commo = {};
                data_foreach_commo['name'] = data.metaData.items[one_dx].name;
                data_foreach_commo['data'] = [];
                $.each(data.metaData.dimensions.pe, function (indx2, one_pe) {
                    the_periods.push(data.metaData.items[one_pe].name);
                    var datapoint = 0;
                    $.each(data.rows, function (indx3, one_row) { 
                        // console.log('dx:'+one_dx+' == rw: '+one_row[0]);
                        if(one_row[0] == one_dx){
                            datapoint = datapoint + 1;
                        }
                    });
                    data_foreach_commo['data'].push(datapoint);
                });
                thedata.push(data_foreach_commo);
            });
                
    
            // HighCharts
            Highcharts.chart('indi-trends', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Stock Status Trend For The Last 6 Months'
                },
                subtitle: {
                    // text: 'Source: Dhis2'
                    text: ' '
                },
                xAxis: {
                    categories: the_periods
                },
                yAxis: {
                    title: {
                        text: 'Number of Facilities'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: thedata
            });
            // HighCharts
        },
        error: function (request, status, error) {
            $('.loader-sp.is-sub').addClass('hidden');
            $('#indi-trends').addClass('hidden');
            $('.isstate').addClass('hidden');
            console.log('IS: error fetching json. :- '+error);
            $('.isstate').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}
