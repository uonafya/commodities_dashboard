// fetch mfl codes

var mfl_codes_array = [];
mfl_url = 'https://testhis.uonbi.ac.ke/api/organisationUnits.json?fields=id,name,code&paging=false';
// mfl_url = 'http://localhost/pmi/json/mflcode.json';
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
        var mfl_id = arr_filterd_by_dhis_code[0].code;
        // console.log('mfl_id: '+arr_filterd_by_dhis_code);
        if(mfl_id == undefined){
            mfl_id = 'Not Available';
        }
        return mfl_id;
    
}
console.log("testMFL:  "+getMFLcode('BeyRouwSiVk'));
// filter by mfl codes



function getConco(ccurl,commodity){
$('.loader-sp.pieone').removeClass('hidden');
$('#pc1').addClass('hidden');
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: ccurl,                    
    success: function (data) {
        //populate commodities filter

        var theItems = data.metaData.items;
        var theDims = data.metaData.dimensions;
        var theComms = data.metaData.dimensions.dx;
        var thePer = data.metaData.dimensions.pe;
        // popComms(theComms);
        
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
        var therows_filtered_by_commodity = filterItems(therows,commodity);
        // console.log("filtered ROWS ni: "+JSON.stringify(therows_filtered_by_commodity));
        var equaltbl = '';
        $.each(theous, function(index, oneou){
            // var ou_name = theItems[oneou].name;
            var ou_filtered = filterItems(therows_filtered_by_commodity,oneou);
            // if(ou_filtered == [] || ou_filtered == ''){}else{
                // $.each(ou_filtered, function(idx, ou_fl){
                    // var filt_from = '201806';
                    var filt_from = thePer[thePer.length - 2];
                    // var filt_to = '201807'
                    var filt_to = thePer[thePer.length - 1];
                    var ou_fil_from = filterItems(ou_filtered,filt_from);
                    var ou_fil_to = filterItems(ou_filtered,filt_to);
                    $('#detailTitle').html('Closing: <u>'+filt_from + '</u> & Opening: <u>' + filt_to + '</u> | Commodity: <u>' + theItems[commodity].name + '</u>');
                    if(ou_fil_from[0] != undefined && ou_fil_to[0] != undefined){
                        console.log("OU: "+theItems[oneou].name+" ||  Opening SOH: "+ou_fil_from[0][3]);
                        console.log("OU: "+theItems[oneou].name+" ||  Closing SOH: "+ou_fil_to[0][3]);
                        // if(1==1){
                        if(ou_fil_from[0][3]==ou_fil_to[0][3]){
                            compliant_facility_count = compliant_facility_count+1;
                            compliant_facilities_names.push(theItems[oneou].name);
                            compliant_facilities_codes.push(oneou);
                            equaltbl += '<tr><td>'+theItems[oneou].name+'</td><td>'+getMFLcode(oneou)+'</td></tr>';
                        }
                        // }
                        // console.log("ou_fil_from: "+JSON.stringify(ou_fil_from));
                        // console.log("ou_fil_to: "+JSON.stringify(ou_fil_to));
                    }
                // });
            // }
        });
        $('#equalSOH').DataTable().destroy();
        $('#equalSOH tbody').append(equaltbl);
        var nonequaltbl = '';
        // alert(JSON.stringify(compliant_facilities_codes));
        $.each(theDims.ou,(inex,valou)=>{
            let the_ou = valou;
            if(!compliant_facilities_codes.includes(the_ou)){
                non_compliant_facilities_codes.push(the_ou);
                non_compliant_facilities_names.push(theItems[the_ou].name);
                nonequaltbl += '<tr><td>'+theItems[the_ou].name+'</td><td>'+getMFLcode(the_ou)+'</td></tr>';
            }
        });
        // alert(JSON.stringify(non_compliant_facilities_codes));
        $('#notEqualSOH').DataTable().destroy();
        $('#notEqualSOH tbody').append(nonequaltbl);
        $(document).ready(function() {
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
        });
        $('#equalCount').html(compliant_facilities_codes.length);
        $('#notEqualCount').html(non_compliant_facilities_codes.length);

        var non_compliant_facility_count = facility_count - compliant_facility_count;
        console.log("total_facilities = "+facility_count);
        console.log("compliant_facilities = "+compliant_facility_count);
        console.log("NON_compliant_facilities = "+non_compliant_facility_count);
        pieOne(theItems[commodity].name,compliant_facility_count,non_compliant_facility_count);
        $('.loader-sp.pieone').addClass('hidden');
        $('#pc1').removeClass('hidden');
        $('.detailsrow').removeClass('hidden');
    },
    error: function (request, status, error) {
        $('.loader-sp.pieone').addClass('hidden');
        $('#pc1').addClass('hidden');
        $('.detailsrow').addClass('hidden');
        console.log('DQ: error fetching json. :- '+error);
        $('.pieone_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
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
        $('.dqcol_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}

function getWBData(wburl){
$('#wbdata').addClass('hidden');
$('.loader-sp.wbdata').removeClass('hidden');
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
        // loops though the period
        $.each(json_data.metaData.dimensions.pe,(index,value)=>{
            let period = value;
            let total = 0;
            // Prints out the periods in the row key
            $.each(json_data.rows,(i_index,i_value)=>{
                if (period === i_value[1]){
                    total = total+ 1;
                }
            });
            reported.push(total);
        });
        let didNotReport = [];
        $.each(reported,(index,value)=>{
            const facilities = total_facilities
            let empty_reports = facilities - value
            didNotReport.push(empty_reports)
        });
        let wbdataset = [];
        var pearr = [];
        $.each(json_data.metaData.dimensions.pe,(ind,val)=>{
            pearr.push(dateToStr(val));
        });
        wbdataset.push(pearr);
        wbdataset.push(reported);
        wbdataset.push(didNotReport);
        
        var prdoptn = '<option selected="true" disabled>Select period</option>';
        $.each(json_data.metaData.dimensions.pe,(inx,prd)=>{
            prdoptn += '<option value='+prd+'>'+dateToStr(prd)+'</option>';
        });
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
        $('.wbdata_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});
}




function wbDetail(json_data, lastperiod){
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
        $.each(json_data.metaData.dimensions.ou,(inex,valou)=>{
            let the_ou = valou;
            if(!rp_fac_codes.includes(the_ou)){
                not_rp_fac_codes.push(the_ou);
                tbldata2 += '<tr>';
                tbldata2 += '<td>' + json_data.metaData.items[the_ou].name + '</td><td>' + getMFLcode(the_ou) + '</td>'
                tbldata2 += '</tr>';
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





function getConsist(consturl,commd){
    $('#pc3').addClass('hidden');
    $('.loader-sp.piethree').removeClass('hidden');
    $.ajax({
        type: 'GET',
        crossDomain: true,
        url: consturl,                    
        success: function (data) {
            //populate commodities filter
			var theou = 'tAbBVBbueqD';
            var theItems = data.metaData.items;
            var theDims = data.metaData.dimensions;
            var theDx = data.metaData.dimensions.dx;
            $.getJSON('https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:BnGDrFwyQp9.rPAsF4cpNxm;BnGDrFwyQp9.HWtHCLAwprR;c0MB4RmVjxk.rPAsF4cpNxm;c0MB4RmVjxk.HWtHCLAwprR;qnZmg5tNSMy.rPAsF4cpNxm;qnZmg5tNSMy.HWtHCLAwprR;gVp1KSFI69G.rPAsF4cpNxm;gVp1KSFI69G.HWtHCLAwprR;iOARK31NdLp.rPAsF4cpNxm;iOARK31NdLp.HWtHCLAwprR;imheYfA1Kiw.rPAsF4cpNxm;imheYfA1Kiw.HWtHCLAwprR;cPlWFYbBacW.rPAsF4cpNxm;cPlWFYbBacW.HWtHCLAwprR&dimension=ou:LEVEL-5;'+theou+'&dimension=pe:LAST_6_MONTHS&displayProperty=NAME&outputIdScheme=UID', function (data) {
                var theComms = data.metaData.dimensions.dx;                
                // popComms(theComms);
            });
            
            
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

            $.each(theous, function(index, oneou){
                var ou_filtered = filterItems(therows,oneou);
                
                var the_dx_0 = filterItems(ou_filtered,theDx[0]);
                var the_dx_1 = filterItems(ou_filtered,theDx[1]);
                // console.log("the Dx 1 ni: "+theDx[1]);
                if(the_dx_0[0] != undefined && the_dx_1[0] != undefined){
                    if(the_dx_0[0][3]==the_dx_1[0][3]){
                        compliant_facility_count = compliant_facility_count+1;
                        nodisc_facilities_names.push(theItems[oneou].name);
                        nodisc_facilities_codes.push(oneou);
                        nodisctbl += '<tr><td>'+theItems[oneou].name+'</td><td>'+getMFLcode(oneou)+'</td></tr>';
                    }
                }
                        
            });
            $.each(theDims.ou,(inex,valou)=>{
                let the_ou = valou;
                if(!nodisc_facilities_codes.includes(the_ou)){
                    disc_facilities_codes.push(the_ou);
                    disc_facilities_names.push(theItems[the_ou].name);
                    disctbl += '<tr><td>'+theItems[the_ou].name+'</td><td>'+getMFLcode(the_ou)+'</td></tr>';
                }
            });
            $('#noDiscData').append(nodisctbl);
            $('#discData').append(disctbl);
            $('#discCount').html(disc_facilities_codes.length);
            $('#noDiscCount').html(nodisc_facilities_codes.length);
            $(document).ready(function() {
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
            });

            var non_compliant_facility_count = facility_count - compliant_facility_count;
            console.log("total_facilities = "+facility_count);
            console.log("compliant_facilities = "+compliant_facility_count);
            console.log("NON_compliant_facilities = "+non_compliant_facility_count);
            // non_compliant_facility_count = 90;
            // compliant_facility_count = 10;
            console.log("non ni:"+non_compliant_facility_count);
            console.log("ni ni:"+compliant_facility_count);
            pieThree('Internal Data Consistency (AL 24)',compliant_facility_count,non_compliant_facility_count);
            $('.loader-sp.piethree').addClass('hidden');
            $('#pc3').removeClass('hidden');
        },
        error: function (request, status, error) {
            $('.loader-sp.piethree').addClass('hidden');
            $('#pc3').addClass('hidden');
            console.log('DQ Consistency: error fetching json. :- '+error);
            $('.piethree_state').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
        }
    });
}



// function getMFLcode(dhis_code) {
//     mfl_url = 'https://testhis.uonbi.ac.ke/api/organisationUnits.json?fields=id,name,code&paging=false';
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
	$('#commodity-picker').empty();
    var comm_id_arr = [];
    $('#commodity-picker').append('<option selected value="">Select Commodity</option>');
    $.each(commarr, function(indx, comm_id_long){
        var comm_id = comm_id_long.split('.')[0];
        comm_id_arr.push(comm_id);
        console.log("comm_id:  "+comm_id);
    });
    
    var commodity_id_arrays_clean = eliminateDuplicates(comm_id_arr);
    $.each(commodity_id_arrays_clean, function (index, commodity_id) {
        $.getJSON('https://testhis.uonbi.ac.ke/api/29/dataElements/'+commodity_id+'.json', function (data) 
        {
           var commodity_name = data.displayName; 
           var commodity_id = data.id;
           $('#commodity-picker').append('<option value="'+commodity_id+'">'+commodity_name+'</option>');
           console.log("CommNames:  "+commodity_name);
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

// window.setTimeout(function(){ $(window).resize(); }, 4000);