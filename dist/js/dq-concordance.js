function getDQconcord(dqurl,commodity){
    $('#zero_config-dqcc').removeClass('hidden');
    $('.loader-sp.sp-dqcc').removeClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: dqurl,                    
        success: function (data) {
            var therows = data.rows;
            var header = '';
            var footer = '';
            var tableData = '';
            
            //put the header
            header += '<thead><tr><th><strong>Facility</strong</th>';	
            $.each(data.metaData.dimensions.pe, function (pkey, oneperiod){
                $.each(data.metaData.dimensions.dx, function (indx, onecomm){
                    header += '<th><strong>'+oneperiod+'</strong><br/><small>'+data.metaData.items[onecomm].name+'</small></th>';
                });		
            });
            header += '</tr></thead>';


            tableData += header;
            
            //start body
            tableData += '<tbody>';

            //console.log(orgunits.length);
            $.each(data.metaData.dimensions.ou, function (key, entry) 
            {                                                        
                tableData += '<tr>';	
                tableData += '<td>'+data.metaData.items[entry].name+'</td>';

                $.each(data.metaData.dimensions.pe, function (pkey, oneperiod){
                    $.each(data.metaData.dimensions.dx, function (indx, onecomm){
                        var theval = getVal(therows,oneperiod,entry,onecomm);
                        console.log("theval NI:"+theval);
                        tableData += '<td>'+theval+'</td>';
                    });
                        
                })

                tableData += '</tr>';	
            })
            //footer line
            tableData += '</tbody>';
            tableData += footer;
            // console.log("tableData NI: "+tableData);
                    
            //subcounty
            $('#zero_config-dqcc').removeClass('hidden');
            $("table.dqcc-table-dqcc").empty();
            $("table.dqcc-table").append(tableData);	
            $('#zero_config-dqcc').DataTable();                                                          
            $('#zero_config-dqcc').DataTable().draw();
            $('.loader-sp.sp-dqcc').addClass('hidden');
            
        },
        error: function (request, status, error) {
            $('.loader-sp').addClass('hidden');
            console.log('DQ: error fetching json. :- '+error);
            $('.rdstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}


    $("#commodity-dropdown").change(function() 
        {  
            commodity = $(this).val();
            getDQconcord(dqurl);
            
        }
    );
    
    function filterItems(array,query) {
        return array.filter(function(el) {
            return el.indexOf(query) > -1;
        })
    }
    function getVal(rows,period,orgunit,comm){	
        var rowval = '';
        $.each(rows, function (rkey, rentry){
        if(orgunit==rentry[2] && period==rentry[1] && comm==rentry[0])
        {                   
            rowval = parseInt(rentry[3]);
        }});
        return rowval;								
    }	
    function makeList(name){
        window[name] = [];
        return window[name];
    }
    