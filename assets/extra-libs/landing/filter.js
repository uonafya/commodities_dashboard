function filterMain(countyid, subcountyid, periodid) {

        if (countyid == null) {
                countyid = 'tAbBVBbueqD';
        }

        if (subcountyid != null) {
                countyid = subcountyid;
        }

        if (periodid != null) {
                periodid = periodid;
        } else {
                periodid = '201805';
        }

        //load the mos by commodity
        var url = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr;Y4O2r9a9QRQ;DUnK0MqACvs;goYRWZ7kJAA;R4VD8EvRxyN&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //populate dropdown with list of counties
        $.ajax({
                type: "GET",
                url: url,
                beforeSubmit: function () {
                        $('.loader-sp.t_four').addClass('hidden');
                        $('#mosbycombox').removeClass('hidden');
                        $('.t_four_state').addClass('hidden');
                },
                success: function (data) {
                        //create the org units array
                        var orgunits = [];
                        var dxids = [];
                        var mosVals = new Array();
                        //apply the lableing to the data
                        var theperiod = data.metaData.dimensions.pe[0];
                        var theorgunit = data.metaData.dimensions.ou[0];
                        var curorg = data.metaData.items[theorgunit].name;
                        var curpe = data.metaData.items[theperiod].name;
                        $("h4.titlelabel").html(curorg + ' - ' + curpe);
                        //end apply labeling to the data
                        //var tableData = '<table>';
                        var tableData = '';
                        //console.log(data.rows);
                        //loop through the org units							
                        $.each(data.metaData.dimensions.dx, function (key, entry) {
                                $.each(data.rows, function (rkey, rentry) {
                                        var dxcode = rentry[0];
                                        if (dxcode == entry) {
                                                mosVals.push(parseFloat(rentry[2]));
                                        }
                                })
                        })
                        //define the min max value MOS
                        var minmos = 3;
                        var maxmos = 6;
                        var maxyaxis = 15;
                        if (theorgunit == 'tAbBVBbueqD') {
                                minmos = 9;
                                maxmos = 18;
                                maxyaxis = 24;
                        }
                        //end min max
                        //draw the chart
                        Highcharts.chart('mosbycombox', {
                                chart: {
                                        type: 'bar'
                                },
                                title: {
                                        text: 'MOS By Commodity'
                                },
                                subtitle: {
                                        text: 'Source: HIS Kenya'
                                },
                                xAxis: {
                                        categories: ['AL6', 'AL12', 'AL18', 'AL24', 'AL all', 'AS inj', 'SP tabs', 'RDTs'],
                                        title: {
                                                text: null
                                        }
                                },
                                yAxis: {
                                        min: 0,
                                        max: maxyaxis,
                                        title: {
                                                text: 'Months of Stock',
                                                align: 'high'
                                        },
                                        plotLines: [{
                                                        color: '#FF0000',
                                                        width: 2,
                                                        value: minmos,
                                                        label: {
                                                                text: 'Min',
                                                                align: 'right'
                                                        }
                                                },
                                                {
                                                        color: '#00FF00',
                                                        width: 2,
                                                        value: maxmos,
                                                        label: {
                                                                text: 'Max',
                                                                align: 'right'
                                                        }
                                                }
                                        ],
                                        labels: {
                                                overflow: 'justify'
                                        }
                                },
                                tooltip: {
                                        valueSuffix: ' MOS'
                                },
                                plotOptions: {
                                        bar: {
                                                dataLabels: {
                                                        enabled: true
                                                }
                                        }
                                },
                                legend: {
                                        layout: 'vertical',
                                        align: 'right',
                                        verticalAlign: 'top',
                                        x: -40,
                                        y: 80,
                                        floating: true,
                                        borderWidth: 1,
                                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                        shadow: true
                                },
                                credits: {
                                        enabled: false
                                },
                                series: [{
                                        name: 'MOS',
                                        data: mosVals
                                }]
                        });
                        $('.loader-sp.t_four').addClass('hidden');
                        $('#mosbycombox').removeClass('hidden');
                        $('.t_four_state').addClass('hidden');
                },
                error: function (error) {
                        $('.loader-sp.t_four').addClass('hidden');
                        $('#mosbycombox').addClass('hidden');
                        $('.loader-sp.t_four').addClass('hidden');
                        console.log('MainDash: error fetching json. :- '+error);
                        $('.t_four_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                }
        });


        //% of health facilities
        var urlfa = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr;DUnK0MqACvs;goYRWZ7kJAA;R4VD8EvRxyN&dimension=ou:' + countyid + ';LEVEL-5&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //define the name holder
        var itemnames = ["AL6", "AL12", "AL18", "AL24", "AS inj", "SP tabs", "RDTs"];

        //parse the data for mos percentage

        $.ajax({
                type: "GET",
                url: urlfa,
                beforeSubmit: function (param) {
                        $('.t_one.loader-sp').removeClass('hidden');
                        $('.malaria_commodity_table.t_one').addClass('hidden');
                        $('.t_one_state').addClass('hidden');
                        $('.percent_healthfa').addClass('hidden');
                },
                success: function (data) {      
                        var orgunits = data.metaData.dimensions.ou;
                        //console.log(orgunits.length);
                        //added
                        //get the total expected to report
                        var totalorgs = getExpectedUnits(countyid, periodid);
                        //var tableData = '<table>';
                        var tableData = '';
                        //console.log(data.rows);
                        //loop through the org units
                        var countname = 0;
                        $.each(data.metaData.dimensions.dx, function (key, entry) {
                                //define the variables to hold the counter
                                var overstock = 0;
                                var stockok = 0;
                                var understock = 0;
                                //define the table
                                tableData += '<tr>';
                                tableData += '<td>' + itemnames[countname] + '</td>';
                                //console.log(data.metaData.items[entry].name);
                                //for each dimension get the value
                                $.each(data.rows, function (rkey, rentry) {
                                        var dxid = rentry[0];
                                        var mosval = parseFloat(rentry[2]);

                                        if (dxid == entry) {
                                                //console.log(mosval);
                                                if (mosval > 6) {
                                                        overstock++;
                                                }
                                                if (mosval >= 3 && mosval <= 6) {
                                                        stockok++;
                                                }
                                                if (mosval > 0 && mosval < 3) {
                                                        understock++;
                                                }
                                        }
                                })
                                countname++;
                                var overpercent = (overstock / totalorgs) * 100;
                                var okpercent = (stockok / totalorgs) * 100;
                                var underpercent = (understock / totalorgs) * 100;

                                tableData += '<td bgcolor="#ffeb9c">' + overpercent.toFixed(1) + '%</td>';
                                tableData += '<td bgcolor="#c6efce">' + okpercent.toFixed(1) + '%</td>';
                                tableData += '<td bgcolor="#ffc7ce">' + underpercent.toFixed(1) + '%</td>';
                                tableData += '</tr>';
                        })

                        //tableData += '<table>';	
                        //console.log(tableData)
                        $("table.percent_healthfa tbody").empty();
                        $("table.percent_healthfa tbody").append(tableData);
                        $('.t_one.loader-sp').addClass('hidden');
                        $('.malaria_commodity_table.t_one').removeClass('hidden');
                        $('.percent_healthfa').removeClass('hidden');
                        //$('#zero_config').DataTable();
                },
                error: function (error) {
                        $('.loader-sp.t_one').addClass('hidden');
                    $('.percent_healthfa').addClass('hidden');
                    $('malaria_commodity_table.t_one').addClass('hidden');
                    $('.loader-sp.t_one').addClass('hidden');
                    console.log('MainDash: error fetching json. :- '+error);
                    $('.t_one_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                }
        });


        //parse the data for mos number
        $.ajax({
                type: "GET",
                url: urlfa,
                beforeSubmit: function () {
                        $('.t_two.loader-sp').removeClass('hidden');
                        $('.t_two_state').removeClass('hidden');
                        $('.number_healthfa').addClass('hidden');
                        $('.malaria_commodity_table.t_two').addClass('hidden');
                },
                success: function (data) {     
                        var orgunits = data.metaData.dimensions.ou;
                        //console.log(orgunits.length);
                        //added
                        //get the total expected to report
                        var totalorgs = getExpectedUnits(countyid, periodid);
                        //var tableData = '<table>';
                        var tableData = '';
                        //console.log(data.rows);
                        //loop through the org units
                        var countname = 0;
                        $.each(data.metaData.dimensions.dx, function (key, entry) {
                                //define the variables to hold the counter
                                var overstock = 0;
                                var stockok = 0;
                                var understock = 0;
                                var stockout = 0;
                                var nomos = 0;

                                //define the table
                                tableData += '<tr>';
                                tableData += '<td>' + itemnames[countname] + '</td>';
                                //console.log(data.metaData.items[entry].name);

                                //for each dimension get the value
                                $.each(data.rows, function (rkey, rentry) {
                                        var dxid = rentry[0];
                                        var mosval = parseFloat(rentry[2]);

                                        if (dxid == entry) {
                                                //console.log(mosval);
                                                if (mosval > 6) {
                                                        overstock++;
                                                }
                                                if (mosval >= 3 && mosval <= 6) {
                                                        stockok++;
                                                }
                                                if (mosval > 0 && mosval < 3) {
                                                        understock++;
                                                }
                                                if (mosval <= 0) {
                                                        stockout++;
                                                }
                                        }
                                })
                                countname++;
                                nomos = totalorgs - (overstock + stockok + understock + stockout)

                                tableData += '<td bgcolor="#ffeb9c">' + overstock + '</td>';
                                tableData += '<td bgcolor="#c6efce">' + stockok + '</td>';
                                tableData += '<td bgcolor="#ffc7ce">' + understock + '</td>';
                                tableData += '<td bgcolor="#ff0000">' + stockout + '</td>';
                                tableData += '<td>' + nomos + '</td>';
                                tableData += '<td>' + totalorgs + '</td>';

                                tableData += '</tr>';
                        })

                        //tableData += '<table>';	
                        //console.log(tableData)
                        $("table.number_healthfa tbody").empty();
                        $("table.number_healthfa tbody").append(tableData);
                        $('.t_two.loader-sp').addClass('hidden');
                        $('.number_healthfa').removeClass('hidden');
                        $('.malaria_commodity_table.t_two').removeClass('hidden');
                        //$('#zero_config').DataTable();
                },
                error: function (error) {
                        $('.loader-sp.t_two').addClass('hidden');
                        $('.number_healthfa').addClass('hidden');
                        $('.loader-sp.t_two').addClass('hidden');
                        console.log('MainDash: error fetching json. :- '+error);
                        $('.t_two_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                }
        });



        //parse adjusted consumption and physical count
        //parse the data for mos number
        //adjc FA
        var urlcon = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:Wg31yLDAehm;CK20eip3oTe;BiwM8SUgpJ1;KLoeF6isJCz;jwofVi31cHY;nvJsVaN8FOB;f5mBCkj0aSu;iMHDfVvYm0W&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //physical count/SOH    
        var urlphy = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;MUxtqmB3VL6;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //get the physical count into an array
        var sohval = [];

        var alnames = ["AL6", "AL12", "AL18", "AL24", "AL all", "AS inj", "SP tabs", "RDTs"];

        $.getJSON(urlphy, function (data) {
                var counter = 0;
                $.each(data.metaData.dimensions.dx, function (key, entry) {
                        //console.log(entry);              
                        var valsoh = getSOH(data.rows, entry);
                        sohval.push(valsoh);
                        //increment the counter
                        counter++;
                })
        });

        //delay for a few seconds 3 seconds
        sleep(3000);

        //console.log(sohval);

        $.ajax({
                type: "GET",
                url: "urlcon",
                beforeSubmit: function () {
                        $('.t_three.loader-sp').removeClass('hidden');
                        $('.malaria_commodity_table.t_three').addClass('hidden');
                        $('.adjc_soh_mos').addClass('hidden');
                },
                success: function (data) {
                        
                        //var tableData = '<table>';
                        var tableData = '';
                        var phycount = '';
                        var adjc = '';
                        var mos = '';
                        var countercon = 0;
                        //console.log(data.rows);
                        //loop through the org units							
                        $.each(data.metaData.dimensions.dx, function (key, entry) {
                                //define the table                
                                tableData += '<tr>';
                                //tableData += '<td>'+data.metaData.items[entry].name+'</td>';
                                tableData += '<td>' + alnames[countercon] + '</td>';
                                //console.log(data.metaData.items[entry].name);

                                //for each dimension get the value
                                /*
                                $.each(data.rows, function (rkey, rentry) 
                                {	
                                        //console.log(rentry);
                                        if(entry==rentry[0])
                                        {
                                                adjc = rentry[2];
                                                phycount = sohval[countercon];
                                        }
                                })	
                                */

                                //get the consumption value
                                adjc = getConsumption(data.rows, entry);
                                phycount = sohval[countercon];

                                mos = parseFloat(phycount / adjc);

                                //set the bg color for the MOS
                                var bgcolor = '#ffffff';
                                if (mos <= 0)
                                        bgcolor = '#ff0000'
                                if (mos > 0 && mos < 3)
                                        bgcolor = '#ffc7ce'
                                if (mos >= 3 && mos <= 6)
                                        bgcolor = '#c6efce'
                                if (mos > 6)
                                        bgcolor = '#ffeb9c'

                                tableData += '<td>' + adjc.toFixed(0) + '</td>';
                                tableData += '<td>' + phycount.toFixed(0) + '</td>';
                                tableData += '<td bgcolor="' + bgcolor + '">' + mos.toFixed(1) + '</td>';

                                tableData += '</tr>';
                                //increment the counter
                                countercon++;
                        })

                        //tableData += '<table>';	
                        //console.log(tableData)
                        $("table.adjc_soh_mos tbody").empty();
                        $("table.adjc_soh_mos tbody").append(tableData);
                        //$('#zero_config').DataTable();
                },
                error: function (error) {
                        $('.loader-sp.t_three').addClass('hidden');
                        $('.adjc_soh_mos').addClass('hidden');
                        $('.loader-sp.t_three').addClass('hidden');
                        console.log('MainDash: error fetching json. :- '+error);
                        $('.t_three_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                }
        });
}

//function to get SOH value from loop
function getSOH(rows, entry) {
        var mysoh = 0;
        $.each(rows, function (rkey, rentry) {
                if (entry == rentry[0]) {
                        mysoh = rentry[2];
                }
        })

        return parseFloat(mysoh);
}

//get the adjusted consumption value
//function to get value from loop
function getConsumption(rows, entry) {
        var conval = 0;

        $.each(rows, function (rkey, rentry) {
                if (entry == rentry[0]) {
                        conval = rentry[2];
                }
        })

        return parseFloat(conval);
}

//sleep function
function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                        break;
                }
        }
}