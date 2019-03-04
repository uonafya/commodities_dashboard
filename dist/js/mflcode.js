// fetch mfl codes
var mfl_codes_array = [];
//mfl_url = 'https://testhis.uonbi.ac.ke/api/organisationUnits.json?fields=id,name,code&paging=false';
mfl_url = 'https://testhis.uonbi.ac.ke/api/apps/Health-Commodities-Dashboard/assets/json/orgunits.json';
getMFLarray(mfl_url);

function getMFLarray(mfl_url) 
{
	$.getJSON(mfl_url, function (data) 
	{
	 mfl_codes_array = data.organisationUnits;
	 //console.log('mfl_codes_array: '+mfl_codes_array);
	});
}

 //---------- fetch mfl codes
 // filter by mfl codes
 function getMFLcode(dhis_id) 
 {
	 //console.log(dhis_id);
     if(mfl_codes_array == null)
	 {
         getMFLarray(mfl_url);
     }
	 // var ous = data.organisationUnits;
	 var ous = mfl_codes_array;
	 var arr_filterd_by_dhis_code = $.grep(ous, function(v) {		 
		 return v.id === dhis_id;
	 });
	 
	 var mfl_id = ' - '
	 if(arr_filterd_by_dhis_code.length>0)
	 {
		mfl_id = arr_filterd_by_dhis_code[0].code;
	 }
	 
	 return mfl_id;     
 }
 // filter by mfl codes