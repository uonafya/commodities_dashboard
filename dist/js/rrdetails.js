//function toprocess the acts url
function fetchRRDetails(rdurl)
{
    console.log('rdurl is:-> '+rdurl);
    $('.loader-sp').removeClass('hidden');
    $('#facility_rr').addClass('hidden');
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

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    header += '<th>'+dateToStr(pentry)+'</th>';			
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th>'+dateToStr(pentry)+'</th>';			
            })

            footer += '</tr></tfoot>';

            // tableData += header;

            //start body
            tableData += '<tbody>';
            tableDataDummy = '<tbody>';
            tableDataDummy += '<tr>';
            $.each(data.metaData.dimensions.pe, function (pkey, pentry){
                tableDataDummy += '<td></td>';
            });
            tableDataDummy += '</tr>';

            //console.log(orgunits.length);
            $.each(data.metaData.dimensions.ou, function (key, entry) 
            {                                                        
                tableData += '<tr>';	
                tableData += '<td>'+data.metaData.items[entry].name+'</td>';

                $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
                {
                        var reportval = getReport(data.rows,pentry,entry);
                        if(reportval)
                        {
                            tableData += '<td style="background-color: #77ff77;">'+reportval+'</td>';	
                        }
                        else
                        {
                            var bgcolor = '#ffeb9c';
                            tableData += '<td style="border: 1px solid #fff;" bgcolor="'+bgcolor+'">'+reportval+'</td>';
                        }
                })

                tableData += '</tr>';	
            })

            //footer line
            tableData += '</tbody>';
            // tableData += footer;
                    
            $('.loader-sp').addClass('hidden');
            $("#facility_rr").removeClass('hidden');
            $('#facility_rr').append(header);
            $('#facility_rr tbody').append(tableDataDummy);

            $('#facility_rr').DataTable().destroy();
            $("#facility_rr tbody").empty();                                     
            $("#facility_rr tbody").append(tableData);
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
        $('.rdstate').html('<div class ="alert alert-danger"><strong>Facility Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}








function fetchSubRRDetails(scrdurl)
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
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th>'+dateToStr(pentry)+'</th>';			
            })

            footer += '</tr></tfoot>';

            tableDataSub += header;

            //start body
            tableDataSub += '<tbody>';

            //console.log(orgunits.length);
            $.each(data.metaData.dimensions.ou, function (key, entry) 
            {
				
				var expected = checkExpected(data.rows,entry);
				
				if(expected==1)
				{
					tableDataSub += '<tr>';	
					tableDataSub += '<td>'+data.metaData.items[entry].name+'</td>';

					$.each(data.metaData.dimensions.pe, function (pkey, pentry) 
					{
						var reportval = getReport(data.rows,pentry,entry);
						if(reportval)
						{
							tableDataSub += '<td style="background-color: #77ff77;">'+reportval+'</td>';	
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

            //footer line
            tableDataSub += '</tbody>';
            tableDataSub += footer;
            //subcounty

            $('.sp-sub').addClass('hidden');
            $("#subcounty_rr").removeClass('hidden');
            $('#subcounty_rr').append(header);
            // $('#subcounty_rr').DataTable().destroy();
            $("#subcounty_rr tbody").empty();                                     
            $("#subcounty_rr").append(tableDataSub);
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
        $('.rdstate-sub').html('<div class ="alert alert-danger"><strong>Sub-county Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}







//get the org unit
function getOrgUnit(uid, period)
{
var url = 'https://testhis.uonbi.ac.ke/dhis/api/organisationUnits/'+uid+'.json?fields=id,name';

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
	var rowval = '';

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
		console.log(rentry);
		//check for orgunit and period
		if(rentry[0]=='JPaviRmSsJW.EXPECTED_REPORTS' && rentry[2]==orgunit)
		{                                    
			rowval = parseInt(rentry[3]);
			//break;
		}								
	})		

	return rowval;
}