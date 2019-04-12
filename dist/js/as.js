var arr_valz = [];
var valid_ous_array = [];
var valid_url = 'https://testhis.uonbi.ac.ke/api/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:JPaviRmSsJW&paging=false';
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
function fetchAS(asurl,orgu,peri)
{
    $('#as_table').addClass('hidden');
    $('.asdata').addClass('hidden');
    $('.loader-sp').removeClass('hidden');
    // $.getJSON(asurl, function (data){
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: asurl,                    
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

            var facility_count = 0;
            //console.log(orgunits.length);
            $.each(data.metaData.dimensions.ou, function (key, entry) 
            {
                if(checkOUs(entry)){
                    facility_count+=1;
                    //define the table
                    tableData += '<tr>';	
                    tableData += '<td>'+data.metaData.items[entry].name+'</td>';
                    tableData += '<td>'+getMFLcode(entry)+'</td>';
                    //get all the dimensions for the given orgunit
                    dxids = [];
                    $.each(data.rows, function (rkey, rentry){
                        var dxcode = rentry[1];
                        if(dxcode==entry){
                            dxids.push(rentry[0]);
                        }												
                    })

                    //for each dimension get the value
                    var count = 0;
                    $.each(data.metaData.dimensions.dx, function (dxkey, dxentry){
                        if(orgunits.indexOf(entry)<0)
                        {
                            tableData+= '<td bgcolor="#ff0000"> - </td>';
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
                                if(dxentry==dxid){						
                                    if(dxcode==entry){
                                        //console.log(rentry);		
                                        //var notfoundRow = false;
                                        var bgcolor = '#ffffff';
                                        if(dxval<0)
                                                bgcolor = '#ffcccc'
                                        if (dxval >= 0 && dxval< 3)
                                                bgcolor = '#ffeb9c'
                                        if (dxval >= 3 && dxval<= 6)
                                                bgcolor = '#7bd48d'
                                        if(dxval>6)
                                                bgcolor = '#85bfe0'
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
            $('#thetitle').html('AS <br/> in '+facility_count+' facilities');
            //tableData += '<table>';	
            //console.log(tableData)
            $('#as_table').removeClass('hidden');
            $('.asdata').removeClass('hidden');
            $('.loader-sp').addClass('hidden');
            // $('.loader-sp').css('display','none');
            $('.as_status').addClass('hidden');
            $('#as_table').DataTable().destroy();
            $("table.asbox tbody").empty();
            $("table.asbox tbody").append(tableData);	
            //$('#as_table').DataTable();                                                          
            $('#as_table').DataTable({
                dom: 'Bfrtlip',
                "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
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
                var url = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+orgu+'.json?fields=id,name';
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
            $('#as_table').addClass('hidden');
            console.log('AS: error fetching json. :- '+error);
            $('.asdata').addClass('hidden');
            $('.as_status').removeClass('hidden');
            $('.as_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
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