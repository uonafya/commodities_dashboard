// function myOU(getOU) {
//     $.ajax({
//         type: "GET",
//         crossOrigin: true,
//         url:"https://testhis.uonbi.ac.ke/api/me.json",  
//         success:function(response) {
//             var ous = response.organisationUnits;
//             var dataViewOU = response.dataViewOrganisationUnits[0];
//             console.log('dataViewOU ==> '+JSON.stringify(dataViewOU));
//             console.log('OUs ==> '+JSON.stringify(ous));
//             getOU(data); 
//         }
//     });
//   }


function myOU() {
    var dataViewOU;
    var ous;
    $.ajax({
        url:'https://testhis.uonbi.ac.ke/api/me.json',
        data: data,
        async: false,
        success: function (resp) {
            ous = response.organisationUnits;
            dataViewOU = resp.dataViewOrganisationUnits[0];
            console.log('dataViewOU ==> '+JSON.stringify(dataViewOU));
            console.log('OUs ==> '+JSON.stringify(ous));
            callback.call(dataViewOU);
        },
        error: function () {}
    });
    return dataViewOU;
}