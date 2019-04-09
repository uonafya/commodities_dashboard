function myOU(getOU) {
    $.ajax({
        type: "GET",
        crossOrigin: true,
        url:"https://testhis.uonbi.ac.ke/api/me.json",  
        success:function(response) {
            var ous = response.organisationUnits;
            var dataViewOU = response.dataViewOrganisationUnits[0];
            console.log('dataViewOU ==> '+JSON.stringify(dataViewOU));
            console.log('OUs ==> '+JSON.stringify(ous));
            getOU(data); 
        }
    });
  }