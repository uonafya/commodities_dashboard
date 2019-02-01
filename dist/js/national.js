function getDetails(url) {
    var tdata = '';
    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        crossDomain: true,
        success: function (data) {
            $('#perdd').html(dateToStr(data.metaData.dimensions.pe[0]));
            orgunits = data.metaData.dimensions.ou;
            var orgu_opts = '';
            $.each(orgunits, function (inx, orgu) {
                orgu_opts+='<option value='+orgu+'>'+data.metaData.items[orgu].name+'</option>';
            })
            $('#facility-dropdown').empty();
            $('#facility-dropdown').append(orgu_opts);
            $('#ounit').html(data.metaData.items[data.metaData.dimensions.ou[0]].name);
            var thedxissued = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length/2);
            var thedxreceived = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length);
            $.each(thedxissued, function (index, issdId) {
                var recvdId = thedxreceived[index];
                var iss_val = getVal(data.rows, issdId);
                var recvd_val = getVal(data.rows, recvdId);
                if(recvd_val == undefined){
                    recvd_val = 0;
                }

                var diff_val = iss_val-recvd_val;
                if(iss_val>recvd_val){

                }else{

                }

                var diff_perc = (diff_val/iss_val)*100;
                if(diff_perc<0){
                    // diff_perc = 100;
                }
                
                var bcolor = '';
                // var fcolor = '';
                if(diff_perc>=90){
                    bcolor = '#f2b2b2';
                    // fcolor = '#ffffff';
                }
                if(diff_perc>15 && diff_perc<90){
                    bcolor = '#f5c586';
                    // fcolor = '#111111';
                }
                
                if(diff_perc<15){
                    bcolor = '#a8e0b3';
                    // fcolor = '#ffffff';
                }


                tdata+='<tr bgcolor="'+bcolor+'"><td bgcolor="'+bcolor+'" style="color: #303030;">'+data.metaData.items[issdId].name.substr(4)+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+iss_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+recvd_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+diff_val+'</td><td bgcolor="'+bcolor+'" style="color: #303030;">'+diff_perc.toFixed(1)+'%</td></tr>';
                
            })
            $('#natnl tbody').append(tdata);
            $('.issues-loader').addClass('hidden');
            $('.issu_status').addClass('hidden');
        },
        error: function(error){
            $('.issues-loader').addClass('hidden');
            $('#nat-iss').addClass('hidden');
            $('.issu_status').html('<div class ="alert alert-danger"><strong>Data Error</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');

        }
    });
}
function getVal(arry,commo){
    var valu = filterItems(arry,commo);
    if(valu[0] != undefined){
        var thevalue = valu[0][2];
    }
    return thevalue;
}
function filterItems(array,query) {
    return array.filter(function(el) {
        return el.indexOf(query) > -1;
    })
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