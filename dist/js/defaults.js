function myOU() {
    var dataViewOU;
    var ous;
    var my_data_ou;
    var my_county;
    var my_subcounty;
    $.ajax({
        url:'https://testhis.uonbi.ac.ke/api/me.json',
        async: false,
        data: '',
        success: function (resp) {
            ous = resp.organisationUnits;
            dataViewOU = resp.dataViewOrganisationUnits[0];
            my_data_ou = dataViewOU["id"];
            var level;
            $.ajax({
                type: "GET",
                url: "https://testhis.uonbi.ac.ke/api/organisationUnits/"+my_data_ou+".json",
                async: false,
                data: "fields=ancestors,level",
                success: function (response) {
                    level = response.level;
                    if(level > 2){
                        console.log('hoooo: '+JSON.stringify(response.ancestors));
                        if(response.ancestors[1]["id"] !== undefined){
                            my_county = response.ancestors[1]["id"];
                            console.log('oooone');
                        }else{
                            my_county = response.ancestors[0]["id"];
                            console.log('twoooo');
                            
                        }
                        console.log('my_county (level > 1): '+my_county);
                        $('#county-dropdown option[value='+my_county+']').attr('selected', 'selected');
                    }else{
                        my_county = my_data_ou;
                        console.log('my_county (else): '+my_county)
                    }

                    if(my_county == 'HfVjCurKxh2'){
                        my_county = 'vvOK1BxTbet';
                    }
                }
            });
        },
        error: function () {}
    });
    return my_county;
}