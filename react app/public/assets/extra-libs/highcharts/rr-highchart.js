    
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
                        $('.loader-sp').addClass('hidden');
                    },
                    error: function (request, status, error) {
                        $('.loader-sp').addClass('hidden');
                        console.log('RRates: error fetching json. :- '+error);
                        $('#rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                    }
                });
                $('.loader-sp').addClass('hidden');
            },
            error: function (request, status, error) {
                $('.loader-sp').addClass('hidden');
                console.log('RRates: error fetching json. :- '+error);
                $('#rrchart').html('<div class ="alert alert-danger"><strong>Graph Error</strong><br/>Failed to load this graph. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });

        function plotGraph(rrData, onData){
            var rrjson = rrData;
            var ouid = rrjson.metaData.dimensions.ou[0];
            var thetitle = rrjson.metaData.items['JPaviRmSsJW.REPORTING_RATE'].name;
            var thesubtitle = rrjson.metaData.items[ouid].name;
            var allmonths = rrjson.metaData.dimensions.pe;
            var monthswithdata = rrjson.rows;
            
            var dummydata =[];
            var theorigdate = [];
            var minid8=[];
            var matched_data=[];
            var fulldate_arr=[];
            var theinfo=[];
            var actualdatarr=[];
            var filez = [];
            var alld8=[];

            
            $.each(monthswithdata, function (index, ydate) {
                var date8 = ydate[1];
                var data8 = ydate[3];
                theorigdate.push(date8);
                var ydata = parseFloat(data8).toFixed(2);
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
                minid8.push(date8);
                // converted_date_arr.push(nudate);
            });
            var xc = 0;
            var finalRRdata = [];
            var finalRRmonths = [];
            $.each(allmonths, function (index, eachallmonths) {
                // theinfo = giveVal(monthswithdata, eachallmonths);
                for(x=0;x<monthswithdata.length;x++){
                    var array1=monthswithdata[x];
                    if(array1[1]==eachallmonths){
                        var findata = parseFloat(array1[2]);
                        console.log('findata: '+JSON.stringify(findata));
                        finalRRdata.push(findata);
                        finalRRmonths.push(array1[1]);
                        xc=0;
                        break;
                    }else xc=1;
                 
                }
                if(xc == 1){
                    finalRRdata.push(parseFloat(0));
                    finalRRmonths.push(eachallmonths);
                    xc = 0;
                }
            });
            // console.log('allmonths: '+JSON.stringify(monthswithdata));
            // console.log('allmonths.Length: '+JSON.stringify(allmonths.length));
            // console.log('monthswithdata: '+JSON.stringify(monthswithdata));
            // console.log('monthswithdata.Length: '+JSON.stringify(monthswithdata.length));
            console.log('final: '+JSON.stringify(finalRRdata));
            console.log('months: '+JSON.stringify(finalRRmonths));

            
            //////////////////////////////////////////ontime
                var onjson = onData;
                var ouid2 = onjson.metaData.dimensions.ou[0];
                var allmonths2 = onjson.metaData.dimensions.pe;
                var monthswithdata2 = onjson.rows;
                
                var theorigdate2 = [];
                var converted_date_arr2 = [];
                var matched_full_dates2=[];
                var matched_data2=[];
                var fulldate_arr2=[];
                var actualdatarr2=[];
                var ondatarr=[];
                $.each(monthswithdata2, function (index, ydate2) {
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
                    //UID Fix
                    nudate2 = date82;
                    //End UID Fix
                    converted_date_arr2.push(nudate2);
                });

                $.each(allmonths2, function (index, eachallmonths22) {
                    var dateful2 = onjson.metaData.items[eachallmonths22].name;
                    fulldate_arr2.push(dateful2);
                });

                $.each(fulldate_arr2, function(idx, fulldate_val2) {
                    if ($.inArray(fulldate_val2, theorigdate2) !== -1) {
                        matched_full_dates2.push(fulldate_val2);
                    }
                    var seriesval2 = 0;
                    $.each(monthswithdata2, function (index, rr_row12) {
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
                    categories: finalRRmonths
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
                    data: finalRRdata
                }, {
                    name: 'OT: '+thesubtitle,
                    data: ondatarr,
                    color: '#f93535'
                }]
            });
            // end Highcharts
        }

        $('.loader-sp').addClass('hidden');
        $('.rrdata').removeClass('hidden');
    }