function getDetails(url) {
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
            //get all facilities in each ou
            $.each(orgunits, function (inx, orgu) {
                var fac_url = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+orgu+'.json?filter=level:eq:5&fields=id,name,code&includeDescendants=true';
                $.ajax({
                    type: "GET",
                    url: fac_url,
                    data: "datau",
                    crossDomain: true,
                    success: function (response) {
                        $.each(response, function (indx, facil) { 
                            // orgu_opts+='<option value='+orgu+'>'+data.metaData.items[orgu].name+'</option>';
                            orgu_opts+='<option value='+facil.organisationUnits[indx].id+'>'+facil.organisationUnits[indx].name+'</option>';
                        });
                    }
                });
            })
            $('#facility-dropdown').empty();
            $('#facility-dropdown').append(orgu_opts);
            $('#ounit').html(data.metaData.items[data.metaData.dimensions.ou[0]].name);
            var thedxissued = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length/2);
            var thedxreceived = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length);
            $.each(thedxissued, function (index, issdId) {
                var recvdId = thedxreceived[index];
                var iss_val = getVal(data.rows, issdId);
                var recvd_val = getVal(data.rows, recvdId);
                if(recvd_val == undefined){
                    recvd_val = 0;
                }

                var diff_val = iss_val-recvd_val;
                if(iss_val>recvd_val){

                }else{

                }

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


                tdata+='<tr bgcolor="'+bcolor+'"><td bgcolor="'+bcolor+'" style="color: #303030;">'+data.metaData.items[issdId].name.substr(4)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+iss_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+recvd_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+diff_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+diff_perc.toFixed(1)+'%</td></tr>';
                
            })
            $('#natnl tbody').empty();
            $('#natnl tbody').append(tdata);
            $('.issues-loader').addClass('hidden');
            $('.issu_status').addClass('hidden');
            $('#nat-iss').removeClass('hidden');
        },
        error: function(error){
            $('.issu_status').removeClass('hidden');
            $('.issues-loader').addClass('hidden');
            $('#nat-iss').addClass('hidden');
            $('.issu_status').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');

        }
    });
}

function getNational(nat_url) {
        
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: nat_url,                    
        success: function (data) {
        $('.natsum-loader').addClass('hidden');
        $('.natstate').addClass('hidden');
        $('.national-container').removeClass('hidden');

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
        
        console.log(stockVals);
        
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
							value: 3,
							label: {
								text: 'Min',
								align: 'right'
							}
						},
						{
							color: '#00FF00',
							width: 2,
							value: 20,
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
                data: [1.6, 0.1, 0.1, 0.1, 0, 0.1, 28.9]
            }, {
                name: 'KEMSA Stock',
                data: [3, 0.0, 4.9, 3.7, 9, 5.3, 12.0]
            }, {
                name: 'Facility Stock',
                data: stockVals
            }]
        });
        },
        error: function (request, status, error) {
            $('.natsum-loader').addClass('hidden');
            $('.natstate').removeClass('hidden');
            $("#national-container").addClass('hidden');
            console.log('Error fetching json. :- ERROR: '+error + '& STATUS:'+status);
            $('.natstate').html('<div class ="alert alert-danger"><strong>sData Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}


function getVal(arry,commo){
    var valu = filterItems(arry,commo);
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