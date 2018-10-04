        $.ajax({
            type: 'GET',
            url: 'https://test.hiskenya.org/kenya/api/29/analytics.json?dimension=dx:JPaviRmSsJW.REPORTING_RATE&dimension=pe:201805;LAST_12_MONTHS&filter=ou:N7YETT3A9r1&displayProperty=NAME&outputIdScheme=NAME',
            
            success: function (data) {
                var rrjson = data;
                var thetitle = rrjson.metaData.items['JPaviRmSsJW.REPORTING_RATE'].name;
                var thesubtitle = rrjson.metaData.items.N7YETT3A9r1.name;
                var dimes_pe = rrjson.metaData.dimensions.pe;
                var rr_rows = rrjson.rows;
                
                var dummydata =[];
                var theorigdate = [];
                var converted_date_arr = [];
                var matchd8s=[];
                var matched_full_dates=[];
                var matched_data=[];
                var fulldate_arr=[];
                var actualdatarr=[];
                $.each(rr_rows, function (index, ydate) {
                    var date8 = ydate[1];
                    var data8 = ydate[2];
                    theorigdate.push(date8);
                    var ydata = parseFloat(ydate[2]).toFixed(2);
                    matched_data.push(ydata);
                    var month8 = date8.substr(0, date8.indexOf(" "));
                    var year8 = date8.replace(month8+' ','');
                    if(month8 == 'January'){ 
                        var nudate = year8+'01';
                    } if(month8 == 'February'){ 
                        var nudate = year8+'02';
                    } if(month8 == 'March'){ 
                        var nudate = year8+'03';
                    } if(month8 == 'April'){ 
                        var nudate = year8+'04';
                    } if(month8 == 'May'){ 
                        var nudate = year8+'05';
                    } if(month8 == 'June'){ 
                        var nudate = year8+'06';
                    } if(month8 == 'July'){ 
                        var nudate = year8+'07';
                    } if(month8 == 'August'){ 
                        var nudate = year8+'08';
                    } if(month8 == 'September'){ 
                        var nudate = year8+'09';
                    } if(month8 == 'October'){ 
                        var nudate = year8+'10';
                    } if(month8 == 'November'){ 
                        var nudate = year8+'11';
                    } if(month8 == 'December'){ 
                        var nudate = year8+'12';
                    }
                    converted_date_arr.push(nudate);

                });

                


                $.each(dimes_pe, function (index, exdate) {
                    var dateful = rrjson.metaData.items[exdate].name;
                    fulldate_arr.push(dateful);
                    
                });

                $.each(fulldate_arr, function(idx, fulldate_val) {
                    if ($.inArray(fulldate_val, theorigdate) !== -1) {
                        matched_full_dates.push(fulldate_val);
                    }
                    var seriesval = 0;
                    $.each(rr_rows, function (index, rr_row1) {
                        if(fulldate_val == rr_row1[1]){
                            seriesval = rr_row1[2];
                            actualdatarr.push(parseFloat(seriesval));
                        }
                    });

                });

                var mchdl = actualdatarr.length;
                while (mchdl < 12) {
                    var zer0 = parseFloat(0);
                    actualdatarr.push(zer0);
                    mchdl++
                }


                // Highcharts
                Highcharts.chart('rrchart', {
                    chart: {
                        type: 'line'
                    },
                    exporting: {
                        enabled: false
                    },
                    title: {
                        text: thetitle
                    },
                    credits: {
                        enabled: false
                    },
                    subtitle: {
                        text: thesubtitle
                    },
                    xAxis: {
                        title: {
                            text: 'Period'
                        },
                        categories: dimes_pe
                    },
                    yAxis: {
                        title: {
                            text: 'Reporting rate (%)'
                        },
                        categories: [0, 20, 40, 60, 80, 100],
                        max: 100,
                        showFirstLabel: false
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: 'RR: '+thesubtitle,
                        data: actualdatarr
                    }]/*, {
                        name: 'OT',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]*/
                });
                // end Highcharts

            },
            error: function (request, status, error) {
                console.log('RRates: error fetching json. :- '+error);
                $('#rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });
