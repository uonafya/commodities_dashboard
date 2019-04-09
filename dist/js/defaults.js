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
    var my_data_ou;
    var my_county;
    var my_subcounty;
    $.ajax({
        url:'https://testhis.uonbi.ac.ke/api/me.json',
        async: false,
        data: 'my OUs',
        success: function (resp) {
            ous = resp.organisationUnits;
            dataViewOU = resp.dataViewOrganisationUnits[0];
            my_data_ou = dataViewOU["id"];
            var level;
            $.ajax({
                type: "GET",
                url: "https://testhis.uonbi.ac.ke/api/organisationUnits/"+my_data_ou+".json?fields=ancestors,level",
                async: false,
                data: "my OUs2",
                success: function (response) {
                    console.log('2nd ajax success');
                    level = response.level;
                    if(level > 1){
                        my_county = response.ancestors[1]["id"];
                    }else{
                        my_county = my_data_ou;
                    }
                }
            });
        },
        error: function () {}
    });
    return my_county;
}