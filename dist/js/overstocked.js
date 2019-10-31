var arr_valz = [];
var valid_ous_array = [];
var valid_url = 'https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:JPaviRmSsJW&paging=false';
// var valid_url = 'http://localhost/pmi/json/valid_ous.json';
getValidOUs(valid_url);

function getValidOUs(valid_url) {
    $.getJSON(valid_url, function (data){
        valid_ous_array = data.dataSets[0].organisationUnits;
        $.each(valid_ous_array, function (idx, ov_ou) {
            arr_valz.push(valid_ous_array[idx].id);
        })
    });
}

function checkOUs(ouid){
    if(valid_ous_array = null){
        getValidOUs(valid_url);
    }
    // console.log("Klk: "+JSON.stringify(arr_valz));
    if($.inArray(ouid, arr_valz) < 0){
        return false;
    }else{
        return true;
    }
}


//function toprocess the AS url
//function toprocess the acts url
function overstocked(overstockurl,orgu,commodity)
{
    console.log('overstockedurl: '+overstockurl);
    console.log('orgu: '+orgu);
    console.log('commodity: '+JSON.stringify(commodity));
    $('#overstocked_table').addClass('hidden');
    $('.overstockeddata').addClass('hidden');
    $('.loader-sp').removeClass('hidden');
    // $.getJSON(acturl, function (data){


    
        $.ajax({
            type: 'GET',
            crossDomain: true,
            url: overstockurl,                    
            success: function (data) {
    
                //create the org units array
                var orgunits = [];
                var dxids = data.metaData.dimensions.dx;
    
                //var tableData = '<table>';
                var tableData = '';
            
                //push only if not in
                $.each(data.rows, function (rowkey, rowentry) 
                {
                       
                        //console.log(orgunits.indexOf(rowentry[1]))
                        if(orgunits.indexOf(rowentry[1])>=0)
                        {
                               // console.log(orgunits);
                        }
                        else
                        {
                                orgunits.push(rowentry[1]);
                                //console.log('kenya',data.rows);
                        }
                            
    
                })
              
            
                var facility_count = 0;
                var orgunitmos = [];
                var orgunitphy = [];
                var orgunitdiff = [];

                        var count = 0;
                        $.each(data.metaData.dimensions.ou, function (key, entry) 
                        {
                            
                                
                                if(orgunits.indexOf(entry)>=0)
                                 {
                              
                                
                                            $.each(data.rows, function (rowkdata, rowkentry) 
                                            {
                                       
                                                //set mos
    
                                                if(rowkentry[0]==dxids[0] && entry==rowkentry[1])
                                                {
                                                    orgunitmos[entry] = rowkentry[3];																
                                                }
                                                
                                                //set physical
                                                if(rowkentry[0]==dxids[1] && entry==rowkentry[1])
                                                {
                                                    orgunitphy[entry] = rowkentry[3];	
                                                }							
                                                
                                                                            
                                            })
                                        }
                                    
                                    
                                    })
                                
                                                                
                                    $.each(orgunits,function (key, value) 
                                    {
                                         
                                        //calculate the difference
                                        
                                            if(orgunitmos[value]>6)                                            
                                            {		
                                                facility_count+=1;

                                                var diffmos = (6/parseFloat(orgunitmos[value]))*parseFloat(orgunitphy[value]);
                                                orgunitdiff[value] = (parseFloat(orgunitphy[value])-diffmos).toFixed(0);
                                            
    
                                                tableData += '<tr><td>'+data.metaData.items[value].name+'</td><td>'+getMFLcode(value)+'</td><td>'+orgunitmos[value]+'</td><td>'+orgunitphy[value]+'</td><td>'+orgunitdiff[value]+'</td></tr>' ;
                                                
                                                
                                            }
                                            
                                        })	
                                        
                             count++;
                                            
    
                       // tableData += '</tr>';	
                   // }
                    
    
                $('#thetitle').html('<b>'+commodity[0].commd+'</b> Overstocked in <br/>  '+facility_count+' facilities');
                //tableData += '<table>';	
                //console.log(tableData)
                $('#overstocked_table').removeClass('hidden');
                $('.overstockeddata').removeClass('hidden');
                $('.loader-sp').addClass('hidden');
                // $('.loader-sp').css('display','none');
                $('.overstocked_status').addClass('hidden');
                $('.overstocked_status').addClass('hidden');
                $("table.overstocked_table tbody").empty();
                $('#overstocked_table').DataTable().destroy();
                $("table.overstocked_table tbody").append(tableData);	
                //$('#overstocked_table').DataTable();                                                          
                $('#overstocked_table').DataTable({
                    dom: 'Bfrtlip',
                    "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
                    ],
                    initComplete: function () {
                        $(this.api().column(4).nodes()).css({ "background-color": "white" });
                        $(this.api().column(6).nodes()).css({ "background-color": "white" });
                        $(this.api().column(8).nodes()).css({ "background-color": "white" });
                        $(this.api().column(10).nodes()).css({ "background-color": "white" });
                    }
                });
                // title fill
                    var url = 'https://hiskenya.org/api/organisationUnits/'+orgu+'.json?fields=id,name';
                    $.ajax({      
                        dataType: "json",
                        url: url,
                        success: function(datax) {  
                            console.log("setting title as: "+datax['name']+' - '+data.metaData.items[data.metaData.dimensions.pe[0]].name);
                            $("h5#ttitle").html(datax['name']+' - '+data.metaData.items[data.metaData.dimensions.pe[0]].name);
                        }
                    });    
                // END title fill
    
                
            },
            error: function (request, status, error) {
                $('.loader-sp').addClass('hidden');
                $('#overstocked_table').addClass('hidden');
                console.log('overstocked error: error fetching json. :- '+error);
                $('.overstockeddata').addClass('hidden');
                $('.overstocked_status').removeClass('hidden');
                $('.overstocked_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            }
        });
    
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