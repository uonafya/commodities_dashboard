function getKIssues(url,tou) {
    console.log("getKIssues-> URL: "+url+" & TOU: "+tou);
    $('.nat_loader, .loader-sp, .issues-loader').removeClass('hidden');
    $('.nat_table').addClass('hidden');
    var tdata = '';
    
    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        crossDomain: true,
        success: function (data) {
                    
            $('#perdd').html(dateToStr(data.metaData.dimensions.pe[0]));
            orgunits = data.metaData.dimensions.ou;
            var orgu_opts = '';
            var ttitle = '';
            ttitle += data.metaData.items[data.metaData.dimensions.ou[0]].name;
            $('.ttitle').html(ttitle);
            $('#month1_title, .month1_title').html(data.metaData.items[data.metaData.dimensions.pe[0]].name)
            $('#month2_title').html(data.metaData.items[data.metaData.dimensions.pe[1]].name)
            var fac_url = 'https://hiskenya.org/api/organisationUnits/'+tou+'.json?filter=level:eq:5&fields=id,name,code&includeDescendants=true';
            // var fac_url = 'http://localhost/pmi/json/tAbBVBbueqD.json';
            
            $.ajax({
                type: "GET",
                url: 'https://hiskenya.org/api/organisationUnits/'+tou+'.json?fields=id,level',
                data: "tou_deets",
                crossDomain: true,
                success: function (tou_d) {
                    if(parseFloat(tou_d.level) < 5){
                        $.ajax({
                            type: "GET",
                            url: fac_url,
                            data: "datau",
                            crossDomain: true,
                            success: function (datau) {
                                $.each(datau.organisationUnits, function (indx2, facil) { 
                                    orgu_opts+='<option value='+facil.id+'>'+facil.name+'</option>';
                                });
                                $('#facility-dropdown').empty();
                                $('#facility-dropdown').append('<option disabled selected>Select facility</option>');
                                $('#facility-dropdown').append(orgu_opts);
                            }
                        });
                    }
                }
            })

            
            
            
            $('#ounit').html(data.metaData.items[data.metaData.dimensions.ou[0]].name);
            var thedxissued = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length/2);
            var thedxreceived = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length);
            var peri_0 = data.metaData.dimensions.pe[0];
            var peri_1 = data.metaData.dimensions.pe[1];
            console.log('peri_0 => '+peri_0);
            console.log('peri_1 => '+peri_1);
			var list_products = ["Artemether-Lumefantrine 20/120 Tabs 6s", "Artemether-Lumefantrine 20/120 Tabs 12s", "Artemether-Lumefantrine 20/120 Tabs 18s", "Artemether-Lumefantrine 20/120 Tabs 24s", "Artesunate Injection", "Sulphadoxine Pyrimethamine Tabs", "Rapid Diagnostic Tests"];
			var procounter = 0;
            $.each(thedxissued, function (index, issdId) {
                var recvdId = thedxreceived[index];
                var iss_val = getVal(data.rows, issdId, peri_0);
                // var iss_val = getVal(data.rows, issdId, peri_1);
                if(iss_val == undefined){
                    iss_val = 0;
                }
                var recvd_val_month1 = getVal(data.rows, recvdId, peri_0);
                if(recvd_val_month1 == undefined){
                    recvd_val_month1 = 0;
                }
                var recvd_val_month2 = getVal(data.rows, recvdId, peri_1);
                if(recvd_val_month2 == undefined){
                    recvd_val_month2 = 0;
                }

                var total_recvd = parseFloat(recvd_val_month1) + parseFloat(recvd_val_month2);
				
				//imheYfA1Kiw
                if(issdId == 'EtG9ozt2joA.DTnItSklSr8')
				{
                    iss_val *= 1000;
                }

                var diff_val = parseFloat(total_recvd)-parseFloat(iss_val);
                if(iss_val>total_recvd){}else{} 
				
				

                var diff_perc = (diff_val/iss_val)*100;
                if(diff_perc<0){
                    // diff_perc = 100;
                }
                
                var bcolor = '';
                // var fcolor = '';
                if(diff_perc>15 && diff_perc<90){
                    bcolor = '#f5c586';
                    // fcolor = '#111111';
                }
                
                if(diff_perc<15 && diff_perc>0){
                    bcolor = '#a8e0b3';
                    // fcolor = '#ffffff';
                }
                
                if(diff_perc>=90 && diff_perc<0){
                    bcolor = '#f2b2b2';
                    // fcolor = '#ffffff';
                }

				//data.metaData.items[issdId].name.substring(0,21)
                //data.metaData.items[issdId].name
				
				//check if infinity
				var calcperc = '';
				
				if(iss_val==0 && diff_val>0)
				{
					calcperc = 'Infinity';
				}
				else
				{
					if(iss_val==0 && diff_val==0)
					{
						calcperc = '0%';
					}
					else
					{
						calcperc = diff_perc.toFixed(1)+'%';
					}
				}
                
                 tdata+='<tr bgcolor="'+bcolor+'"><td bgcolor="'+bcolor+'" style="color: #303030;">'+list_products[procounter]+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+formatNumber(iss_val)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+formatNumber(recvd_val_month1)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+formatNumber(recvd_val_month2)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+formatNumber(total_recvd)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+formatNumber(diff_val.toFixed(1))+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+calcperc+'</td></tr>';
				 
				 procounter++;
                
            })
            $('.nat_loader, .loader-sp, .issues-loader').addClass('hidden');
            $('.nat_table').removeClass('hidden');
            $('.nat_table').DataTable().destroy();
            $('#natnl tbody').empty();
            $('#natnl tbody').append(tdata);
            $('.nat_table').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                sorting: false,
                ordering: false
            });
            $('.issu_status').addClass('hidden');
            $('#nat-iss').removeClass('hidden');
        },
        error: function(request, status, error){
            $('.issu_status').removeClass('hidden');
            $('.issues-loader').addClass('hidden');
            $('#nat-iss').addClass('hidden');
            $('.issu_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');

        }
    });
}

function getNational(nat_url,periodval) {
        
    $('.natsum-loader, .rrdb').removeClass('hidden');
    $('.natstate').removeClass('hidden');
    $('#national-container').addClass('hidden');
	
	//process the other endpoints
	var kemsamosurl = 'https://hiskenya.org/api/26/analytics.json?dimension=dx:A3hCPRmBEc1;VJjIApOdBDM;xifzJdZepGL;m5JchlPXYGh;AcHIhCDHQ5q;ImjyH2PKcrb;MqaP08m7qpB&dimension=pe:'+periodval+'&filter=ou:HfVjCurKxh2&displayProperty=NAME&outputIdScheme=UID';
	
	var pendingmosurl = 'https://hiskenya.org/api/26/analytics.json?dimension=dx:E8WZg2xUe6D;LzIEVzUpWIG;UW54RautAEK;V00M1X2mgCp;Rf9K17Q8KA5;ELorMg0kQhA;W1VReF5uwnI&dimension=pe:'+periodval+'&filter=ou:HfVjCurKxh2&displayProperty=NAME&outputIdScheme=UID';
	
	//var kemsamosurl = 'http://localhost/pmilive/kemsadata.json';
	
	//var pendingmosurl = 'http://localhost/pmilive/pendingdata.json';
	
	//var nat_url = 'http://localhost/pmilive/facilitydata.json';
	
	var kemsamos = $.ajax({ 
		type: 'GET',
		crossDomain: true,
		url: kemsamosurl,
		success: function(result) 
		{
			return result;
		}                     
	});
	 
	var pendingmos = $.ajax({ 
		type: 'GET',
		crossDomain: true,
		url: pendingmosurl,
		success: function(result) 
		{
			return result;
		}                     
	});
	
		
	var kemsaVals = new Array();
	
	var pendingVals = new Array();
	 
	//$.when(kemsamos).done(function(kemsadata) 
	$.when(kemsamos, pendingmos).done(function(kemsadata, pendingdata)
	{			
        //loop through the kemsa mos row values							
        $.each(kemsadata[0].metaData.dimensions.dx, function (key, entry) 
        {
			console.log(entry);
            $.each(kemsadata[0].rows, function (rkey, rentry) 
            {		
                var dxcode = rentry[0];
                if(dxcode==entry)
                {
                    kemsaVals.push(parseFloat(rentry[2]));
                }									
            })
        })
		
		//loop through the pending mos row values							
        $.each(pendingdata[0].metaData.dimensions.dx, function (key, entry) 
        {	
			console.log(entry);
            $.each(pendingdata[0].rows, function (rkey, rentry) 
            {		
                var dxcode = rentry[0];
                if(dxcode==entry)
                {
                    pendingVals.push(parseFloat(rentry[2]));
                }									
            })
        })
		
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: nat_url,                    
        success: function (data) {
        $('.natsum-loader, .rrdb').addClass('hidden');
        $('.natstate').addClass('hidden');
        $('#national-container').removeClass('hidden');

        var stockVals = new Array();  

        //loop through the row values							
        $.each(data.metaData.dimensions.dx, function (key, entry) 
        {				
            $.each(data.rows, function (rkey, rentry) 
            {		
                var dxcode = rentry[0];
                if(dxcode==entry)
                {
                    stockVals.push(parseFloat(rentry[2]));
                }									
            })
        })
        var perio = data.metaData.items[data.metaData.dimensions.pe[0]].name;
        var orgu = data.metaData.items[data.metaData.dimensions.ou[0]].name;
        $('.card-title').html('National Summary: '+orgu+' - '+perio);
                
        $('#national-container').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            credits: {
            enabled: false
        },
            xAxis: {				
                title: {
                    text: 'Commodities'
                },
                categories: ['AL 6s', 'AL 12s', 'AL 18s', 'AL 24s', 'AS inj', 'SP tabs', 'RDT']
            },
            yAxis: {
                min: 0,
				max: 24,
                title: {
                    text: 'Months of Stock (MOS)'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
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
            legend: {
                align: 'right',
                x: -70,
                verticalAlign: 'Top',
                y: -15,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false,
                reversed: true
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}'
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 10px black'
                        }
                    }
                }
            },
        colors: ['#8497b0', '#c55a11', '#92d050'],
            series: [{
                name: 'Pending Stock',
                data: pendingVals
            }, {
                name: 'KEMSA Stock',
                data: kemsaVals
            }, {
                name: 'Facility Stock',
                data: stockVals
            }]
        });
        },
        error: function (request, status, error) {
            $('.natsum-loader, .rrdb').addClass('hidden');
            $('.natstate').removeClass('hidden');
            $("#national-container").addClass('hidden');
            console.log('Error fetching json. :- ERROR: '+error + '& STATUS:'+status);
            $('.natstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
	}); //when done
}


function getVal(arry,commo, peri){
    var valu = filterItems(arry,commo);
    valu = filterItems(valu,peri);
    if(valu[0] != undefined){
        var thevalue = valu[0][2];
    }
    return thevalue;
}
function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}
function dateToStr(ledate){
    var leyear = ledate.substr(0,4);
    var lemonth = ledate.substr(4,5);
    // console.log('leyear ni: '+leyear);
    // console.log('lemonth ni: '+lemonth);
    if(lemonth == '01'){ 
        var numonth = 'Jan';
    } if(lemonth == '02'){ 
        var numonth = 'Feb';
    } if(lemonth == '03'){ 
        var numonth = 'Mar';
    } if(lemonth == '04'){ 
        var numonth = 'Apr';
    } if(lemonth == '05'){ 
        var numonth = 'May';
    } if(lemonth == '06'){ 
        var numonth = 'Jun';
    } if(lemonth == '07'){ 
        var numonth = 'Jul';
    } if(lemonth == '08'){ 
        var numonth = 'Aug';
    } if(lemonth == '09'){ 
        var numonth = 'Sept';
    } if(lemonth == '10'){ 
        var numonth = 'Oct';
    } if(lemonth == '11'){ 
        var numonth = 'Nov';
    } if(lemonth == '12'){ 
        var numonth = 'Dec';
    }
    var lenudate = numonth+' '+leyear;
    return lenudate;
}


//sleep function
function sleep(milliseconds) 
{
		var start = new Date().getTime();
		for (var i = 0; i < 1e7; i++) {
				if ((new Date().getTime() - start) > milliseconds) {
						break;
				}
		}
}