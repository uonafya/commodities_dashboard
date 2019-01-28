function getDetails(url) {
    var tdata = '';
    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        crossDomain: true,
        success: function (data) {
            $('#perdd').html(dateToStr(data.metaData.dimensions.pe[0]));
            $('#ounit').html(data.metaData.items[data.metaData.dimensions.ou[0]].name);
            var thedxreceived = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length/2);
            var thedxissued = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length);
            $.each(thedxissued, function (index, issdId) {
                var recvdId = thedxreceived[index];
                
                var iss_val = getVal(data.rows, issdId);
                var recvd_val = getVal(data.rows, recvdId);

                if(iss_val>recvd_val){
                    var diff_val = iss_val-recvd_val;
                }else{
                    var diff_val = 0;
                }

                var diff_perc = (diff_val/iss_val)*100;
                tdata+='<tr><td>'+data.metaData.items[issdId].name+'</td><td>'+iss_val+'</td><td>'+recvd_val+'</td><td>'+diff_val+'</td><td>'+diff_perc+'%</td></tr>';
            })
            $('#natnl tbody').append(tdata);
        },
        error: function(error){

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