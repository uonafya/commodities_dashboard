

        //function to process the Pending Shipments url
        function fetchPenShip(penshipUrl) {
            $('#sp_table').addClass('hidden');
            $('.spdata').addClass('hidden');
            $('.loader-sp').removeClass('hidden');
            $('.loader-sp').css('display','block');
			//get data on PMI stocks
			
			$.ajax({
                type: 'GET',
                crossDomain: true,
                url: penshipUrl,                    
                success: function (data) 
				{					
					var pmidata = [];
					var gfdata = [];
					var unicefdata = [];
					var mohdata = [];
					$.each(data.pmi[0], function (key, entry) 
					{		
						pmidata.push(entry);													
					})
					
					$.each(data.gf[0], function (key, entry) 
					{		
						gfdata.push(entry);													
					})
					
					$.each(data.unicef[0], function (key, entry) 
					{		
						unicefdata.push(entry);													
					})
					
					$.each(data.moh[0], function (key, entry) 
					{		
						mohdata.push(entry);													
					})
										
					//create the product array
					var products = {"PM03ART004": "Artemether-Lumefantrine 20/120 Tabs 6s", "PM03ART005": "Artemether-Lumefantrine 20/120 Tabs 12s",
				 "PM03ART006": "Artemether-Lumefantrine 20/120 Tabs 18s", "PM03ART007": "Artemether-Lumefantrine 20/120 Tabs 24s",
				 "PM03ART009": "Artesunate Injection", "PM03SPY001": "Sulphadoxine Pyrimethamine Tabs", "NL05TES067": "Rapid Diagnostic Tests"}
					
					
					//create the totals array
					var producttotals = [];
					

					//var tableData = '<table>';
					var tableData = '';
					
					var dxuom = ["doses", "doses", "doses", "doses", "vials", "tablets", "tests"];

					var sources = ["pmi", "gf","unicef", "moh"];
					
							
					//loop trough to populate data
					var itemcodes = [];
					
					var counter = 0
											
					//loop through the products
					$.each(products, function (prokey, proentry) 
					{
						//define the table
						var totalsum = 0;
						tableData += '<tr>';	
						tableData += '<td>'+proentry+'</td>';
						
						tableData += '<td>'+dxuom[counter]+'</td>';
						
						//source of funds	
						
						$.each(sources, function (fundskey, fundsentry) 
						{
							var sumdues = 0;
							var duesin = 0;
							
							if(fundsentry=='pmi')
							{
								var duesin = parseFloat(pmidata[counter]);
							}
							
							if(fundsentry=='gf')
							{
								var duesin = parseFloat(gfdata[counter]);
							}
							
							if(fundsentry=='unicef')
							{
								var duesin = parseFloat(unicefdata[counter]);
							}
							
							if(fundsentry=='moh')
							{
								var duesin = parseFloat(mohdata[counter]);
							}												
							
							//RDTS
							if(prokey=='NL05TES067')
							{
								sumdues += duesin*25;	
							}
							else if(prokey=='PM03SPY001')
							{
								sumdues += duesin*1000;	
							}
							else
							{
								sumdues += duesin;	
							}
												
							totalsum += sumdues;
							tableData += '<td class="text-right">'+formatNumber(sumdues)+ '</td>';																					
						})
						tableData += '<td class="text-right">'+formatNumber(totalsum)+ '</td>';
						tableData += '</tr>';
						counter++;
						//console.log(tableData);
					})
					
					var tfoot = '';
							
							var colspan = sources.length+1;
							
							tfoot += '<tr><th rowspan="2">Description</th><th rowspan="2">Unit of Measure</th>                                               <th colspan="'+colspan+'"><center><b>Pending Shipments</b></center></th></tr><tr>';
							
							$.each(sources, function (fundskey, fundsentry) 
							{
								tfoot += '<th>'+fundsentry.toUpperCase()+'</th>';
							})
							tfoot += '<th><b>Total</b></th></tr>';
							
							
							$('#sp_table').removeClass('hidden');
							$('.spdata').removeClass('hidden');
							$('.loader-sp').addClass('hidden');
							$('.loader-sp').css('display','none');					
							
							$('#sp_table').DataTable().destroy();
							$("table.spbox tbody").empty();
							$("table.spbox tbody").append(tableData);	
							$("table.spbox tfoot").empty();
							$("table.spbox tfoot").append(tfoot);
							$("table.spbox thead").empty();
							$("table.spbox thead").append(tfoot);
							$('#sp_table').DataTable(
					{
						dom: 'Bfrtip',
						"ordering": false,
						buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
					}
				);
				},
                error: function (request, status, error) 
				{
                    $('.loader-sp').addClass('hidden');
                    $('#sp_table').addClass('hidden');
                    //console.log('SP: error fetching json. :- '+error);
                    $('spdata').addClass('hidden');
                    $('.sp_status').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
                }
            });
			
		}
		

			
			$.ajax({
                type: 'GET',
                crossDomain: true,
				url: 'https://hiskenya.org/api/me.json',   
				// url:'https://json.link/oXqJ2CQ4c1.json',                 
                success: function (medata) {	
					let uid = medata.id
					console.log("meme ni : "+uid)
					//warero, kimaiyo, rosaga, sumbi, mwaura, commodities_api
					if(uid == "n1JM2kPZHyP" || uid == "osr1yl7f468" || uid == "kwRdXGqB9xd" || uid == "JUCFDJ3hV0U" || uid == "qnweUd3KjrU" || uid == "znPtzlScrsD" ){

						$('#addPenShip').removeClass('hidden')
						$("#newpenshipform").submit(function (e) {
							e.preventDefault();
							let pmi = {}
							pmi.al6 = $('#pmi_AL6').val()
							pmi.al12 = $('#pmi_AL12').val()
							pmi.al18 = $('#pmi_AL18').val()
							pmi.al24 = $('#pmi_AL24').val()
							pmi.as = $('#pmi_AS').val()
							pmi.sp = $('#pmi_SP').val()
							pmi.rdt = $('#pmi_RDT').val()
							
							let gf = {}
							gf.al6 = $('#gf_AL6').val()
							gf.al12 = $('#gf_AL12').val()
							gf.al18 = $('#gf_AL18').val()
							gf.al24 = $('#gf_AL24').val()
							gf.as = $('#gf_AS').val()
							gf.sp = $('#gf_SP').val()
							gf.rdt = $('#gf_RDT').val()
				
							let unicef = {}
							unicef.al6 = $('#unicef_AL6').val()
							unicef.al12 = $('#unicef_AL12').val()
							unicef.al18 = $('#unicef_AL18').val()
							unicef.al24 = $('#unicef_AL24').val()
							unicef.as = $('#unicef_AS').val()
							unicef.sp = $('#unicef_SP').val()
							unicef.rdt = $('#unicef_RDT').val()
				
							let moh = {}
							moh.al6 = $('#moh_AL6').val()
							moh.al12 = $('#moh_AL12').val()
							moh.al18 = $('#moh_AL18').val()
							moh.al24 = $('#moh_AL24').val()
							moh.as = $('#moh_AS').val()
							moh.sp = $('#moh_SP').val()
							moh.rdt = $('#moh_RDT').val()
				
							var data_to_push = {pmi, gf, unicef, moh, date: $('#date').val()}
				
							alert( "data_to_push = "+JSON.stringify(data_to_push, ' ', 3) )


							$.ajax({
								type: "PUT",
								crossDomain: true,
								url: "https://hiskenya.org/api/dataStore/malariadashboard/pendingshipments",
								data: JSON.stringify(data_to_push),
								headers: {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
									// 'Authorization': 'Basic '+btoa(`${'DHIS2_USERNAME'}:${'DHIS2_PASSWORD'}`)+''
								},
								dataType: "json",
								success: function (data, status) {
									// alert("Data: " + JSON.stringify(data) + "\nStatus: " + status);
									if(data.httpStatusCode == 200 || data.httpStatus == "OK" || status == "OK"){
										$('#alert_msg').removeClass('hidden').addClass('alert-success');
										$('#alert_msg span').html('<strong>Success</strong> <br/> New pending shipments saved successfully');
									}else{
										$('#alert_msg').removeClass('hidden').addClass('alert-warning');
										$('#alert_msg span').html('<strong>Error</strong> <br/> There was an error saving pending shipments');
									}
									$('#penship-modal').modal('toggle');
								}
							});
						});

					}else{
						$('#addPenShip').html('')
					}
				}, error: function (request, status, error) {
					$('#addPenShip').html('')
				}
			});