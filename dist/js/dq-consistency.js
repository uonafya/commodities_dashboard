function getDQ(dqurl,commodity){
    $('#pc3').addClass('hidden');
    $('.piethree.loader-sp').removeClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: dqurl,                    
        success: function (data) {
            //populate commodities filter
    
            var theItems = data.metaData.items;
            var theDims = data.metaData.dimensions;
            var theDx = data.metaData.dimensions.dx;
            var comm_filter_html = '<option selected value="">Select Dimension</option>';
            $.each(theDx, function(indx, onecomm){
                var appnd = '<option value="'+onecomm+'">'+theItems[onecomm].name+'</option>';
                comm_filter_html += appnd;
            });
            $('#commodity-dropdown').html(comm_filter_html);
            
            // var thedx = theDims.dx;
            // var theperiod = theDims.pe;
            var theous = theDims.ou;
            var therows = data.rows;
            var facility_count = theous.length;
            var compliant_facility_count = 0;

            $.each(theous, function(index, oneou){
                var ou_filtered = filterItems(therows,oneou);
                
                        var the_dx_0 = filterItems(ou_filtered,theDx[0]);
                        var the_dx_1 = filterItems(ou_filtered,theDx[1]);
                        // console.log("the Dx 1 ni: "+theDx[1]);
                        if(the_dx_0[0] != undefined && the_dx_1[0] != undefined){
                            if(the_dx_0[0][3]==the_dx_1[0][3]){
                                compliant_facility_count = compliant_facility_count+1;
                            }
                        }
                       
            });
            var non_compliant_facility_count = facility_count - compliant_facility_count;
            console.log("total_facilities = "+facility_count);
            console.log("compliant_facilities = "+compliant_facility_count);
            console.log("NON_compliant_facilities = "+non_compliant_facility_count);
            pieThree('Internal Data Consistency (AL 24)',compliant_facility_count,non_compliant_facility_count);
            $('#pc3').removeClass('hidden');
            $('.piethree.loader-sp').addClass('hidden');
        },
        error: function (request, status, error) {
            $('#pc3').addClass('hidden');
            $('.piethree.loader-sp').addClass('hidden');
            // $('.loader-sp').addClass('hidden');
            console.log('DQ: error fetching json. :- '+error);
            // $('.rdstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
    }
    $("#commodity-dropdown").change(function() 
        {  
            commodity = $(this).val();
            getDQ(dqurl,commodity);
            
        }
    );
    
    //   var adj_url = 'http://localhost/pmi/json/totalpopdisadj.json';
      var adj_url = '';
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
            // $('.rdstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
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
    