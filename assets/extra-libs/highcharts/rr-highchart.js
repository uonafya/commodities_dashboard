    
    function fetchRR(rrurl, onurl){
        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: rrurl,
            
            success: function (rrData) {
                $.ajax({
                    type: 'GET',
                    crossDomain: true,
                    url: onurl,
                    
                    success: function (onData) {
                        plotGraph(rrData, onData);
                    },
                    error: function (request, status, error) {
                        console.log('RRates: error fetching json. :- '+error);
                        $('#rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                    }
                });
            },
            error: function (request, status, error) {
                console.log('RRates: error fetching json. :- '+error);
                $('#rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });

        function plotGraph(rrData, onData){
            var rrjson = rrData;
            var ouid = rrjson.metaData.dimensions.ou[0];
            console.log(ouid);
            var thetitle = rrjson.metaData.items['JPaviRmSsJW.REPORTING_RATE'].name;
            var thesubtitle = rrjson.metaData.items[ouid].name;
            console.log(thesubtitle);
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

            //////////////////////////////////////////ontime
            var onjson = onData;
            var ouid2 = onjson.metaData.dimensions.ou[0];
            console.log(ouid2);
            var dimes_pe2 = onjson.metaData.dimensions.pe;
            var rr_rows2 = onjson.rows;
            
            var dummydata22 =[];
            var theorigdate2 = [];
            var converted_date_arr2 = [];
            var matchd8s2=[];
            var matched_full_dates2=[];
            var matched_data2=[];
            var fulldate_arr2=[];
            var actualdatarr2=[];
            var ondatarr=[];
            $.each(rr_rows2, function (index, ydate2) {
                var date82 = ydate2[1];
                var data82 = ydate2[2];
                var ondt = parseFloat(ydate2[3]);
                ondatarr.push(ondt);
                theorigdate2.push(date82);
                var ydata2 = parseFloat(ydate2[2]).toFixed(2);
                matched_data2.push(ydata2);
                var month82 = date82.substr(0, date82.indexOf(" "));
                var year82 = date82.replace(month82+' ','');
                if(month82 == 'January'){ 
                    var nudate2 = year82+'01';
                } if(month82 == 'February'){ 
                    var nudate2 = year82+'02';
                } if(month82 == 'March'){ 
                    var nudate2 = year82+'03';
                } if(month82 == 'April'){ 
                    var nudate2 = year82+'04';
                } if(month82 == 'May'){ 
                    var nudate2 = year82+'05';
                } if(month82 == 'June'){ 
                    var nudate2 = year82+'06';
                } if(month82 == 'July'){ 
                    var nudate2 = year82+'07';
                } if(month82 == 'August'){ 
                    var nudate2 = year82+'08';
                } if(month82 == 'September'){ 
                    var nudate2 = year82+'09';
                } if(month82 == 'October'){ 
                    var nudate2 = year82+'10';
                } if(month82 == 'November'){ 
                    var nudate2 = year82+'11';
                } if(month82 == 'December'){ 
                    var nudate2 = year82+'12';
                }
                converted_date_arr2.push(nudate2);
            });

            $.each(dimes_pe2, function (index, exdate22) {
                var dateful2 = onjson.metaData.items[exdate22].name;
                fulldate_arr2.push(dateful2);
                
            });

            $.each(fulldate_arr2, function(idx, fulldate_val2) {
                if ($.inArray(fulldate_val2, theorigdate2) !== -1) {
                    matched_full_dates2.push(fulldate_val2);
                }
                var seriesval2 = 0;
                $.each(rr_rows2, function (index, rr_row12) {
                    if(fulldate_val2 == rr_row12[1]){
                        seriesval2 = rr_row12[2];
                        actualdatarr2.push(parseFloat(seriesval2));
                    }
                });
            });

            var mchdl2 = actualdatarr2.length;
            while (mchdl2 < 12) {
                var zer02 = parseFloat(0);
                actualdatarr2.push(zer02);
                mchdl2++
            }

            var ondatalength = ondatarr.length;
            while (ondatalength < 12) {
                var addedZero = parseFloat(0);
                ondatarr.push(addedZero);
                ondatalength++
            }
            //////////////////////////////////////////end ontime
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
                }, {
                    name: 'OT: '+thesubtitle,
                    data: ondatarr,
                    color: '#f93535'
                }]
            });
            // end Highcharts
        }
    }