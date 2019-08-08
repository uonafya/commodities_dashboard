//function toprocess the acts url
// function fetchRRDetails(rdurl,ounit)
function fetchRRDetails(theperiod,ounit)
{
    var rdurl = 'https://hiskenya.org/api/26/analytics.json?dimension=dx:JPaviRmSsJW.ACTUAL_REPORTS;JPaviRmSsJW.EXPECTED_REPORTS&dimension=pe:'+theperiod+'&dimension=ou:'+ounit+';LEVEL-3&displayProperty=NAME&outputIdScheme=UID';
    console.log('rdurl is:-> '+rdurl);
    $('#facility_rr').addClass('hidden');
    $('.loader-sp').removeClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: rdurl,                    
        success: function (data) {                  
            $('#facility_rr').removeClass('hidden');
            var header = '';
            var footer = '';
            var tableData = '';
            
            //put the header
            header += '<thead><tr>';	
            header += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry){
                header += '<th class="text-right">'+dateToStr(pentry)+'</th>';	
                // console.log("HEAD: "+pentry);		
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th class="text-right">'+dateToStr(pentry)+'</th>';			
            })

            footer += '</tr></tfoot>';

            tableData += header;

            //start body
            tableData += '<tbody>';

            $.each(data.metaData.dimensions.ou, function (key, entry){                                                        
                tableData += '<tr>';	
                tableData += '<td>'+data.metaData.items[entry].name+'</td>';
                $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
                {
						var rpt_count = getExpectedSub(data.rows,pentry,entry);
                        var reportval = getReport(data.rows,pentry,entry);
                        if(reportval)
                        {
                            if(reportval==rpt_count)
							{
								tableData += '<td style="background-color: #77ff77;">'+reportval+'/'+rpt_count+'</td>';
							}
							else
							{
								tableData += '<td style="background-color: #ffeb9c;">'+reportval+'/'+rpt_count+'</td>';
							}
                        }
                        else
                        {
                            var bgcolor = '#ffeb9c';
                            tableData += '<td style="border: 1px solid #fff;" bgcolor="'+bgcolor+'">'+reportval+'/'+rpt_count+'</td>';
                        }
                })
                tableData += '</tr>';	
            })

            $.ajax({
                type: "GET",
                url: 'https://hiskenya.org/api/26/analytics.json?dimension=dx:JPaviRmSsJW.ACTUAL_REPORTS;JPaviRmSsJW.EXPECTED_REPORTS&dimension=pe:'+theperiod+'&dimension=ou:'+ounit+';LEVEL-2&displayProperty=NAME&outputIdScheme=UID',
                data: "data",
                success: function (resp) {
                    console.log("SUCCESSFULLY FETCHING COUNTY SUMMARY FOR: "+resp.metaData.items[entry].name);
                    $.each(resp.metaData.dimensions.ou, function (key, entry){                                                        
                        tableData += '<tr>';	
                        tableData += '<td>'+resp.metaData.items[entry].name+'</td>';
                        $.each(resp.metaData.dimensions.pe, function (pkey, pentry) 
                        {
                                var rpt_count = getExpectedSub(resp.rows,pentry,entry);
                                var reportval = getReport(resp.rows,pentry,entry);
                                if(reportval)
                                {
                                    if(reportval==rpt_count)
                                    {
                                        tableData += '<td style="background-color: #77ff77;" class="text-bold">'+reportval+'/'+rpt_count+'</td>';
                                    }
                                    else
                                    {
                                        tableData += '<td style="background-color: #ffeb9c;" class="text-bold">'+reportval+'/'+rpt_count+'</td>';
                                    }
                                }
                                else
                                {
                                    var bgcolor = '#ffeb9c';
                                    tableData += '<td style="border: 1px solid #fff;" bgcolor="'+bgcolor+'" class="text-bold">'+reportval+'/'+rpt_count+'</td>';
                                }
                        })
                        tableData += '</tr>';	
                    })
                }
            });

            tableData += '</tbody>';
            //footer line
            // tableData += footer;

            // title fill
                var urlt = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+ounit+'.json?fields=id,name';
                console.log('loading title.... URL: '+urlt);
                $.ajax({      
                    dataType: "json",
                    url: urlt,
                    success: function(data_t) {      
                        $("#ttitle").html( data_t['name'] );
                        console.log('data_t: -> '+JSON.stringify(data_t));
                        
                    }
                });    
            // END title fill
                    
            $('.loader-sp').addClass('hidden');
            $("#facility_rr").removeClass('hidden');
            if($.fn.DataTable.isDataTable("#facility_rr")){
                $('#facility_rr').DataTable().destroy();
                $("#facility_rr").empty();
                $("#facility_rr").append(tableData);
            }else{
                // $("#facility_rr").append('<tbody>');
                $("#facility_rr").append(tableData);
                // $("#facility_rr").append('</tbody>');
            }
            // console.log("tableData: "+tableData);
            $('#facility_rr').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });

        },
        error: function (request, status, error) {
            $('.loader-sp').addClass('hidden');
            $('#facility_rr').addClass('hidden');
            $('.loader-sp.rrdb').removeClass('hidden');
            $('.rrdetailsbox').addClass('hidden');
            console.log('Reporting Rate Details: error fetching json. :- '+error);
            // $('.rdstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
            $('.rdstate').html('<div class ="alert alert-danger"><strong>'+status+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
});
}








function fetchSubRRDetails(scrdurl,ounit)
{
    $('.loader-sp.sp-sub').removeClass('hidden');
    $("#zero_config-sub.rrdetailsbox-sub").addClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: scrdurl,                    
        success: function (data) {                    
            var header = '';
            var footer = '';
            var tableDataSub = '';
            
            //put the header
            header += '<thead><tr>';	
            header += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    header += '<th>'+dateToStr(pentry)+'</th>';	
                    // console.log("HEAD: "+pentry);
                    		
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th class="text-right">'+dateToStr(pentry)+'</th>';			
            })

            footer += '</tr></tfoot>';

            tableDataSub += header;

            //start body
            tableDataSub += '<tbody>';

            //console.log(orgunits.length);
            $.each(data.metaData.dimensions.ou, function (key, entry){
				var expected = checkExpected(data.rows,entry);
				if(expected==1){
					tableDataSub += '<tr>';	
					tableDataSub += '<td>'+data.metaData.items[entry].name+'</td>';

					$.each(data.metaData.dimensions.pe, function (pkey, pentry){
                        var exp_count = getExpectedToReport(data.rows,pentry,entry);
						var reportval = getReport(data.rows,pentry,entry);
						if(reportval)
						{
							if(reportval==exp_count)
							{
								tableDataSub += '<td style="background-color: #77ff77;">'+reportval+'/'+exp_count+'</td>';
							}
							else
							{
								tableDataSub += '<td style="background-color: #ffeb9c;">'+reportval+'/'+exp_count+'</td>';
							}	
						}
						else
						{
							var bgcolor = '#ffeb9c';
							tableDataSub += '<td style="border: 1px solid #fff;" bgcolor="'+bgcolor+'">'+reportval+'</td>';
						}
					})

					tableDataSub += '</tr>';	
				}
            })
            // title fill
                var url = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+ounit+'.json?fields=id,name';
                $.ajax({      
                    dataType: "json",
                    url: url,
                    success: function(datax) {          
                        $("#ttitle").html(datax['name']+'.');
                    }
                });    
            // END title fill

            tableDataSub += '</tbody>';
            //footer line
            // tableDataSub += footer;
            //subcounty


            $("#subcounty_rr").removeClass('hidden');
            if($.fn.DataTable.isDataTable("#subcounty_rr")){
                $('#subcounty_rr').DataTable().destroy();
                $("#subcounty_rr").empty();
                $("#subcounty_rr").append(tableDataSub);
            }else{
                // $("#subcounty_rr").append('<tbody>');
                $("#subcounty_rr").append(tableDataSub);
                // $("#subcounty_rr").append('</tbody>');
            }
            // console.log("tableDataSub: "+tableDataSub);
            $('#subcounty_rr').DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });



    },
    error: function (request, status, error) {
        $('.loader-sp.sp-sub').addClass('hidden');
        $(".rrdetailsbox-sub").addClass('hidden');
        console.log('Reporting Rate Details: error fetching json. :- '+error);
        $('.rdstate-sub').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}







//get the org unit
function getOrgUnit(uid, period)
{
var url = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+uid+'.json?fields=id,name';

$.ajax({      
  dataType: "json",
  url: url, //Relative or absolute path to response.php file      
  success: function(data) 
  {          
      $("h5.card-title").html(data['name']+' - '+period);
  }
});    
}

//get the report details
function getReport(rows,period,orgunit) 
{	
	var rowval = 0;

	//loop through the rows
	$.each(rows, function (rkey, rentry) 
	{
			//check for orgunit and period
			if(orgunit==rentry[2] && period==rentry[1] && rentry[0]=='JPaviRmSsJW.ACTUAL_REPORTS')
			{                                    
					rowval = parseInt(rentry[3]);
			}								
	})		

	return rowval;
}

//get the # expected to report
function getExpectedToReport(rows,prd,ounit) {
	var exp_count = 0;
	$.each(rows, function (indx, onerow){
        if(ounit==onerow[2] && prd==onerow[1] && onerow[0]=='JPaviRmSsJW.ACTUAL_REPORTS'){                                    
            exp_count = exp_count + 1;
        }								
	})		

	return exp_count;
}

//get the # expected to report
function getExpectedSub(rows,period,orgunit) 
{
	var rowval = 0;

	//loop through the rows
	$.each(rows, function (rkey, rentry) 
	{
			//check for orgunit and period
			if(orgunit==rentry[2] && period==rentry[1] && rentry[0]=='JPaviRmSsJW.EXPECTED_REPORTS')
			{                                    
					rowval = parseInt(rentry[3]);
			}								
	})		

	return rowval;
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

//expected to report
//get the report details
function checkExpected(rows,orgunit) 
{	
	var rowval = 0;

	//loop through the rows
	$.each(rows, function (rkey, rentry) 
	{
		// console.log(rentry);
		//check for orgunit and period
		if(rentry[0]=='JPaviRmSsJW.EXPECTED_REPORTS' && rentry[2]==orgunit)
		{                                    
			rowval = parseInt(rentry[3]);
			//break;
		}								
	})		

	return rowval;
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