function getConco(ccurl,commodity,the_org_unit){
    if( commodity.split('.')[1] != undefined || commodity.split('.')[1] != null || commodity.split('.')[1] != ''){
        var commodity = commodity.split('.')[0];
    }
    // console.log('commodity => '+commodity);
    console.log("conco_url ==> "+ccurl);
    $('.loader-sp.pieone').removeClass('hidden');
    $('#pc1, .pc1').addClass('hidden');
    sleep(3000);
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: ccurl,                    
        success: function (data) {
            // console.log("fetching valid OUs");
            // var valid_ous_url = 'http://localhost/pmi/json/valid_ous_092019.json';
            // var valid_ous_url = 'http://localhost/pmi/json/valid_ous_4.json';
            var valid_ous_url = 'https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id,name,level]&filter=id:ilike:JPaviRmSsJW&paging=false';
            // valid_ous_url = 'https://api.myjson.com/bins/12oxsp';

            $.ajax({
                type: "GET",
                crossDomain: true,
                url: valid_ous_url,
                success: function (validata) {
                    
                    // console.log("fetching valid OUs success");
                    var valid_orgs = [];
                    $.each(validata.dataSets[0].organisationUnits, function (inv, vou) { 
                        valid_orgs.push(vou.id);
                    });
                    // console.log("valid_orgs "+ JSON.stringify(valid_orgs));
                    //commodities and their names array
                    var commodities_array = {
                        'c0MB4RmVjxk':{name:'Artemether-Lumefantrine 20/120 Tabs 12s'}, 'BnGDrFwyQp9':{name:'Artemether-Lumefantrine 20/120 Tabs 6s'}, 'qnZmg5tNSMy':{name:'Artemether-Lumefantrine 20/120 Tabs 18s'}, 'gVp1KSFI69G':{name:'Artemether-Lumefantrine 20/120 Tabs 24s'}, 'iOARK31NdLp':{name:'Artesunate Injection'}, 'imheYfA1Kiw':{name:'Sulphadoxine Pyrimethamine Tabs'}, 'cPlWFYbBacW':{name:'Rapid Diagnostic Tests'}
                    }
        
                    var theItems = data.metaData.items;
                    var theDims = data.metaData.dimensions;
                    var theComms = data.metaData.dimensions.dx;
                    var thePer = data.metaData.dimensions.pe;
                    popComms(theComms);
                    
                    // var thedx = theDims.dx;
                    // var theperiod = theDims.pe;
                    var theous = theDims.ou;
                    var therows = data.rows;
                    var facility_count = theous.length;
                    var compliant_facility_count = 0;
                    var compliant_facilities_names = [];
                    var compliant_facilities_codes = [];
                    var non_compliant_facilities_names = [];
                    var non_compliant_facilities_codes = [];
                    commodity_begbal = commodity+'.HWtHCLAwprR';
                    commodity_closbal = commodity+'.rPAsF4cpNxm';
                    var therows_filtered_by_commodity_begbal = filterItems(therows,commodity_begbal);
                    var therows_filtered_by_commodity_closbal = filterItems(therows,commodity_closbal);
                    var therows_filtered_by_commodity = therows_filtered_by_commodity_begbal.concat( therows_filtered_by_commodity_closbal );
                    
                    // console.log("therows_filtered_by_commodity_begbal: "+JSON.stringify(therows_filtered_by_commodity_begbal));
                    // console.log("therows_filtered_by_commodity_closbal: "+JSON.stringify(therows_filtered_by_commodity_closbal));
                    // console.log("filtered ROWS ni: "+JSON.stringify(therows_filtered_by_commodity));
                    var equaltbl = '';
                    $.each(theous, function(index, oneou){
                        if(valid_orgs.includes(oneou)){
                            var ou_filtered_from = [];
                            var ou_filtered_to = [];
                            ou_filtered_from = filterItems(therows_filtered_by_commodity_begbal,oneou);
                            ou_filtered_to = filterItems(therows_filtered_by_commodity_closbal,oneou);
                            var filt_from = thePer[thePer.length - 2];
                            var filt_to = thePer[thePer.length - 1];
                            var ou_fil_from = [];
                            var ou_fil_to = [];
                            ou_fil_from = filterItems(ou_filtered_from,filt_to);
                            ou_fil_to = filterItems(ou_filtered_to,filt_from);
                            var commo_s = commodity.split('.')[0];
                            $.ajax({      
                                dataType: "json",
                                url: 'https://hiskenya.org/api/organisationUnits/'+the_org_unit+'.json?fields=id,name',
                                success: function(datax) {
                                    $('#thetitle').html(datax['name']+' <br/>Closing: <u>'+filt_from + '</u> & Opening: <u>' + filt_to + '</u>');
                                }
                            }); 
                            $('#detailTitle').html('Closing: <u>'+filt_from + '</u> & Opening: <u>' + filt_to + '</u> | Commodity: <u id="commoname">' + commodities_array[commo_s].name + '</u>');
                            var val_fr = 0;
                            var val_to = 0;
                            if(ou_fil_from[0] == undefined){
                                ou_fil_from[0] = [0,0,0,0]
                            }
                            if(ou_fil_to[0] == undefined){
                                ou_fil_to[0] = [0,0,0,0]
                            }
                            if(ou_fil_from[0][3] == null || ou_fil_from[0][3] == undefined){
                                val_fr = 0
                            }else{
                                val_fr = ou_fil_from[0][3]
                            }
                            if(ou_fil_to[0][3] == null || ou_fil_to[0][3] == undefined){
                                val_to = 0
                            }else{
                                val_to = ou_fil_to[0][3]
                            }
                            if(true){
                                if(val_fr==val_to){
                                    compliant_facility_count = compliant_facility_count+1;
                                    compliant_facilities_names.push(theItems[oneou].name);
                                    compliant_facilities_codes.push(oneou);
                                    equaltbl += '<tr><td>'+theItems[oneou].name+'</td><td>'+getMFLcode(oneou)+'</td></tr>';
                                }
                            }
                            ou_fil_from = ou_fil_to = ou_filtered = [];
                        }
                    });
                    $('#equalSOH').DataTable().destroy();
                    $('#equalSOH tbody').empty();
                    $('#equalSOH tbody').append(equaltbl);
                    var nonequaltbl = '';
                    // alert(JSON.stringify(compliant_facilities_codes));
                    $.each(theDims.ou,(inex,valou)=>{
                        let the_ou = valou;
                        if(!compliant_facilities_codes.includes(the_ou) && valid_orgs.includes(the_ou) ){
                            non_compliant_facilities_codes.push(the_ou);
                            non_compliant_facilities_names.push(theItems[the_ou].name);
                            nonequaltbl += '<tr><td>'+theItems[the_ou].name+'</td><td>'+getMFLcode(the_ou)+'</td></tr>';
                        }
                    });
                    // alert(JSON.stringify(non_compliant_facilities_codes));
                    $('#notEqualSOH').DataTable().destroy();
                    $('#notEqualSOH tbody').empty();
                    $('#notEqualSOH tbody').append(nonequaltbl);
                    // $(document).ready(function() {
                        $('#equalSOH').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                        $('#notEqualSOH').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                    // });
                    $(document).ready(function () {
                        var total_facils = parseFloat(compliant_facilities_codes.length) + parseFloat(non_compliant_facilities_codes.length);
                        var tot_eq_perc = (parseFloat(compliant_facilities_codes.length)*100)/total_facils;
                        var tot_neq_perc = (parseFloat(non_compliant_facilities_codes.length)*100)/total_facils;
                        $('#equalCount, .equalCount').html(compliant_facilities_codes.length + '&nbsp;  <small>(' + tot_eq_perc.toFixed(0) + '%)</small>');
                        $('#notEqualCount, .notEqualCount').html(non_compliant_facilities_codes.length + '&nbsp;  <small>(' + tot_neq_perc.toFixed(0) + '%)</small>');
                        $('.totFacil').html(total_facils);
                        var non_compliant_facility_count = facility_count - compliant_facility_count;
                        // console.log("total_facilities = "+facility_count);
                        // console.log("compliant_facilities = "+compliant_facility_count);
                        // console.log("NON_compliant_facilities = "+non_compliant_facility_count);
                        var commo_s = commodity.split('.')[0];
                        // console.log('PIE: commodities_array[commo_s].name:-> '+commodities_array[commo_s].name);
                        pieOne('Data Quality: Concordance',commodities_array[commo_s].name,tot_eq_perc,tot_neq_perc,compliant_facilities_codes, non_compliant_facilities_codes);
                        // pieOne(getCommodityName(commodity.split('.')[0]),compliant_facility_count,non_compliant_facility_count);
                        $('.loader-sp.pieone').addClass('hidden');
                        $('#pc1, .pc1').removeClass('hidden');
                        $('.detailsrow').removeClass('hidden');
                       
                    });
        
                    // var non_compliant_facility_count = facility_count - compliant_facility_count;
                    // // console.log("total_facilities = "+facility_count);
                    // // console.log("compliant_facilities = "+compliant_facility_count);
                    // // console.log("NON_compliant_facilities = "+non_compliant_facility_count);
                    // var commo_s = commodity.split('.')[0];
                    // // console.log('PIE: commodities_array[commo_s].name:-> '+commodities_array[commo_s].name);
                    // pieOne('Data Quality: Concordance',commodities_array[commo_s].name,tot_eq_perc,tot_neq_perc);
                    // // pieOne(getCommodityName(commodity.split('.')[0]),compliant_facility_count,non_compliant_facility_count);
                    // $('.loader-sp.pieone').addClass('hidden');
                    // $('#pc1, .pc1').removeClass('hidden');
                    // $('.detailsrow').removeClass('hidden');
                }
            });
        },
        error: function (request, status, error) {
            $('.loader-sp.pieone').addClass('hidden');
            $('#pc1, .pc1').addClass('hidden');
            $('.detailsrow').addClass('hidden');
            console.log('DQ: error fetching json. :- '+error);
            $('.pieone_state').html('<div class ="alert alert-danger"><strong>'+request.status+': '+request.statusText+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}
// $("#commodity-dropdown").change(function() 
//     {  
//         commodity = $(this).val();
//         getDQ(dqurl,commodity);
        
//     }
// );

function getCompa(courl){
    $('.loader-sp.dqcol').removeClass('hidden');
    $('#dq-column').addClass('hidden');
    var adj_url = courl;
    sleep(3000);
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
        // console.log("LINE:PE ni: "+per_arr);
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
            // console.log("LINE:pop_arr_length ni: "+pop_arr_length);
        }
        // console.log(" LINE:pop_title ni: "+pop_title+" & totadj_title ni: "+totadj_title+" & totdisp_title ni: "+totdisp_title );
        // console.log("FINAL LINE:pop_arr ni: "+pop_arr_fin);
        // console.log("FINAL LINE:totadj_arr ni: "+totadj_arr_fin);
        // console.log("FINAL LINE:totdisp_arr ni: "+totdisp_arr_fin);
        var pearry = [];
        $.each(per_arr,(ind,val)=>{
            pearry.push(dateToStr(val));
        });
        columnOne(pearry,pop_title,totadj_title,totdisp_title,pop_arr_fin,totadj_arr_fin,totdisp_arr_fin);
        $('#dq-column').removeClass('hidden');
        $('.loader-sp.dqcol').addClass('hidden');
    },
    error: function (request, status, error) {
        $('.loader-sp.dqcol').addClass('hidden');
        $('#dq-column').addClass('hidden');
        console.log('DQ: error fetching json. :- '+error);
        $('.dqcol_state').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}

function getWBData(wburl,orgun){
$('#wbdata').addClass('hidden');
$('.loader-sp.wbdata').removeClass('hidden');
sleep(1500);
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: wburl,                    
    // url: 'http://localhost/pmi/json/completeness.json',                    
    success: function (wb_data) {
        const json_data = wb_data;
        // Total number of facilities
        const total_facilities= json_data.metaData.dimensions.ou.length;

        let reported = [];
        let expected = [];
        let wbdataset = [];
        var pearr = [];
        // loops though the period
        var prdoptn = '<option selected="true" disabled>Select period</option>';
        $.each(json_data.metaData.dimensions.pe,(index,period)=>{
            let total = 0;
            let expected_t = 0;
            pearr.push( json_data.metaData.items[period].name );
            // Prints out the periods in the row key
            $.each(json_data.rows,(i_index,onerow)=>{
                if (period === onerow[1] && onerow[0] === json_data.metaData.dimensions.dx[0]){
                    total = total+ 1;
                } else if (period === onerow[1] && onerow[0] === json_data.metaData.dimensions.dx[1]){
                    expected_t = expected_t + 1;
                }
            });

            prdoptn += '<option value='+period+'>'+json_data.metaData.items[period].name+'</option>';
            reported.push(total);
            expected.push(expected_t);
        });
        let didNotReport = [];
        $.each(reported,(index,value)=>{
            // const facilities = total_facilities
            const facilities = expected[index];
            let empty_reports = facilities - value
            didNotReport.push(empty_reports)
        });
        
        wbdataset.push(pearr);
        wbdataset.push(reported);
        wbdataset.push(didNotReport);

        var per_from = json_data.metaData.items[json_data.metaData.dimensions.pe[0]].name;
        var per_to = json_data.metaData.items[json_data.metaData.dimensions.pe[parseFloat(json_data.metaData.dimensions.pe.length)-1]].name;
        // title fill
            var url = 'https://hiskenya.org/api/organisationUnits/'+orgun+'.json?fields=id,name';
            $.ajax({      
                dataType: "json",
                url: url,
                success: function(datax) {          
                    var subtitle = datax['name']+' - From: '+per_from+' To '+per_to;
                    $('h5.ttitle').html(subtitle);
                }
            });    
        // END title fill
        
        
        $('#periodfilter').append(prdoptn);

        wbDetail(json_data, '');

        $(document).ready(function() {
            $('#pfform').submit(function(event){
                $('#prdmodal').modal('toggle');
                event.preventDefault();
                var nuldate = $('#pfform :input').val();
                $('#detailTableNotReport').DataTable().destroy();
                $('#detailTableReported').DataTable().destroy();
                $('#detailTableNotReport tbody').empty();
                $('#detailTableReported tbody').empty();
                $('#detailTableNotReport').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                });
                $('#detailTableReported').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
                });
                wbDetail(json_data, nuldate);
                // console.log($('#pfform :input').val());
            });
        });

        lineOne(wbdataset);
        $('#wbdata').removeClass('hidden');
        $('.loader-sp.wbdata').addClass('hidden');
        $('#detailsTabBtn').removeClass('disabled');
        $('#detailsTabBtn').removeClass('disabledTab');
    },error: function (request, status, error) {
        $('.loader-sp.wbdata').addClass('hidden');
        $('#wbdata').addClass('hidden');
        $('.detailsrow').addClass('hidden');
        $('#detailsTabBtn').addClass('disabled').removeClass('active');
        $('#detailsTabBtn').addClass('disabledTab').removeClass('active');
        console.log('DQ WB Completeness: error fetching json. Status: '+status+' & Error:- '+error);
        $('.wbdata_state').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}




function wbDetail(json_data, lastperiod){
    sleep(1500);
    //-----------------------------------------------------detail 
        
        // ~~~~~~~~~~~~~~~~~~~~~~~~REPORTED~~~~~~~~~~~~~~~~~~~~~~~~
        if(lastperiod == null || lastperiod == ''){
            var lastperd = json_data.metaData.dimensions.pe[json_data.metaData.dimensions.pe.length - 1];
        }else{
            var lastperd = lastperiod;
        }
        $('#detailTitle').html(dateToStr(lastperd)+'&#9662;');
        var rp_fac_codes = [];
        var rp_fac_names = [];
        var tbldata = '';
        //find all reported facilities (CODE) for the lastperiod
        $.each(json_data.rows,(i_index,row_val)=>{
            if (lastperd === row_val[1]){
                rp_fac_codes.push(row_val[2]);
            }
        });
        //find all reported facilities (NAME) for the lastperiod
        $.each(rp_fac_codes,(i_index,rpfc_val)=>{
            rp_fac_names.push(json_data.metaData.items[rpfc_val].name);
            tbldata += '<tr>';
            tbldata += '<td>' + json_data.metaData.items[rpfc_val].name + '</td><td>' + getMFLcode(rpfc_val) + '</td>'
            tbldata += '</tr>';
        });
        // alert(JSON.stringify(rp_fac_codes));
        // alert(JSON.stringify(rp_fac_names));
        $('#detailTableReported tbody').empty();
        $('#detailTableReported').DataTable().destroy();
        $('#detailTableNotReport tbody').empty();
        $('#detailTableNotReport').DataTable().destroy();
        $('#detailTableReported tbody').append(tbldata);
        $(document).ready(function() {
            // $('#detailTableReported tbody').empty();
        $('#detailTableReported').DataTable({
            "pageLength": 15,
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
        
            // $('#detailTableReported').DataTable().destroy();
            // $("#detailTableReported tbody").empty();
            // $("#detailTableReported tbody").append(tblData);	                                                        
            // $('#detailTableReported').DataTable().fnDraw();
        } );
        // ~~~~~~~~~~~~~~~~~~~~~~~~NOT~~REPORTED~~~~~~~~~~~~~~~~~~~~~~

        var not_rp_fac_codes = [];
        var tbldata2 = '';
        // console.log("fetching valid OUs");
        // var valid_ous_url = 'http://localhost/pmi/json/valid_ous.json';
        var valid_ous_url = 'https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id,name,code,level]&filter=id:ilike:JPaviRmSsJW&paging=false';
        $.ajax({
            type: "GET",
            crossDomain: true,
            url: valid_ous_url,
            success: function (validata) {
                
                // console.log("fetching valid OUs success");
                var valid_orgs = [];
                $.each(validata.dataSets[0].organisationUnits, function (inv, vou) { 
                    valid_orgs.push(vou.id);
                });
                // console.log("valid_orgs "+ JSON.stringify(valid_orgs));
                
                $.each(json_data.metaData.dimensions.ou,(inex,valou)=>{
                    let the_ou = valou;
                    if(valid_orgs.includes(the_ou)){
                        if(!rp_fac_codes.includes(the_ou)){
                            not_rp_fac_codes.push(the_ou);
                            tbldata2 += '<tr>';
                            tbldata2 += '<td>' + json_data.metaData.items[the_ou].name + '</td><td>' + getMFLcode(the_ou) + '</td>'
                            tbldata2 += '</tr>';
                        }
                    }
                });
            }
        });
        $('#detailTableNotReport tbody').append(tbldata2);
        $('#reportCount').html(rp_fac_codes.length);
        $('#notReportCount').html(not_rp_fac_codes.length);
        // alert(JSON.stringify(not_rp_fac_codes));
        $(document).ready(function() {
            // $('#detailTableNotReport tbody').empty();
            $('#detailTableNotReport').DataTable({
                "pageLength": 15,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });

            // $('#detailTableNotReport').DataTable().destroy();
            // $("#detailTableNotReport tbody").empty();
            // $("#detailTableNotReport tbody").append(tblData2);	                                                        
            // $('#detailTableNotReport').DataTable().fnDraw();
        } );
        //-------------------------------------------------------detail 
}





function getConsist(consturl,commd,the_orgu){
    console.log("consturl ==>>==>> "+consturl);
    $('#pc3, .pc3').addClass('hidden');
    $('.loader-sp.piethree').removeClass('hidden');
    sleep(3000);
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: consturl,                    
        success: function (data) {
            // console.log("fetching valid OUs");
            // var valid_ous_url = 'https://api.myjson.com/bins/12oxsp';
            // var valid_ous_url = 'http://localhost/pmi/json/valid_ous_4.json';
            var valid_ous_url = 'https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id,name,level]&filter=id:ilike:JPaviRmSsJW&paging=false';
            $.ajax({
                type: "GET",
                crossDomain: true,
                url: valid_ous_url,
                success: function (validata) {
                    // console.log("fetching valid OUs success");
                    var valid_orgs = [];
                    $.each(validata.dataSets[0].organisationUnits, function (inv, vou) { 
                        valid_orgs.push(vou.id);
                    });
                    // console.log("valid_orgs "+ JSON.stringify(valid_orgs));
                    var theItems = data.metaData.items;
                    var theDims = data.metaData.dimensions;
                    var theDx = data.metaData.dimensions.dx;
                    var thePe = data.metaData.dimensions.pe;            
                    
                    // var thedx = theDims.dx;
                    // var theperiod = theDims.pe;
                    var theous = theDims.ou;
                    var therows = data.rows;
                    var facility_count = theous.length;
                    var compliant_facility_count = 0;
                    var nodisc_facilities_names = [];
                    var nodisc_facilities_codes = [];
                    var disc_facilities_names = [];
                    var disc_facilities_codes = [];
                    var nodisctbl = '';
                    var disctbl = '';

                    var begbal_code = '';
                    if(theDx[0].split('.')[1] == "HWtHCLAwprR"){
                        begbal_code = theDx[0];
                    }
                    var qty_recv_code = '';
                    if(theDx[1].split('.')[1] == "yuvCdaFqdCW"){
                        qty_recv_code = theDx[1];
                    }
                    var pos_adj_code = '';
                    if(theDx[2].split('.')[1] == "CckV73xy6HB"){
                        pos_adj_code = theDx[2];
                    }
                    var neg_adj_code = '';
                    if(theDx[3].split('.')[1] == "unVIt2C0cdW"){
                        neg_adj_code = theDx[3];
                    }
                    var qty_disp_code = '';
                    if(theDx[4].split('.')[1] == "w77uMi1KzOH"){
                        qty_disp_code = theDx[4];
                    }
                    var phy_count_code = '';
                    if(theDx[5].split('.')[1] == "rPAsF4cpNxm"){
                        phy_count_code = theDx[5];
                    }
                    // if( parseFloat(thePe[0]) < parseFloat(thePe[1]) ){
                    //     var period_from = thePe[0];
                    //     var period_to = thePe[1];
                    // }else{
                    //     var period_from = thePe[1];
                    //     var period_to = thePe[0];
                    // }
                    var thirar = []
                    $.each(theous, function(index, oneou){
                        if(valid_orgs.includes(oneou)){
                            // var closing_bal = null;
                            // var opening_bal = null;
                            //positives - negatives should be == closing soh/physical

                            var sum_pos = 0; //SUM OF begin_bal + qty_received + pos_adj
                            var sum_neg = 0; //SUM OF qty_dispensed + neg_adj
                            var clos_bal = 0; //PHY_COUNT
                            
                            // --------------
                            var begin_bal = 0;
                            var qty_received = 0;
                            var pos_adj = 0;
                            // --------------
                            var qty_disp = 0;
                            var neg_adj = 0;


                            //-----------JUMUIA----------------
                                //-----------begbal----------------
                                var begin_bal_val = 0;
                                var opening_balance = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==begbal_code )[0];
                                if(opening_balance != undefined || opening_balance != null){
                                    if(opening_balance[3] == undefined || opening_balance[3] == null){
                                        begin_bal_val = 0;
                                    }else{
                                        begin_bal_val = opening_balance[3];
                                    }
                                }else{
                                    begin_bal_val = 0;
                                }
                                // console.log("begin_bal_val ==> "+begin_bal_val);
                                //-----------begbal----------------
                                //-----------qty_received----------------
                                var qty_received_val = 0;
                                var qty_receiveds = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==qty_recv_code )[0];
                                if(qty_receiveds != undefined || qty_receiveds != null){
                                    if(qty_receiveds[3] == undefined || qty_receiveds[3] == null){
                                        qty_received_val = 0;
                                    }else{
                                        qty_received_val = qty_receiveds[3];
                                    }
                                }else{
                                    qty_received_val = 0;
                                }
                                // console.log("qty_received_val ==> "+qty_received_val);
                                //-----------qty_received----------------
                                //-----------pos_adj----------------
                                var pos_adj_val = 0;
                                var pos_adjs = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==pos_adj_code )[0];
                                if(pos_adjs != undefined || pos_adjs != null){
                                    if(pos_adjs[3] == undefined || pos_adjs[3] == null){
                                        pos_adj_val = 0;
                                    }else{
                                        pos_adj_val = pos_adjs[3];
                                    }
                                }else{
                                    pos_adj_val = 0;
                                }
                                // console.log("pos_adj_val ==> "+pos_adj_val);
                                //-----------pos_adj----------------

                                //-----------qty_disp----------------
                                var qty_disp_val = 0;
                                var qty_disps = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==qty_disp_code )[0];
                                if(qty_disps != undefined || qty_disps != null){
                                    if(qty_disps[3] == undefined || qty_disps[3] == null){
                                        qty_disp_val = 0;
                                    }else{
                                        qty_disp_val = qty_disps[3];
                                    }
                                }else{
                                    qty_disp_val = 0;
                                }
                                // console.log("qty_disp_val ==> "+qty_disp_val);
                                //-----------qty_disp----------------
                                //-----------neg_adj----------------
                                var neg_adj_val = 0;
                                var neg_adjs = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==neg_adj_code )[0];
                                if(neg_adjs != undefined || neg_adjs != null){
                                    if(neg_adjs[3] == undefined || neg_adjs[3] == null){
                                        neg_adj_val = 0;
                                    }else{
                                        neg_adj_val = neg_adjs[3];
                                    }
                                }else{
                                    neg_adj_val = 0;
                                }
                                // console.log("neg_adj_val ==> "+neg_adj_val);
                                //-----------neg_adj----------------
                                
                                //-----------phy_count----------------
                                var phy_count_val = 0;
                                var phy_counts = therows.filter( one_ob_row=>one_ob_row[2]==oneou ).filter( one_ob_row=>one_ob_row[0]==phy_count_code )[0];
                                if(phy_counts != undefined || phy_counts != null){
                                    if(phy_counts[3] == undefined || phy_counts[3] == null){
                                        phy_count_val = 0;
                                    }else{
                                        phy_count_val = phy_counts[3];
                                    }
                                }else{
                                    phy_count_val = 0;
                                }
                                // console.log("phy_count_val ==> "+phy_count_val);
                                //-----------phy_count----------------

                                sum_pos = parseFloat(begin_bal_val)+parseFloat(qty_received_val)+parseFloat(pos_adj_val)
                                sum_neg = parseFloat(qty_disp_val)+parseFloat(neg_adj_val)
                            //-----------JUMUIA----------------

                            // $.each(therows, function (indx, onerow) {
                            //     var valuee = onerow[3];
                            //     var ouu = onerow[2];
                            //     if(valuee == null || valuee == undefined){
                            //         valuee = 0
                            //     }
                            //     // <<-------------POSITIVES--------------
                            //     if(ouu == oneou && onerow[0] == begbal_code){
                            //         begin_bal = parseFloat(begin_bal) + parseFloat(valuee);
                            //     }
                            //     if(ouu == oneou && onerow[0] == qty_recv_code){
                            //         qty_received = parseFloat(qty_received) + parseFloat(valuee);          
                            //     }
                            //     if(ouu == oneou && onerow[0] == pos_adj_code){
                            //         pos_adj = parseFloat(pos_adj) + parseFloat(valuee);
                            //     }
                            //     if(begin_bal != null && qty_received != null && pos_adj != null){
                            //         sum_pos = parseFloat(begin_bal) + parseFloat(qty_received) + parseFloat(pos_adj);
                            //     }

                            //     // >>-------------end POSITIVES--------------

                            //     // <<-------------NEGATIVES--------------
                            //     if(ouu == oneou && onerow[0] == qty_disp_code){
                            //         qty_disp = parseFloat(qty_disp) + parseFloat(valuee);
                            //     }
                            //     if(ouu == oneou && onerow[0] == neg_adj_code){
                            //         neg_adj = parseFloat(neg_adj) + parseFloat(valuee);
                            //     }
                            //     if(qty_disp != null && neg_adj != null){
                            //         sum_neg = parseFloat(qty_disp) + parseFloat(neg_adj);
                            //     }

                            //     // >>-------------end NEGATIVES--------------

                            //     if(ouu == oneou && onerow[0] == phy_count_code){
                            //         clos_bal = parseFloat(clos_bal) + parseFloat(valuee);
                            //     }

                            // });


                            var difference = sum_pos - sum_neg;
                            // console.log("sum_neg "+oneou+" == "+sum_neg);
                            // console.log("sum_pos "+oneou+" == "+sum_pos);
                            // console.log("clos_bal "+oneou+" == "+clos_bal);
                            // console.log("diff "+oneou+" == "+difference);
                            // console.log(" =============================== ");
                            if(sum_neg != null && sum_pos != null){
                                if(parseFloat(difference) === parseFloat(phy_count_val)){
                                    compliant_facility_count = compliant_facility_count+1;
                                    nodisc_facilities_names.push(theItems[oneou].name);
                                    nodisc_facilities_codes.push(oneou);
                                    nodisctbl += '<tr><td>'+theItems[oneou].name+'</td><td>'+getMFLcode(oneou)+'</td></tr>';
                                    // nodisctbl += '<tr><td>'+theItems[oneou].name+' <small class="hidethis"><br/><i>('+oneou+')</i> Sum_Pos: '+sum_pos+' && Sum_Neg: '+sum_neg+'  && Diff: '+difference+' && Clos_Bal: '+clos_bal+'</small> </td><td>'+"getMFLcode(oneou)"+'</td></tr>';
                                }
                            }
                        }
                    });
                    $.each(theDims.ou,(inex,valou)=>{
                        let the_ou = valou;
                        if(!nodisc_facilities_codes.includes(the_ou) && valid_orgs.includes(the_ou) ){
                            disc_facilities_codes.push(the_ou);
                            disc_facilities_names.push(theItems[the_ou].name);
                            disctbl += '<tr><td>'+theItems[the_ou].name+' </td><td>'+getMFLcode(the_ou)+'</td></tr>';
                            // disctbl += '<tr><td>'+theItems[the_ou].name+' <small class="hidethis"><br/><i>('+the_ou+')</i> </small> </td><td>'+"getMFLcode(the_ou)"+'</td></tr>';
                        }
                    });
                    $('#noDiscData').DataTable().destroy();
                    $('#noDiscData tbody').empty();
                    $('#noDiscData').append(nodisctbl);

                    $('#discData').DataTable().destroy();
                    $('#discData tbody').empty();
                    $('#discData').append(disctbl);
                    
                    //
                    var total_facils = parseFloat(disc_facilities_codes.length) + parseFloat(nodisc_facilities_codes.length);
                    var tot_nodisc = (parseFloat(nodisc_facilities_codes.length)*100)/total_facils;
                    var tot_disc = (parseFloat(disc_facilities_codes.length)*100)/total_facils;
                    $('#discCount, .discCount').html(total_facils-compliant_facility_count + '&nbsp;  <small>(' + tot_disc.toFixed(0) + '%)</small>');
                    $('#noDiscCount, .noDiscCount').html(compliant_facility_count + '&nbsp;  <small>(' + tot_nodisc.toFixed(0) + '%)</small>');
                    $('.totFacil').html(total_facils);
                    //
                    var with_discrepancy_number = tot_disc;
                    var no_discrepancy_number = tot_nodisc;

                    // $(document).ready(function() {
                        $('#noDiscData').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                        $('#discData').DataTable({
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                    // });

                    var non_compliant_facility_count = facility_count - compliant_facility_count;
                    // console.log("total_facilities = "+facility_count);
                    // console.log("compliant_facilities = "+compliant_facility_count);
                    // console.log("NON_compliant_facilities = "+non_compliant_facility_count);
                    // non_compliant_facility_count = 90;
                    // compliant_facility_count = 10;
                    // console.log("non ni:"+non_compliant_facility_count);
                    // console.log("ni ni:"+compliant_facility_count);
                    

                    var commodities_array = {
                        'c0MB4RmVjxk':{name:'Artemether-Lumefantrine 20/120 Tabs 12s'},
                        'BnGDrFwyQp9':{name:'Artemether-Lumefantrine 20/120 Tabs 6s'},
                        'qnZmg5tNSMy':{name:'Artemether-Lumefantrine 20/120 Tabs 18s'},
                        'gVp1KSFI69G':{name:'Artemether-Lumefantrine 20/120 Tabs 24s'},
                        'iOARK31NdLp':{name:'Artesunate Injection'},
                        'imheYfA1Kiw':{name:'Sulphadoxine Pyrimethamine Tabs'},
                        'cPlWFYbBacW':{name:'Rapid Diagnostic Tests'}
                    }

                    // commodity name
                        var commodity_name = '';
                        if(commd.includes('.')){
                            commd = commd.split('.')[0];
                        }
                        // console.log('commd ni-> '+commd);
                        
                        commodity_name = commodities_array[commd].name;
                        // console.log('commodity_name-> '+commodity_name);
                        // $.getJSON('https://hiskenya.org/api/26/dataElements/'+commd+'.json', function (data){
                        //     commodity_name = data.displayName; 
                        // });
                    // commodity name


                    // title fill
                        var dfrom = data.metaData.items[data.metaData.dimensions.pe[0]].name;
                        var dlength = parseFloat(data.metaData.dimensions.pe.length)-1;
                        var dto = data.metaData.items[data.metaData.dimensions.pe[dlength]].name;                
                        var url = 'https://hiskenya.org/api/organisationUnits/'+the_orgu+'.json?fields=id,name';
                        $.ajax({      
                            dataType: "json",
                            url: url,
                            success: function(datax) {          
                                // $("#ttitle").html(datax['name']+', '+dfrom+' - '+dto);
                                $("#ttitle").html(datax['name']+', '+dto);
                            }
                        });    
                    // END title fill
                    
                    pieThree(commodities_array[commd].name,'Internal Data Consistency',with_discrepancy_number, no_discrepancy_number,disc_facilities_codes,nodisc_facilities_codes);
                    $('.loader-sp.piethree').addClass('hidden');
                    $('.piethree_state').addClass('hidden');
                    $('#pc3, .pc3').removeClass('hidden');
                }
            });
            
        },
        error: function (request, status, error) {
            $('.loader-sp.piethree').addClass('hidden');
            $('#pc3, .pc3').addClass('hidden');
            $('.piethree_state').removeClass('hidden');
            console.log('DQ Consistency: error fetching json. :- '+error);
            $('.piethree_state').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}



// function getMFLcode(dhis_code) {
//     mfl_url = 'https://hiskenya.org/api/organisationUnits.json?fields=id,name,code&paging=false';
//     $.ajax({
//         type: 'GET',
//         crossDomain: true,
//         url: mfl_url,                    
//         success: function (data) 
//             {
//                 var ous = data.organisationUnits;
//                 // var arr_filterd_by_dhis_code = ous.filter(function(ele) {   return ele.id == dhis_code; });
//                 var arr_filterd_by_dhis_code = $.grep(ous, function(v) {
//                     return v.id === dhis_code;
//                 });
//                 var mfl_id = arr_filterd_by_dhis_code[0].code;
//                 return mfl_id;
//             }
//         });
// }




function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}
function makeList(name){
    window[name] = [];
    return window[name];
 }

 function popComms(commarr){
    var commodities_and_names = [];
	// $('#commodity-picker').empty();
    var comm_id_arr = [];
    // $('#commodity-picker').append('<option selected value="">Select Commodity</option>');
    $.each(commarr, function(indx, comm_id_long){
        var comm_id = comm_id_long.split('.')[0];
        comm_id_arr.push(comm_id);
        // console.log("comm_id:  "+comm_id);
    });
    
    var commodity_id_arrays_clean = eliminateDuplicates(comm_id_arr);
    $.each(commodity_id_arrays_clean, function (index, commodity_id) {
        $.getJSON('https://hiskenya.org/api/26/dataElements/'+commodity_id+'.json', function (data) 
        {
           var co_ar = []
           var commodity_name = data.displayName; 
           var commodity_id = data.id;
           co_ar.push(commodity_id, commodity_name);
           commodities_and_names.push(co_ar);
        //    commodities_and_names['id'] = commodity_id;
        //    commodities_and_names['name'] = commodity_name;
        //    $('#commodity-picker').append('<option value="'+commodity_id+'">'+commodity_name+'</option>');
        //    console.log("CommNames:  "+commodity_name);
        });
    });
}

//remove duplicates
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};
  
    for (i = 0; i < len; i++) {
      obj[arr[i]] = 0;
    }
    for (i in obj) {
      out.push(i);
    }
    return out;
  }
//end remove duplicates


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

function getCommodityName(commodity_id) {
    if(commodities_and_names.length>0 || commodities_and_names != undefined || commodities_and_names != null){
        // console.log('hiooo commodities_and_names === '+JSON.stringify(commodities_and_names));
        var commo_name_arr = filterItems(commodities_and_names, commodity_id);
        if(commo_name_arr != undefined && commo_name_arr.length>0){
            // console.log('hiooo commo_name_arr === '+JSON.stringify(commo_name_arr));
            return commo_name_arr[0];
        }
    }
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
function getPeriod(todayte, past) {
    // -------------find currentDate & factor for >15th -------------
      var tdate = new Date().getDate();
      if(past){
          tday = todayte.slice(4);
        //   console.log('other_tday: '+tday);
      }
    //   console.log('past: '+past + ' & todayte: '+todayte);
      var tyear1 = todayte.slice(0, -2);
      // var tyear2 = todayte.slice(0, -2);
      var tyear2 = tyear1;
      
    //   console.log('tdate => '+tdate);
      if(parseFloat(tdate) < 15 || past){
          var month1_full = todayte;
          var month1;
          var date2 = new Date();
          // date2.setMonth(month1);
          date2.setDate(1);
          var month2 = date2.getMonth();

          if(past){tdate = parseFloat(tday); month2 = tday;}
          if(month2 < 1){
              month2 = 12;
              tyear2 = (parseFloat(tyear2) - 1);
          }
          month1 = parseFloat(month2)-1;
          if(month1 < 1){
              month1 = 12;
              tyear1 = (parseFloat(tyear1) - 1);
          }
        //   console.log('month1 => '+month1);
        //   console.log('month2 => '+month2);
      }else{
          var month1_full = todayte;
          // if(!past){
              var month1 = parseFloat(month1_full.toString().slice(4))+1;
          // }else{
          //     var month1 = parseFloat(month1_full.toString().slice(4));
          // }
          var date2 = new Date();
          // date2.setMonth(month1);
          date2.setDate(1);
          // var month2 = date2.getMonth();
          var month2 = month1 + 1;
          if(month2 < 1){
              month2 = 12;
              tyear2 = (parseFloat(tyear2) - 1);
          }
          if(month1 < 1){
              month1 = 12;
              tyear1 = (parseFloat(tyear1) - 1);
          }
        //   console.log('month1 => '+month1);
        //   console.log('month2 => '+month2);
      }
      if(parseFloat(month1) < 10){month1 = "0"+month1}
      if(parseFloat(month2) < 10 && !past){month2 = "0"+month2}
    //   console.log("month1: "+ month1 + " && month2: "+month2);
      var period_string = tyear1+""+month1+";"+tyear2+""+month2;
      return period_string
    // -------------find currentDate & factor for >15th -------------
  }
//   console.clear();

function getTheCurrentPeriod() {
    var per_y = new Date().getFullYear();
    var per_m = new Date().getMonth();
    per_m = parseFloat(per_m) -1;
    if(parseFloat(per_m) < 0){ per_m = 12; per_y = parseFloat(per_y) - 1;}
    if(parseFloat(per_m) < 10){ per_m = "0"+per_m}
    var per = per_y+""+per_m;
    return(getPerio(per, false))
}
  
// function getLastMonthPeriod() {
//     var per_y = new Date().getFullYear();
//     var per_m = new Date().getMonth();
//     per_m = parseFloat(per_m) - 1;
//     if(parseFloat(per_m) < 0){ per_m = 12; per_y = parseFloat(per_y) - 1;}
//     if(parseFloat(per_m) < 10){ per_m = "0"+per_m}
//     var per = per_y+""+per_m;
//     return(getPeriod(per, false))
// }