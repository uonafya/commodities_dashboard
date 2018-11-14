    var url = 'http://localhost/pmi/json/physical-opening.json';
    var month_from = '201806';
    var month_to = '201807';
    var commodity = 'iOARK31NdLp.HWtHCLAwprR'
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: url,                    
    success: function (data) {
        var theItems = data.metaData.items;
        var theDims = data.metaData.dimensions;
        // var thedx = theDims.dx;
        // var theperiod = theDims.pe;
        var theous = theDims.ou;
        var therows = data.rows;
        var facility_count = theous.length;
        var compliant_facility_count = 0;
        var therows_filtered_by_commodity = filterItems(therows,commodity);
        // console.log("filtered ROWS ni: "+JSON.stringify(therows_filtered_by_commodity));
        $.each(theous, function(index, oneou){
            // var ou_name = theItems[oneou].name;
            var ou_filtered = filterItems(therows_filtered_by_commodity,oneou);
            // if(ou_filtered == [] || ou_filtered == ''){}else{
                // $.each(ou_filtered, function(idx, ou_fl){
                    var ou_fil_from = filterItems(ou_filtered,month_from);
                    var ou_fil_to = filterItems(ou_filtered,month_to);
                    if(ou_fil_from[0] != undefined && ou_fil_to[0] != undefined){
                        console.log("OU: "+theItems[oneou].name+" ||  Opening SOH: "+ou_fil_from[0][3]);
                        console.log("OU: "+theItems[oneou].name+" ||  Closing SOH: "+ou_fil_to[0][3]);
                        // if(1==1){
                        if(ou_fil_from[0][3]==ou_fil_to[0][3]){
                            compliant_facility_count = compliant_facility_count+1;
                        }
                        // }
                        // console.log("ou_fil_from: "+JSON.stringify(ou_fil_from));
                        // console.log("ou_fil_to: "+JSON.stringify(ou_fil_to));
                    }
                // });
            // }
        });
        var non_compliant_facility_count = facility_count - compliant_facility_count;
        console.log("total_facilities = "+facility_count);
        console.log("compliant_facilities = "+compliant_facility_count);
        console.log("NON_compliant_facilities = "+non_compliant_facility_count);
        
    },
    error: function (request, status, error) {
        // $('.loader-sp').addClass('hidden');
        console.log('DQ: error fetching json. :- '+error);
        // $('.rdstate').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});

function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
  }