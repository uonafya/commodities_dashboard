function getSSMap(nat_url,periodval) {
    var mapGeo = '../../assets/maps/counties.geojson'
    console.log("nat_url = "+nat_url)
    $('.ssmap-loader, .smdb').removeClass('hidden');
    $('.natstate').removeClass('hidden');
    $('#ssmap-container').addClass('hidden');
	
        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: nat_url,                    
            success: function (data) {
                console.log("data = "+data.height)
                $('.ssmap-loader, .smdb').addClass('hidden');
                $('.natstate').addClass('hidden');
                $('#ssmap-container').removeClass('hidden');
                var stockVals = new Array();  
                var mapStockVals = new Array();  


                $.each(data.metaData.dimensions.ou, function (inx, one_ou) { 
                    var data_filt_by_ou = data.rows.filter(rw=>rw[2]==one_ou)
                    let odata = {}
                    let oarr = []
                    odata.ou_name = data.metaData.items[one_ou].name
                    odata.ou_id = one_ou
                    oarr.push(one_ou)
                    odata.al6_mos = 0; odata.al12_mos = 0; odata.al18_mos = 0; odata.al24_mos = 0; odata.as_mos = 0; odata.sp_mos = 0; odata.rdt_mos = 0;
                    var al6_data = data_filt_by_ou.filter(a6=>a6[0]==data.metaData.dimensions.dx[0])
                    if( al6_data.length>0 ){ odata.al6_mos=al6_data[0][3] }
                    var al12_data = data_filt_by_ou.filter(a12=>a12[0]==data.metaData.dimensions.dx[1])
                    if( al12_data.length>0 ){ odata.al12_mos=al12_data[0][3] }
                    var al18_data = data_filt_by_ou.filter(a18=>a18[0]==data.metaData.dimensions.dx[2])
                    if( al18_data.length>0 ){ odata.al18_mos=al18_data[0][3] }
                    var al24_data = data_filt_by_ou.filter(a24=>a24[0]==data.metaData.dimensions.dx[3])
                    if( al24_data.length>0 ){ odata.al24_mos=al24_data[0][3] }
                    var as_data = data_filt_by_ou.filter(as=>as[0]==data.metaData.dimensions.dx[4])
                    if( as_data.length>0 ){ odata.as_mos=as_data[0][3] }
                    var sp_data = data_filt_by_ou.filter(sp=>sp[0]==data.metaData.dimensions.dx[5])
                    if( sp_data.length>0 ){ odata.sp_mos=sp_data[0][3] }
                    var rdt_data = data_filt_by_ou.filter(rdt=>rdt[0]==data.metaData.dimensions.dx[6])
                    if( rdt_data.length>0 ){ odata.rdt_mos=rdt_data[0][3] }
                    stockVals.push(odata)
                    oarr.push(odata)
                    mapStockVals.push(oarr)
                });
                

                var perio = data.metaData.items[data.metaData.dimensions.pe[0]].name;
                $('.card-title').html('National Stock Status: - '+perio);
                // $('#ssmap-container').html(JSON.stringify(stockVals, '', 3));
                // highmaps
                $.getJSON(mapGeo, function (geojson) {
                    // Initiate the chart
                    Highcharts.mapChart('ssmap-container', {
                        chart: {
                            map: geojson
                        },
                        title: {
                            text: 'National Stock-Status by County'
                        },
                        mapNavigation: {
                            enabled: true,
                            buttonOptions: {
                                verticalAlign: 'bottom'
                            }
                        },
                        tooltip: {
                            useHTML: true,
                            padding: 5,
                            pointFormat:  `
                                <table class="p-5 table-bordered slimtable">
                                    <thead>
                                        <tr>
                                            <th colspan="2" class="text-center text-uppercase">{point.value.ou_name}</th>        
                                        </tr>
                                        <tr>
                                            <th>Commodity</th>        
                                            <th>MOS (Months)</th>        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>AL6</td>
                                            <td>{point.value.al6_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>AL12</td>
                                            <td>{point.value.al12_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>AL18</td>
                                            <td>{point.value.al18_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>AL24</td>
                                            <td>{point.value.al24_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>AS Inj.</td>
                                            <td>{point.value.as_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>SP</td>
                                            <td>{point.value.sp_mos}</td>
                                        </tr>
                                        <tr>
                                            <td>RDT</td>
                                            <td>{point.value.rdt_mos}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `
                            
                        },
                        colorAxis: {
                            // tickPixelInterval: 100,
                            dataClasses: [
                                // { from: -100, to: 0.0009, color: '#C40401', name: 'Stocked out' }, 
                                // { from: 0.001, to: 2.9999, color: '#ffc7ce', name: 'Understocked' }, 
                                // { from: 3, to: 6, color: '#7bd48d', name: 'Stock OK' }, 
                                // { from: 6, to: 1000, color: '#ffeb9c', name: 'Overstocked' }
                            ]
                        },
                        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
                        series: [{
                            data: mapStockVals,
                            keys: ['id', 'value'],
                            joinBy: 'id',
                            name: 'Stock Status',
                            states: {
                                hover: {
                                    color: '#66aaff'
                                }
                            },
                            dataLabels: {
                                enabled: true,
                                format: '{point.properties.name}',
                            },
                            events: {
                                click: function (e) {
                                    var text = 
                                            ` <div>
                                                <b>${e.point.name}</b>
                                                <br/>
                                                    AL6 → ${e.point.value.al6_mos}
                                                <br/>
                                                    AL12 → ${e.point.value.al12_mos}
                                                <br/>
                                                    AL18 → ${e.point.value.al18_mos}
                                                <br/>
                                                    AL24 → ${e.point.value.al24_mos}
                                                <br/>
                                                    AS Inj. → ${e.point.value.as_mos}
                                                <br/>
                                                    SP → ${e.point.value.sp_mos}
                                                <br/>
                                                    RDT → ${e.point.value.rdt_mos}
                                            </div>
                                            `
                                    if (!this.chart.clickLabel) {
                                        this.chart.clickLabel = this.chart.renderer.label(text)
                                            .css({ width: '250px' })
                                            .add();
                                    } else {
                                        this.chart.clickLabel.attr({
                                            text: text,
                                            width: '250px'
                                        });
                                    }
                                }
                            }
                        }]
                    });
                });
                // highmaps
            },
            error: function (request, status, error) {
                $('.ssmap-loader, .smdb').addClass('hidden');
                $('.natstate').removeClass('hidden');
                $("#ssmap-container").addClass('hidden');
                console.log('Error fetching json. :- ERROR: '+error + '& STATUS:'+status);
                $('.natstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });
	// }); //when done
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