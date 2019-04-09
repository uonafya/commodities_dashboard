function myOU() {
    var end_url = 'https://testhis.uonbi.ac.ke/api/me.json';
    // var end_url = 'http://localhost/pmi/json/me-abdi.json';

    return $.ajax({
        type: "GET",
        url: "end_url",
        crossOrigin: true,
        success: function (response) {
            var ous = response.organisationUnits;
            var dataViewOU = response.dataViewOrganisationUnits[0];
            // alert('response.dataViewOrganisationUnits[0] ==>'+response.dataViewOrganisationUnits[0])
            log('OUs ==> '+JSON.stringify(ous));
            log('dataViewOU ==> '+JSON.stringify(dataViewOU));
            return dataViewOU;
        }
    });
}