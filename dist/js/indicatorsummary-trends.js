function getTrends(the_url) {
    $.ajax({
        type: "GET",
        url: the_url,
        crossDomain: true,
        success: function (data) {
            $('.isstate').addClass('hidden');
            $('.loader-sp.is-sub').addClass('hidden');
            $('#indi-trends').removeClass('hidden');
            
            // var thedata = [];
            // var the_periods = [];
            // $.each(data.metaData.dimensions.dx, function (indx, one_dx) {
            //     var data_foreach_commo = {};
            //     data_foreach_commo['name'] = data.metaData.items[one_dx].name;
            //     data_foreach_commo['data'] = [];
            //     $.each(data.metaData.dimensions.pe, function (indx2, one_pe) {
            //         the_periods.push(data.metaData.items[one_pe].name);
            //         var datapoint = 0;
            //         $.each(data.rows, function (indx3, one_row) { 
            //             if(one_row[0] == one_dx){
            //                 datapoint = datapoint + 1;
            //             }
            //         });
            //         data_foreach_commo['data'].push(datapoint);
            //     });
            //     thedata.push(data_foreach_commo);
            // });


            var commo_name = '';
            var thedata = [];
            var the_periods = [];
            $.each(data.metaData.dimensions.dx, function (indx, one_dx) {
                commo_name = data.metaData.items[one_dx].name;
                var overstock_arr = {};
                overstock_arr['name'] = 'Overstocked';
                overstock_arr['data'] = [];
                var stockok_arr = {};
                stockok_arr['name'] = 'Stocked according to plan';
                stockok_arr['data'] = [];
                var understock_arr = {};
                understock_arr['name'] = 'Understocked';
                understock_arr['data'] = [];
                $.each(data.metaData.dimensions.pe, function (indx2, one_pe) {
                    var overstock = 0;
                    var stockok = 0;
                    var understock = 0;
                    the_periods.push(data.metaData.items[one_pe].name);

                    var rows_filteredby_period = filterItems(data.rows,one_pe);
                    var rows_filteredby_dx_period = filterItems(rows_filteredby_period,one_dx);
                    console.log("rows_filteredby_dx_period: "+JSON.stringify(rows_filteredby_dx_period));
                    

                    $.each(rows_filteredby_dx_period, function (indx3, one_row) {
                        var row_val = one_row[3];
                        if(row_val>6){
                            overstock++;
                        }
                        if(row_val>=3 && row_val<=6){
                            stockok++;
                        }
                        if(row_val>0 && row_val<3){
                            understock++;
                        }
                    });
                    // overstock_arr['data'].push(overstock);
                    // stockok_arr['data'].push(stockok);
                    // understock_arr['data'].push(understock);
                });
                thedata.push(overstock_arr);
                // thedata.push(stockok_arr);
                // thedata.push(understock_arr);
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
                    text: 'Commodity: '+commo_name
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


function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}