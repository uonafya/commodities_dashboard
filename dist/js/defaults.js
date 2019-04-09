function myOU(getOU) {
    $.ajax({
        type: "GET",
        crossOrigin: true,
        url:"https://testhis.uonbi.ac.ke/api/me.json",  
        success:function(response) {
            var ous = response.organisationUnits;
            var dataViewOU = response.dataViewOrganisationUnits[0];
            // alert('response.dataViewOrganisationUnits[0] ==>'+response.dataViewOrganisationUnits[0])
            log('OUs ==> '+JSON.stringify(ous));
            log('dataViewOU ==> '+JSON.stringify(dataViewOU));
            getOU(data); 
        }
    });
  }