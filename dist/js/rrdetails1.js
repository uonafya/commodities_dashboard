//function toprocess the acts url
function fetchRRDetails(rdurl)
{
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: rdurl,                    
        success: function (data) {                    
            var header = '';
            var footer = '';
            var tableData = '';
            
            //put the header
            header += '<thead><tr>';	
            header += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    header += '<th>'+pentry+'</th>';			
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th>'+pentry+'</th>';			
            })

            footer += '</tr></tfoot>';

            tableData += header;

            //start body
            tableData += '<tbody>';

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
                            tableData += '<td>'+reportval+'</td>';	
                        }
                        else
                        {
                            var bgcolor = '#ffc7ce';
                            tableData += '<td bgcolor="'+bgcolor+'">'+reportval+'</td>';
                        }
                })

                tableData += '</tr>';	
            })

            //footer line
            tableData += '</tbody>';
            tableData += footer;
                    
            //facility
            
            $('.loader-sp').addClass('hidden');
            $("table.rrdetailsbox").empty();
            // $('#zero_config').DataTable();                                                          
            $("table.rrdetailsbox").append(tableData);	
            $("table.rrdetailsbox").removeClass('hidden');
            $('#zero_config').DataTable().draw();
            $('.loader-sp').addClass('hidden');
            
    },
    error: function (request, status, error) {
        $('.loader-sp').addClass('hidden');
        console.log('Reporting Rate Details: error fetching json. :- '+error);
        $('.rdstate').html('<div class ="alert alert-danger"><strong>Facility Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}






function fetchSubRRDetails(scrdurl)
{
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: scrdurl,                    
        success: function (data) {                    
            var header = '';
            var footer = '';
            var tableData = '';
            
            //put the header
            header += '<thead><tr>';	
            header += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    header += '<th>'+pentry+'</th>';			
            })

            header += '</tr></thead>';

            //put the footer
            footer += '<tfoot><tr>';	
            footer += '<th>Name</th>';

            $.each(data.metaData.dimensions.pe, function (pkey, pentry) 
            {
                    footer += '<th>'+pentry+'</th>';			
            })

            footer += '</tr></tfoot>';

            tableData += header;

            //start body
            tableData += '<tbody>';

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
                            tableData += '<td>'+reportval+'</td>';	
                        }
                        else
                        {
                            var bgcolor = '#ffc7ce';
                            tableData += '<td bgcolor="'+bgcolor+'">'+reportval+'</td>';
                        }
                })

                tableData += '</tr>';	
            })

            //footer line
            tableData += '</tbody>';
            tableData += footer;
            //subcounty
            $('.loader-sp.sp-sub').addClass('hidden');
            $("table.rrdetailsbox-sub").empty();
            // $('#zero_config-sub').DataTable();                                                          
            $("table.rrdetailsbox-sub").append(tableData);	
            $("table.rrdetailsbox-sub").removeClass('hidden');
            $('#zero_config-sub').DataTable().draw();
            $('.loader-sp.sp-sub').addClass('hidden');

    },
    error: function (request, status, error) {
        $('.loader-sp.sp-sub').addClass('hidden');
        console.log('Reporting Rate Details: error fetching json. :- '+error);
        $('.rdstate-sub').html('<div class ="alert alert-danger"><strong>Sub-county Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
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
var rowval = '';

//loop through the rows
$.each(rows, function (rkey, rentry) 
{
        //check for orgunit and period
        if(orgunit==rentry[2] && period==rentry[1])
        {                                    
                rowval = parseInt(rentry[3]);
        }								
})		

return rowval;
}