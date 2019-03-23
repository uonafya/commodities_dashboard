function fetchMosbycombox(url) {
    // console.log("TRIGGERED: fetchMosbycombox(url) == "+url);
    
    $('.loader-sp.t_four').removeClass('hidden');
    $('#mosbycombox').addClass('hidden');
    $('.t_four_state').addClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: url,                    
        success: function (data) {
            
        //create the org units array
        var orgunits = [];
        var dxids = [];
        var mosVals = new Array();  
                    
        //apply the labeling to the data
        var theperiod = data.metaData.dimensions.pe[0];
        var theorgunit = data.metaData.dimensions.ou[0];
                    
        
        var curorg = data.metaData.items[theorgunit].name;
        var curpe = data.metaData.items[theperiod].name;
        
        $("h4.titlelabel").html(curorg+' - '+curpe);
        
        var tableData = '';
        							
        $.each(data.metaData.dimensions.dx, function (key, entry) 
        {				
            $.each(data.rows, function (rkey, rentry) 
            {		
                var dxcode = rentry[0];
                if(dxcode==entry)
                {
                    mosVals.push(parseFloat(rentry[2]));
                }									
            })
        })	

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
                categories: ['AL6', 'AL12', 'AL18', 'AL24', 'AL all', 'AS inj','SP tabs', 'RDTs'],
                title: {
                    text: 'Commodity'
                }
            },
            yAxis: {
                min: 0,
                max: 24,
                title: {
                    text: 'Months of Stock',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                plotLines: [{
                    color: '#FF0000',
                    width: 2,
                    value: 9,
                    label: {
                        text: 'Min',
                        align: 'right'
                    }
                },
                {
                    color: '#00FF00',
                    width: 2,
                    value: 18,
                    label: {
                        text: 'Max',
                        align: 'right'
                    }
                }]
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
        $('.t_four.loader-sp').addClass('hidden');
        $('#mosbycombox').removeClass('hidden');
        $('.col-md-12.t_four').removeClass('hidden');
        $('.t_four_state').addClass('hidden');
    },
    error: function (request, status, error) {
            $('.loader-sp.t_four').addClass('hidden');
            $('#mosbycombox').addClass('hidden');
            $('.loader-sp.t_four').addClass('hidden');
            console.log('MainDash: error fetching json. :- '+error);
            $('.t_four_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}

function fetchPercHealthFA(urlfa,itemnames){
    // console.log("TRIGGERED: fetchPercHealthFA(urlfa,itemnames) == "+urlfa+" && itemnames: "+itemnames);
    $('.loader-sp.t_one').removeClass('hidden');
    $('.t_one_state').removeClass('hidden');
    $('.percent_healthfa').addClass('hidden');
    $('malaria_commodity_table.t_one').addClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: urlfa,                    
        success: function (data) {
        var orgunits = data.metaData.dimensions.ou;
        //console.log(orgunits.length);
        
        //added
        //get the total expected to report
        var totalorgs = getExpectedUnits('HfVjCurKxh2', 'LAST_MONTH');
                        
                        
        //var tableData = '<table>';
        var tableData = '';
        
        //console.log(data.rows);
        //loop through the org units
                    var countname = 0;
        $.each(data.metaData.dimensions.dx, function (key, entry) 
        {		
            //define the variables to hold the counter
            var overstock = 0;
            var stockok = 0;
            var understock = 0;
            
            //define the table
            tableData += '<tr>';
            tableData += '<td>'+itemnames[countname]+'</td>';							
            //console.log(data.metaData.items[entry].name);
            
            //for each dimension get the value
            $.each(data.rows, function (rkey, rentry) 
            {	
                var dxid = rentry[0];
                var mosval = parseFloat(rentry[2]);
                
                if(dxid==entry)
                {
                    //console.log(mosval);
                    if(mosval>6)
                    {
                        overstock++;
                    }
                    if(mosval>=3 && mosval<=6)
                    {
                        stockok++;
                    }
                    if(mosval>0 && mosval<3)
                    {
                        understock++;
                    }						
                }					
            })
                            countname++;
            
            
                            
            var overpercent = (overstock/totalorgs)*100;
            var okpercent = (stockok/totalorgs)*100;
            var underpercent = (understock/totalorgs)*100;
            
            tableData += '<td class="text-right" bgcolor="#ffeb9c">'+formatNumber(overpercent.toFixed(1))+'%</td>';
            tableData += '<td class="text-right" bgcolor="#7bd48d">'+formatNumber(okpercent.toFixed(1))+'%</td>';
            tableData += '<td class="text-right" bgcolor="#ffc7ce">'+formatNumber(underpercent.toFixed(1))+'%</td>';				
            tableData += '</tr>';	
        })

        //tableData += '<table>';	
        //console.log(tableData)			
        $("table.percent_healthfa").DataTable().destroy();	
        $("table.percent_healthfa tbody").empty();	
        $("table.percent_healthfa tbody").append(tableData);	
        $("table.percent_healthfa").DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
        });	
        //$('#zero_config').DataTable();
        $('.t_one.loader-sp').addClass('hidden');
        $('.malaria_commodity_table.t_one').removeClass('hidden');
        $('.percent_healthfa').removeClass('hidden');

            //to enable downloading the report table
            // downloadable('percent_healthfa');

    },
    error: function (request, status, error) {
            $('.loader-sp.t_one').addClass('hidden');
            $('.t_one_state').removeClass('hidden');
            $('.percent_healthfa').addClass('hidden');
            $('malaria_commodity_table.t_one').addClass('hidden');
            console.log('MainDash: error fetching json. :- '+error);
            $('.t_one_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}

function fetchNumberHealthFA(urlfa,itemnames){
    // console.log("TRIGGERED: fetchNumberHealthFA(urlfa,itemnames) == "+urlfa+" && itemnames: "+itemnames);
    $('.t_two.loader-sp').removeClass('hidden');
    $('.t_two_state').addClass('hidden');
    $('.number_healthfa').addClass('hidden');
    $('.malaria_commodity_table.t_two').addClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: urlfa,                    
        success: function (data) {
            
        var orgunits = data.metaData.dimensions.ou;
        //console.log(orgunits.length);
        var totalfa = orgunits.length;
        //added
        //get the total expected to report
        var totalorgs = getExpectedUnits('HfVjCurKxh2', 'LAST_MONTH');
                        
        //var tableData = '<table>';
        var tableData = '';
        
        //console.log(data.rows);
        //loop through the org units
                    var countname = 0;
        $.each(data.metaData.dimensions.dx, function (key, entry) 
        {		
            //define the variables to hold the counter
            var overstock = 0;
            var stockok = 0;
            var understock = 0;
            var stockout = 0;
            var nomos = 0;				
            
            //define the table
            tableData += '<tr>';
            tableData += '<td>'+itemnames[countname]+'</td>';							
            //console.log(data.metaData.items[entry].name);
            
            //for each dimension get the value
            $.each(data.rows, function (rkey, rentry) 
            {	
                var dxid = rentry[0];
                var mosval = parseFloat(rentry[2]);
                
                if(dxid==entry)
                {
                    //console.log(mosval);
                    if(mosval>6)
                    {
                        overstock++;
                    }
                    if(mosval>=3 && mosval<=6)
                    {
                        stockok++;
                    }
                    if(mosval>0 && mosval<3)
                    {
                        understock++;
                    }
                    if(mosval<=0)
                    {
                        stockout++;
                    }						
                }					
            })	
            countname++;
            nomos = totalorgs-(overstock+stockok+understock+stockout)
            
            tableData += '<td class="text-right" bgcolor="#ffeb9c">'+formatNumber(overstock)+'</td>';
            tableData += '<td class="text-right" bgcolor="#7bd48d">'+formatNumber(stockok)+'</td>';
            tableData += '<td class="text-right" bgcolor="#ffc7ce">'+formatNumber(understock)+'</td>';
            tableData += '<td class="text-right" style="color: #ffffff;" bgcolor="#ff0000">'+formatNumber(stockout)+'</td>';	
            tableData += '<td class="text-right">'+formatNumber(nomos)+'</td>';	
            tableData += '<td class="text-right">'+formatNumber(totalorgs)+'</td>';					
            
            tableData += '</tr>';	
        })

        //tableData += '<table>';	
        //console.log(tableData)			
        $("table.number_healthfa").DataTable().destroy();	
        $("table.number_healthfa tbody").empty();	
        $("table.number_healthfa tbody").append(tableData);	
        $("table.number_healthfa").DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
        });	
        //$('#zero_config').DataTable();
        $('.t_two.loader-sp').addClass('hidden');
        $('.number_healthfa').removeClass('hidden');
        $('.malaria_commodity_table.t_two').removeClass('hidden');

        // downloadable('number_healthfa');
    },
    error: function (request, status, error) {
            $('.loader-sp.t_two').addClass('hidden');
            $('.number_healthfa').addClass('hidden');
            $('.loader-sp.t_two').addClass('hidden');
            console.log('MainDash: error fetching json. :- '+error);
            $('.t_two_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}

function fetchAdjSOH(urlcon,alnames) {
    // console.log("TRIGGERED: fetchAdjSOH(urlcon) == "+urlcon);
    $('.t_three.loader-sp').removeClass('hidden');
    $('.malaria_commodity_table.t_three').addClass('hidden');
    $('.adjc_soh_mos').addClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: urlcon,
        success: function (data) {										
            //var tableData = '<table>';
            var sohval = [];
            $.getJSON(urlphy, function (data) {
                var counter = 0;
                $.each(data.metaData.dimensions.dx, function (key, entry) 
                {
                    //console.log(entry);                        
                    var valsoh = getSOH(data.rows,entry);
                    sohval.push(valsoh);
                    
                    //increment the counter
                    counter++;
                })
            });
            sleep(2300);
            var tableData = '';
            var phycount = '';
            var adjc = '';
            var mos = '';
            var countercon = 0;
            //console.log(data.rows);
            //loop through the org units							
            $.each(data.metaData.dimensions.dx, function (key, entry) 
            {
                //define the table
                                            
                tableData += '<tr>';
                //tableData += '<td>'+data.metaData.items[entry].name+'</td>';
                tableData += '<td>'+alnames[countercon]+'</td>';							
                //console.log(data.metaData.items[entry].name);

                //get the consumption value
                adjc = getConsumption(data.rows,entry);
                phycount = parseFloat(sohval[countercon]);

                mos = parseFloat(phycount/adjc);

                //set the bg color for the MOS
                var bgcolor = '#ffffff';
                var fcolor = '#222222';

                if(mos<=0)
                    bgcolor = '#ff0000';
                    fcolor = '#ffffff';
                if (mos > 0 && mos< 3)
                    bgcolor = '#ffc7ce';
                    var fcolor = '#222222';
                if (mos >= 3 && mos<= 6)
                    bgcolor = '#7bd48d';
                    var fcolor = '#222222';
                if(mos>6)
                    bgcolor = '#ffeb9c';
                    var fcolor = '#222222';

                tableData += '<td class="text-right">'+formatNumber(adjc.toFixed(0))+'</td>';
                tableData += '<td class="text-right">'+formatNumber(phycount.toFixed(0))+'</td>';
                tableData += '<td class="text-right" style="color: '+fcolor+' !important;" bgcolor="'+bgcolor+'">'+formatNumber(mos.toFixed(1))+'</td>';                            					

                tableData += '</tr>';
                
                //increment the counter
                countercon++;
            })

            //tableData += '<table>';	
            //console.log(tableData)			
            $("table.adjc_soh_mos").DataTable().destroy();
            $("table.adjc_soh_mos tbody").empty();	
            $("table.adjc_soh_mos tbody").append(tableData);	
            $("table.adjc_soh_mos").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
            });	
            //$('#zero_config').DataTable();
            $('.t_three.loader-sp').addClass('hidden');
            $('.malaria_commodity_table.t_three').removeClass('hidden');
            $('table.adjc_soh_mos').removeClass('hidden');

            //to enable downloading the report table
            // downloadable('adjc_soh_mos');
        },
        error: function (request, status, error) {
                $('.loader-sp.t_three').addClass('hidden');
                $('.adjc_soh_mos').addClass('hidden');
                $('.loader-sp.t_three').addClass('hidden');
                console.log('MainDash: error fetching json. :- '+error);
                $('.t_three_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });
}