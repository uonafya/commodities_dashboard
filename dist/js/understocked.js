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
function understocked(understockurl,orgu,commodity)
{
    console.log('understockedurl: '+understockurl);
    $('#understocked_table').addClass('hidden');
    $('.understockeddata').addClass('hidden');
    $('.loader-sp').removeClass('hidden');
    // $.getJSON(acturl, function (data){

  
    
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: understockurl,                    
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
            // var uid = data.metaData.dimensions.ou;

            
            //console.log(orgunits.length);
            
                    

                    
           


                    //console.log(data.rows);
                    //for each dimension get the value
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
                            
                                    						
                                $.each(orgunits,function (key, one_ou) 
                                {
                                   
                                    //  $.each(data.metaData.dimensions.ou, function (key, rentry) {
                                    //     if (rentry == )
                                    //  })
                                    
                                    
                                    //calculate the difference
                                    
                                        if(orgunitmos[value]>0 && orgunitmos[value]<3)
                                        {		
                                            
                                            facility_count+=1;
                                            var diffmos = (3/parseFloat(orgunitmos[one_ou]))*parseFloat(orgunitphy[one_ou]);
                                            //orgunitdiff[value] = diffmos-parseFloat(orgunitphy[value]).toFixed(0);
                                            orgunitdiff[one_ou] = (diffmos-parseFloat(orgunitphy[one_ou])).toFixed(0);
                                        

                                            tableData += '<tr><td>'+data.metaData.items[one_ou].name+'</td><td>'+getMFLcode(one_ou)+'</td><td>'+orgunitmos[one_ou]+'</td><td>'+orgunitphy[one_ou]+'</td><td>'+orgunitdiff[one_ou]+'</td></tr>' ;
                                            
                                            
                                        }
                                        
						
					                				
                                           
                                        
                                    })							
                                			
                               
                            
                         count++;
                    					

                   // tableData += '</tr>';	
               // }
                
            

            $('#thetitle').html('<b>'+commodity[0].commd+'</b> understocked in <br/>  '+facility_count+' facilities');
            //tableData += '<table>';	
            //console.log(tableData)
            $('#understocked_table').removeClass('hidden');
            $('.understockeddata').removeClass('hidden');
            $('.loader-sp').addClass('hidden');
            // $('.loader-sp').css('display','none');
            $('.understocked_status').addClass('hidden');
            $('#understocked_table').DataTable().destroy();
            $("table.actsbox tbody").empty();
            $('.understocked_status').addClass('hidden');
            $("table.actsbox tbody").append(tableData);	
            //$('#understocked_table').DataTable();                                                          
            $('#understocked_table').DataTable({
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
            $('#understocked_table').addClass('hidden');
            console.log('Understocked error: error fetching json. :- '+error);
            $('.understockeddata').addClass('hidden');
            $('.understocked_status').removeClass('hidden');
            $('.understocked_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });

}





     // fetch mfl codes

     var mfl_codes_array = [];
     mfl_url = 'https://hiskenya.org/api/organisationUnits.json?fields=id,code&paging=false';
    //  mfl_url = 'http://localhost/pmi/json/mflcode.json';
     getMFLarray(mfl_url);

     function getMFLarray(mfl_url) {
         $.getJSON(mfl_url, function (data) 
         {
             mfl_codes_array = data.organisationUnits;
             // console.log('mfl_codes_array: '+mfl_codes_array);
         });
     }

 //---------- fetch mfl codes
 // filter by mfl codes
 function getMFLcode(dhis_id) {
     if(mfl_codes_array == null){
         getMFLarray(mfl_url);
     }
         // var ous = data.organisationUnits;
         var ous = mfl_codes_array;
         var arr_filterd_by_dhis_code = $.grep(ous, function(v) {
             return v.id === dhis_id;
         });
         var mfl_id = arr_filterd_by_dhis_code.code;
         if(mfl_id == undefined){
             mfl_id = 'Not Available';
         }
         return mfl_id;
     
 }
 // filter by mfl codes

 
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