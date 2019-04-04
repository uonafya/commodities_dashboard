function fetchAccountability(url,orgun) {
    var tdata = '';
    $('.accdata').addClass('hidden');
    $('#acc_loader, .acc_loader, .loader, .loader-sp').removeClass('hidden');
    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        crossDomain: true,
        success: function (data) {
            $('.accdata').removeClass('hidden');
            $('#acc_loader').addClass('hidden');
            if($.fn.DataTable.isDataTable("#acc_table")){
                $('#acc_table').DataTable().destroy();
                $("#acc_table tbody").empty();
            }
            var thedx_unaltered = data.metaData.dimensions.dx;
            var thedx = data.metaData.dimensions.dx;
            var therows = data.rows;
            var commodities_arr = thedx.splice(21,7);
            // var thedx_unaltered = thedx.splice(0,data.metaData.dimensions.dx.length);
            var commodities_ki_arr = thedx.splice(14,7);

            var commodities_id_arr0 = [];
            var commodities_id_ki_arr0 = [];
            var commodities_id_arr = [];
            var commodities_id_ki_arr = [];
            var commodities_name_arr = [];
            $.each(thedx, function (index, dx) {
                // console.log("The DX: "+data.metaData.items[dx].name);
                //begbal:HWtHCLAwprR, +veAdj:CckV73xy6HB, [missing:KI] -veAdj:w77uMi1KzOH, phyCount:rPAsF4cpNxm,
            });
            $.each(commodities_arr, function (index, co_ar) {
                commodities_id_arr0 = co_ar.split('.',2);
                commodities_id_arr.push(commodities_id_arr0[0]);
            });
            
            $.each(commodities_ki_arr, function (index, co_ki_ar) {
                commodities_id_ki_arr0 = co_ki_ar.split('.',1);
                commodities_id_ki_arr.push(commodities_id_ki_arr0);
            });
            $.each(commodities_arr, function (indx, coid) {
                commodities_name_arr.push(data.metaData.items[coid].name.substring(0, data.metaData.items[coid].name.length - 26));
                // commodities_name_arr.push(data.metaData.items[coid].name);
            });

            // console.log('commodities_id_arr: '+commodities_id_arr);
            // console.log('commodities_id_ki_arr: '+commodities_id_ki_arr);
            // console.log('commodities_name_arr: '+commodities_name_arr);
            
            $.each(data.metaData.dimensions.ou, function (index, ou) {
                var tabl = '';
                var ki_cells = [];
                var rows_filtered_ou = filterItems(therows, ou);
                var opsoh_arr = [];
                var posadj_arr = [];
                var kemsi_arr = [];
                var qtydisp_arr = [];
                var negadj_arr = [];
                var kissue_arr = [];
                var closbal_arr = [];
                var pcacc_arr = [];

                // console.log('commodities_ki_arr==> '+JSON.stringify(commodities_ki_arr));
                $.each(commodities_ki_arr, function (index, one_ki) { 
                     var filt_rows = filterItems(rows_filtered_ou, one_ki);
                    //  console.log("filt_rows==> "+JSON.stringify(filt_rows));
                    if(filt_rows[0] == undefined){filt_rows[0] = [[0,0,0,0]];}
                    ki_cells.push(filt_rows[0][3]);
                });
                //  console.log('ki_cells==> '+JSON.stringify(ki_cells));

                $.each(commodities_id_arr, function (com_indx, com) {
                    var rows_filtered_ou_commo1 = filterItems(rows_filtered_ou, com+".HWtHCLAwprR");
                    var rows_filtered_ou_commo2 = filterItems(rows_filtered_ou, com+".CckV73xy6HB");
                    var rows_filtered_ou_commo3 = filterItems(rows_filtered_ou, com+".w77uMi1KzOH");
                    var rows_filtered_ou_commo4 = filterItems(rows_filtered_ou, com+".unVIt2C0cdW");
                    var rows_filtered_ou_commo5 = filterItems(rows_filtered_ou, com+".rPAsF4cpNxm");
                    tabl+='<tr><td>'+data.metaData.items[ou].name+'</td><td>'+commodities_name_arr[com_indx]+'</td>';
                    // ----------data cells----------
                    var opsoh = filterItems(rows_filtered_ou_commo1,com+".HWtHCLAwprR")[0];
                    if(opsoh == undefined){opsoh = [0,0,0,0];}
                    opsoh_arr.push(opsoh[3]);
                    tabl+='<td class="text-right">'+formatNumber(opsoh[3])+'</td>';
                    
                    var posadj = filterItems(rows_filtered_ou_commo2,com+".CckV73xy6HB")[0];
                    if(posadj == undefined){posadj = [0,0,0,0];}
                    // console.log('posADJ == '+posadj);
                    tabl+='<td class="text-right">'+formatNumber(posadj[3])+'</td>';
                    posadj_arr.push(posadj[3]);
                    
                    tabl+='<td class="text-right">'+formatNumber(ki_cells[com_indx])+'</td>';
                    kemsi_arr.push(ki_cells[com_indx]);

                    var qtydisp = filterItems(rows_filtered_ou_commo3,com+".w77uMi1KzOH")[0];
                    if(qtydisp == undefined){qtydisp = [0,0,0,0];}
                    qtydisp_arr.push(qtydisp[3]);
                    tabl+='<td class="text-right">'+formatNumber(qtydisp[3])+'</td>';
                    
                    var negadj = filterItems(rows_filtered_ou_commo4,com+".unVIt2C0cdW")[0];
                    if(negadj == undefined){negadj = [0,0,0,0];}
                    negadj_arr.push(negadj[3]);
                    tabl+='<td class="text-right">'+formatNumber(negadj[3])+'</td>';
                    
                    var closbal = filterItems(rows_filtered_ou_commo5,com+".rPAsF4cpNxm")[0];
                    if(closbal == undefined){closbal = [0,0,0,0];}
                    closbal_arr.push(closbal[3]);
                    tabl+='<td class="text-right">'+formatNumber(closbal[3])+'</td>';

                    var kiar = [];
                    kiar = getPerc();
                    // console.log(kiar);
                    
                    var k_is_val = parseFloat(kiar[com_indx]);
                    if(Number.isNaN(k_is_val)){
                        k_is_val = 0;
                    }else{
                        k_is_val = parseFloat(kiar[com_indx]);
                    }
                    
                    var sum_pos = parseFloat(opsoh[3])+parseFloat(posadj[3])+parseFloat(k_is_val);
                    // console.log("sum_pos: "+sum_pos);
                    var sum_neg = parseFloat(qtydisp[3])+parseFloat(negadj[3])+parseFloat(closbal[3]);
                    // console.log("sum_neg: "+sum_neg);
                    var per_acc_for = parseFloat(sum_neg)/parseFloat(sum_pos);
                    per_acc_for = per_acc_for*100;
                    // console.log("per_acc_for: "+per_acc_for);
                    tabl+='<td class="text-right">'+per_acc_for.toFixed(1)+'%</td>';
                    pcacc_arr.push(per_acc_for);

                    // ----------END data cells----------
                    tabl+='</tr>';
                });
                
                tabl+='<tr class="text-bold fcblack">';
                tabl+='<td class="text-caps">'+data.metaData.items[ou].name+' Total</td>';
                tabl+='<td> - </td>';
                tabl+='<td class="text-right" id="'+ou+'_totalOpeningSOH"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalPveAdj"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalKEMSAIssues"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalQtyDisp"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalNveAdj"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalClosingSOH"></td>';
                tabl+='<td class="text-right" id="'+ou+'_totalPcAccounted"></td>';
                tabl+='</tr>';
                
                tabl+='<tr><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td><td> &nbsp; &nbsp; </td></tr>';
                $('#acc_table tbody').append(tabl);

                $.each(commodities_id_ki_arr, function (comki_indx, com_ki) {
                    var kione_val = filterItems(rows_filtered_ou, com_ki[0]);
                    if(kione_val[0] == undefined || kione_val == undefined || kione_val == null || kione_val == ''){kione_val = [0,0,0,0];}
                    if(typeof kione_val[0] == 'number'){
                        var kione_value = kione_val[3];
                    }else if(typeof kione_val[0] == 'array' || typeof kione_val[0] == 'object'){
                        var kione_value = kione_val[0][3];
                    }
                    var kione_id2 = ou+"_ki_cell_"+comki_indx;
                    kissue_arr.push(kione_val);
                    $("#"+kione_id2).html(kione_value);
                });

                
                function getPerc(){
                    // console.log("getPerc() triggered, returning: " + kissue_arr);
                    return kissue_arr;
                }
                $('#'+ou+'_totalOpeningSOH').html(sumArr(opsoh_arr));
                $('#'+ou+'_totalPveAdj').html(sumArr(posadj_arr));
                // $('#'+ou+'_totalKEMSAIssues').html(sumArr(kissue_arr));
                $('#'+ou+'_totalKEMSAIssues').html(sumArr(kemsi_arr));
                $('#'+ou+'_totalQtyDisp').html(sumArr(qtydisp_arr));
                $('#'+ou+'_totalNveAdj').html(sumArr(negadj_arr));
                $('#'+ou+'_totalClosingSOH').html(sumArr(closbal_arr));

                var tot_neg = sumArr(closbal_arr) + sumArr(negadj_arr) + sumArr(qtydisp_arr);
                var tot_pos = sumArr(opsoh_arr) + sumArr(posadj_arr) + sumArr(kissue_arr);
                var tot_acc = (tot_neg/tot_pos)*100
                $('#'+ou+'_totalPcAccounted').html(tot_acc.toFixed(1));

                // title fill
                    var url = 'https://testhis.uonbi.ac.ke/api/organisationUnits/'+orgun+'.json?fields=id,name';
                    $.ajax({      
                        dataType: "json",
                        url: url,
                        success: function(datax) {   
                            var pe_length = data.metaData.dimensions.pe.length;
                            var dfrom = data.metaData.items[data.metaData.dimensions.pe[0]].name;
                            if(pe_length>1){
                                var dto = data.metaData.items[data.metaData.dimensions.pe[pe_length-1]].name;
                                var thetitle = datax['name']+' : '+ dfrom + ' - '+ dto;
                            }else{
                                var thetitle = datax['name']+' : '+ dfrom;
                            }
                            $('#ttitle').html(thetitle);
                        }
                    });    
                // END title fill

            });
    
            
            $('.acc_loader').addClass('hidden');
            $('#acc_table').removeClass('hidden');
            $('.acc_status').addClass('hidden');
            $('#acc_table').DataTable( {
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ],
                ordering: false,
                orderable: false
            });
            
        },
        error: function(error){
            $('.acc_loader').addClass('hidden');
            $('#acc_table').addClass('hidden');
            $('.acc_status').removeClass('hidden');
            $('.acc_status').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');

        }
    });
}
function getVal(arry,commo){
    var valu = filterItems(arry,commo);
    if(valu[0] != undefined){
        var thevalue = valu[0][3];
    }
    return thevalue;
}
function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
}
function sumArr(array) {
    var sum_total = 0;
    if(array == null || array == undefined){
        array = [0];
    }
    $.each(array, function (indx, val) {
        if(val == null || val == undefined){
            val = 0;
        }
        sum_total+=parseFloat(val);
    })
    return sum_total;
}
function dateToStr(ledate){
    var leyear = ledate.substr(0,4);
    var lemonth = ledate.substr(4,5);
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