function getDetails(url) {
    var tdata = '';
    $.ajax({
        type: "GET",
        url: url,
        data: "data",
        crossDomain: true,
        success: function (data) {
            $('#dettitle span').html(dateToStr(data.metaData.dimensions.pe[0]));
            $('#perd').html(dateToStr(data.metaData.dimensions.pe[0]));
            var thedx = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length/2);
            var thedxreceived = data.metaData.dimensions.dx.splice(0,data.metaData.dimensions.dx.length);
            $.each(thedx, function (index, thedx) {
                var recvdId = thedxreceived[index];
                var iss_val = 300;
                var recvd_val = getRecvd(data.rows,'APdt9R69Ycb',data.metaData.dimensions.pe,recvdId);
                var diff_val = iss_val-recvd_val;
                var diff_perc = (diff_val/iss_val)*100;
                tdata+='<tr><td>'+data.metaData.items[thedx].name+'</td><td>'+iss_val+'</td><td>'+recvd_val+'</td><td>'+diff_val+'</td><td>'+diff_perc+'%</td></tr>';
            })
            $('#natnl tbody').append(tdata);
            alert(getRecvd(data.rows,'APdt9R69Ycb','201805','BnGDrFwyQp9.yuvCdaFqdCW'));
        },
        error: function(error){

        }
    });
}


function getRecvd(arr,ou,per,com) {
    var rows = arr;
    var with_ou = filterItems(rows,ou);
    console.log('with OU: ->  '+JSON.stringify(with_ou));
    var with_ou_per = filterItems(with_ou,per);
    console.log('with OU&PER: ->  '+JSON.stringify(with_ou_per));
    var with_ou_per_com = filterItems(with_ou_per,com);
    console.log('with OU&PER&COM: ->  '+JSON.stringify(with_ou_per_com));
    return parseFloat(with_ou_per_com[0][3]);
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