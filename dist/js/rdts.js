var arr_valz = [];
var valid_ous_array = [];
var valid_url = 'https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:RRnz4uPHXdl&paging=false';
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


//function toprocess the RDT url
function fetchRDTs(rdturl,orgu,peri)
{
    // console.log('rdturl: '+rdturl);
    $('#rdt_table').addClass('hidden');
    $('.rdtdata').addClass('hidden');
    $('.loader-sp').removeClass('hidden');
    sleep(3000);
            // $.getJSON(rdturl, function (data){
            $.ajax({
                type: 'GET',
                crossDomain: true,
                url: rdturl,                    
                success: function (data) {

                    //create the org units array
                    var orgunits = [];
                    var dxids = [];

                    //var tableData = '<table>';
                    var tableData = '';

                    

                    //push only if not in
                    $.each(data.rows, function (rowkey, rowentry) 
                    {
                            //console.log(rowentry[1]);
                            //console.log(orgunits.indexOf(rowentry[1]))
                            if(orgunits.indexOf(rowentry[1])>=0)
                            {
                                    //console.log(orgunits);
                            }
                            else
                            {
                                    orgunits.push(rowentry[1]);
                            }	

                    })

                    var facility_count  = 0;
                    //console.log(orgunits.length);
                    $.each(data.metaData.dimensions.ou, function (key, entry) 
                    {
                        if(checkOUs(entry)){
                            facility_count+=1;
                            //define the table
                            tableData += '<tr>';	
                            tableData += '<td>'+data.metaData.items[entry].name+'</td>';
                            tableData += '<td>'+getMFLcode(entry)+'</td>';
                            //console.log(data.metaData.items[entry].name);
                            //console.log(entry);
                            //console.log(entry);	

                            //get all the dimensions for the given orgunit
                            dxids = [];
                            $.each(data.rows, function (rkey, rentry) 
                            {
                                    var dxcode = rentry[1];

                                    if(dxcode==entry)
                                    {
                                            dxids.push(rentry[0]);
                                    }												
                            })

                            //console.log(dxids);


                            //console.log(data.rows);
                            //for each dimension get the value
                            var count = 0;
                            $.each(data.metaData.dimensions.dx, function (dxkey, dxentry) 
                            {
                                    //console.log(orgunits.indexOf(entry));
                                    //console.log(dxids.indexOf(dxentry));
                                    //console.log(orgunits);	
                                    //console.log(data.metaData.items[dxentry].name);
                                    if(orgunits.indexOf(entry)<0)
                                    {
                                            tableData += '<td bgcolor="#ff0000"> - </td>';
                                    }
                                    else if(dxids.indexOf(dxentry)<0)
                                    {
                                            tableData += '<td bgcolor="#ff0000"> - </td>';
                                    }
                                    else
                                    {										
                                            $.each(data.rows, function (rkey, rentry) 
                                            {					
                                                    var dxid = rentry[0];
                                                    var dxcode = rentry[1];
                                                    var dxval = rentry[2];

                                                    if(dxentry==dxid)
                                                    {						
                                                            if(dxcode==entry)
                                                            {
                                                                    //console.log(rentry);		
                                                                    //var notfoundRow = false;
                                                                    var bgcolor = '#fefeff';
                                                                    if(dxval<0)
                                                                            bgcolor = '#ffcccc'
                                                                    if (dxval >= 0 && dxval< 3)
                                                                            bgcolor = '#ffc7ce'
                                                                    if (dxval >= 3 && dxval<= 6)
                                                                            bgcolor = '#7bd48d'
                                                                    if(dxval>6)
                                                                            bgcolor = '#ffeb9c'

                                                                    tableData += '<td class="text-right" bgcolor="'+bgcolor+'">'+formatNumber(dxval)+'</td>';
                                                            }						
                                                    }						
                                            })				

                                    }
                                    count++;
                            })					

                            tableData += '</tr>';	
                        }
                    })

                    $('#thetitle').html('RDT <br/> in '+facility_count+' facilities');
                    //tableData += '<table>';	
                    //console.log(tableData)
                    $('#rdt_table').removeClass('hidden');
                    $('.rdtdata').removeClass('hidden');
                    $('.rdt_status').addClass('hidden');
                    $('.loader-sp').addClass('hidden');
                    // $('.loader-sp').css('display','none');
                    
                    $('#rdt_table').DataTable().destroy();
                    $("table.rdtbox tbody").empty();
                    $("table.rdtbox tbody").append(tableData);	
                    //$('#rdt_table').DataTable();                                                          
                    $('#rdt_table').DataTable({
                        dom: 'Bfrtlip',
                        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
						order: [[6, 'desc']],
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print', 'pageLength'
                        ],
                        initComplete: function () {
                            $(this.api().column(1).nodes()).css({ "background-color": "white" });
                            $(this.api().column(3).nodes()).css({ "background-color": "white" });
                            $(this.api().column(4).nodes()).css({ "background-color": "white" });
                            $(this.api().column(5).nodes()).css({ "background-color": "white" });
                        }
                    });

                    // title fill
                        var url = 'https://hiskenya.org/api/organisationUnits/'+orgu+'.json?fields=id,name';
                        $.ajax({      
                            dataType: "json",
                            url: url,
                            success: function(datax) {          
                                $("h5#ttitle").html(datax['name']+' - '+data.metaData.items[data.metaData.dimensions.pe[0]].name);
                            }
                        });    
                    // END title fill

                    
                },
                error: function (request, status, error) {
                    $('.loader-sp').addClass('hidden');
                    $('#rdt_table').addClass('hidden');
                    console.log('RDTs: error fetching json. :- '+error);
                    $('.rdtdata').addClass('hidden');
                    $('.rdt_status').removeClass('hidden');
                    $('.rdt_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
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
         if(arr_filterd_by_dhis_code.length<1){
            mfl_id = 'Not Available';
            }else{
            mfl_id = arr_filterd_by_dhis_code[0].code;
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