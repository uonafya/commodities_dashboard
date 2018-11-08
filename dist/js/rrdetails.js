var rrdettable = $('#rrdettable');
var rrdettable_body = $('#rrdettable tbody');
var rdurl = 'http://localhost/pmi/json/reportingdetails.json'
$.ajax({
    type: 'GET',
    crossDomain: true,
    url: rdurl,                    
    success: function (rdData) {
        $('.loader-sp').addClass('hidden');
        rrdettable.removeClass('hidden');
        plotRRDetable(rdData);
    },
    error: function (request, status, error) {
        $('.loader-sp').addClass('hidden');
        rrdettable.addClass('hidden');
        console.log('RRates: error fetching json. :- '+error);
        $('.state.col-md-12').html('<div class ="alert alert-danger"><strong>Error</strong><br/>Failed to load this table. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
    }
});

function plotRRDetable(rdData){
    period = rdData.metaData.dimensions.pe;
    rdRows = rdData.rows;
    rdItems = rdData.metaData.items;
    ous = rdData.metaData.dimensions.ou;
    var tablehead = '<td>Sub-county/Facility</td>';
    var trows = '';
    $.each(period, function(index, eachperiod){
        tablehead+=('<td>'+eachperiod+'</td>');
    });
    var rowdata = [];
    $.each(ous, function(indexy, eachou){
        $.each(rdRows, function(index, eachrow){
            if(eachrow.includes(eachou)){
                trows+='<tr>';
                    trows+='<td>'+eachrow[2]+'</td>';
                    $.each(period, function(indexz, eachnesperiod){
                        var theval = checkPeriod(eachrow,eachnesperiod);
                        if(theval == 1){
                            trows+='<td>'+theval+'</td>';
                        }else{
                            trows+='<td style="background: #ffc7ce;"></td>';
                        }
                    });
                trows+='</tr>';
            }
        });
    });
    rrdettable_body.html(trows);
    $('#rrdettable thead tr').html(tablehead);
    $('#rrdettable tfoot tr').html(tablehead);
    rrdettable.DataTable();
    
    
    
    function checkPeriod(onerow,perd){
        if(onerow.includes(perd)){
            return onerow[3];
        }else{
            return '';
        }
    }

    // console.log('Hiii! :->  '+JSON.stringify(rdRows));
}