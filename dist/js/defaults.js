// function myOU() {
//     var dataViewOU;
//     var ous;
//     $.ajax({
//         url:'https://testhis.uonbi.ac.ke/api/me.json',
//         async: false,
//         success: function (resp) {
//             ous = resp.organisationUnits;
//             dataViewOU = resp.dataViewOrganisationUnits[0];
//             console.log('dataViewOU ==> '+JSON.stringify(dataViewOU));
//             console.log('OUs ==> '+JSON.stringify(ous));
//             callback.call(dataViewOU);
//         },
//         error: function () {}
//     });
//     return dataViewOU;
// }

function myOU() {
    var dataViewOU;
    var ous;
    $.ajax({
        url:'https://testhis.uonbi.ac.ke/api/me.json',
        async: false,
        data: 'my OUs',
        success: function (resp) {
            ous = resp.organisationUnits;
            dataViewOU = resp.dataViewOrganisationUnits[0];
            console.log('dataViewOU ==> '+JSON.stringify(dataViewOU));
            console.log('OUs ==> '+JSON.stringify(ous));
        },
        error: function () {}
    });
    return dataViewOU["id"];
}