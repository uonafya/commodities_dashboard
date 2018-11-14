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



  var adj_url = 'http://localhost/pmi/json/totalpopdisadj.json';
  $.ajax({
    type: 'GET',
    crossDomain: true,
    url: adj_url,                    
    success: function (thedata) {
        var per_arr = thedata.metaData.dimensions.pe;
        var commd = thedata.metaData.dimensions.dx;
        var pop_title = thedata.metaData.items.uP0zJ2XmSkM.name;
        var thedata_rows = thedata.rows;
        var totadj_title = thedata.metaData.items.my9LjD9rLl6.name;
        var totdisp_title = thedata.metaData.items.kyqESkKkALD.name;
        var pop_arr_fin = [];
        var totadj_arr_fin = [];
        var totdisp_arr_fin = [];
        console.log("LINE:PE ni: "+per_arr);
        var pop_arr = filterItems(thedata_rows, 'uP0zJ2XmSkM');
        $.each(pop_arr, function(index, pop_arr1){
            var nom = parseFloat(pop_arr1[2]);
            if(nom<0){
                pop_arr_fin.push(parseFloat(0));
            }else{
                pop_arr_fin.push(nom);
            }
        });
        var totadj_arr = filterItems(thedata_rows, 'my9LjD9rLl6');
        $.each(totadj_arr, function(index2, totadj_arr1){
            var nom1 = parseFloat(totadj_arr1[2]);
            if(nom1<0){
                totadj_arr_fin.push(parseFloat(0));
            }else{
                totadj_arr_fin.push(nom1);
            }
        });
        var totdisp_arr = filterItems(thedata_rows, 'kyqESkKkALD');
        $.each(totdisp_arr, function(index3, totdisp_arr1){
            var nom2 = parseFloat(totdisp_arr1[2]);
            if(nom2<0){
                totdisp_arr_fin.push(parseFloat(0));
            }else{
                totdisp_arr_fin.push(nom2);
            }
        });
        
        var per_arr_length = per_arr.length;
        var pop_arr_length = pop_arr.length;
        while (pop_arr_length < per_arr_length) {
            var zer02 = parseFloat(0);
            pop_arr_fin.push(zer02);
            totdisp_arr_fin.push(zer02);
            totadj_arr_fin.push(zer02);
            pop_arr_length++
            console.log("LINE:pop_arr_length ni: "+pop_arr_length);
        }
        // console.log(" LINE:pop_title ni: "+pop_title+" & totadj_title ni: "+totadj_title+" & totdisp_title ni: "+totdisp_title );
        console.log("FINAL LINE:pop_arr ni: "+pop_arr_fin);
        console.log("FINAL LINE:totadj_arr ni: "+totadj_arr_fin);
        console.log("FINAL LINE:totdisp_arr ni: "+totdisp_arr_fin);

        columnOne(per_arr,pop_title,totadj_title,totdisp_title,pop_arr_fin,totadj_arr_fin,totdisp_arr_fin);
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
function makeList(name){
    window[name] = [];
    return window[name];
 }