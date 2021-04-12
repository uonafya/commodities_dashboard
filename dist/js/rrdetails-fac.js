//function toprocess the acts url
// function fetchRRDetails(rdurl,ounit)
function fetchRRDetails(theperiod, ounit) {
  var rdurl =
    "https://hiskenya.org/api/26/analytics.json?dimension=dx:RRnz4uPHXdl.ACTUAL_REPORTS;RRnz4uPHXdl.EXPECTED_REPORTS&dimension=pe:" +
    theperiod +
    "&dimension=ou:" +
    ounit +
    ";LEVEL-3&displayProperty=NAME&outputIdScheme=UID";
  // var rdurl = theperiod
  console.log("rdurl is:-> " + rdurl);
  $("#facility_rr").addClass("hidden");
  $(".loader-sp").removeClass("hidden");

  $.ajax({
    type: "GET",
    crossDomain: true,
    url: rdurl,
    success: function(data) {
      // var valid_ous_url = 'http://localhost/pmi/json/valid_ous.json';
      var valid_ous_url =
        "https://hiskenya.org/api/dataSets.json?fields=id,name,organisationUnits[id]&filter=id:ilike:RRnz4uPHXdl&paging=false";
      $.ajax({
        type: "GET",
        crossDomain: true,
        url: valid_ous_url,
        success: function(validata) {
          console.log("fetching valid OUs success");
          var valid_orgs = [];
          $.each(validata.dataSets[0].organisationUnits, function(inv, vou) {
            valid_orgs.push(vou.id);
          });
          console.log("valid_orgs " + JSON.stringify(valid_orgs));
          $("#facility_rr").removeClass("hidden");
          var header = "";
          var footer = "";
          var tableData = "";

          //put the header
          header += "<thead><tr>";
          header += "<th>Name</th>";
          header += "<th>Code</th>";

          $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
            header += '<th class="text-right">' + dateToStr(pentry) + "</th>";
            // console.log("HEAD: "+pentry);
          });

          header += "</tr></thead>";

          //put the footer
          footer += "<tfoot><tr>";
          footer += "<th>Name</th>";
          footer += "<th>Code</th>";

          $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
            footer += '<th class="text-right">' + dateToStr(pentry) + "</th>";
          });

          footer += "</tr></tfoot>";

          tableData += header;

          //start body
          tableData += "<tbody>";

          $.each(data.metaData.dimensions.ou, function(key, entry) {
            if (valid_orgs.includes(entry)) {
              tableData += "<tr>";
              tableData += "<td>" + data.metaData.items[entry].name + "</td>";
              tableData += "<td>" + getMFLcode(entry) + "</td>";
              $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
                var rpt_count = getExpectedSub(data.rows, pentry, entry);
                var reportval = getReport(data.rows, pentry, entry);
                if (reportval) {
                  if (reportval == rpt_count) {
                    tableData +=
                      '<td style="background-color: #77ff77;">' +
                      reportval +
                      "/" +
                      rpt_count +
                      "</td>";
                  } else {
                    tableData +=
                      '<td style="background-color: #ffeb9c;">' +
                      reportval +
                      "/" +
                      rpt_count +
                      "</td>";
                  }
                } else {
                  var bgcolor = "#ffeb9c";
                  tableData +=
                    '<td style="border: 1px solid #fff;" bgcolor="' +
                    bgcolor +
                    '">' +
                    reportval +
                    "/" +
                    rpt_count +
                    "</td>";
                }
              });
              tableData += "</tr>";
            }
          });

          tableData += "</tbody>";
          //footer line
          // tableData += footer;

          // title fill
          var urlt =
            "https://hiskenya.org/api/organisationUnits/" +
            ounit +
            ".json?fields=id,name";
          console.log("loading title.... URL: " + urlt);
          $.ajax({
            dataType: "json",
            url: urlt,
            success: function(data_t) {
              $("#ttitle").html(data_t["name"]);
              console.log("data_t: -> " + JSON.stringify(data_t));
            }
          });
          // END title fill

          $(".loader-sp").addClass("hidden");
          $("#facility_rr").removeClass("hidden");
          if ($.fn.DataTable.isDataTable("#facility_rr")) {
            $("#facility_rr")
              .DataTable()
              .destroy();
            $("#facility_rr").empty();
            $("#facility_rr").append(tableData);
          } else {
            // $("#facility_rr").append('<tbody>');
            $("#facility_rr").append(tableData);
            // $("#facility_rr").append('</tbody>');
          }
          // console.log("tableData: "+tableData);
          $("#facility_rr").DataTable({
            dom: "Bfrtlip",
            lengthMenu: [
              [10, 25, 50, 100, -1],
              [10, 25, 50, 100, "All"]
            ],
            ordering: false,
            buttons: ["copy", "csv", "excel", "pdf", "print", "pageLength"]
          });
        }
      });
    },
    error: function(request, status, error) {
      $(".loader-sp").addClass("hidden");
      $("#facility_rr").addClass("hidden");
      $(".loader-sp.rrdb").removeClass("hidden");
      $(".rrdetailsbox").addClass("hidden");
      console.log(
        "Reporting Rate Details: error fetching json. :- " +
          error +
          " ::: " +
          JSON.stringify(request)
      );
      // $('.rdstate').html('<div class ="alert alert-danger"><strong>'+request.responseJSON.httpStatusCode+': '+request.responseJSON.message+'</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>');
      $(".rdstate").html(
        '<div class ="alert alert-danger"><strong>' +
          status +
          '</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>'
      );
    }
  });

  function fetchSubRRDetails(scrdurl, ounit) {
    $(".loader-sp.sp-sub").removeClass("hidden");
    $("#zero_config-sub.rrdetailsbox-sub").addClass("hidden");
    $.ajax({
      type: "GET",
      crossDomain: true,
      url: scrdurl,
      success: function(data) {
        var header = "";
        var footer = "";
        var tableDataSub = "";

        //put the header
        header += "<thead><tr>";
        header += "<th>Name</th>";

        $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
          header += "<th>" + dateToStr(pentry) + "</th>";
          // console.log("HEAD: "+pentry);
        });

        header += "</tr></thead>";

        //put the footer
        footer += "<tfoot><tr>";
        footer += "<th>Name</th>";

        $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
          footer += '<th class="text-right">' + dateToStr(pentry) + "</th>";
        });

        footer += "</tr></tfoot>";

        tableDataSub += header;

        //start body
        tableDataSub += "<tbody>";

        //console.log(orgunits.length);
        $.each(data.metaData.dimensions.ou, function(key, entry) {
          var expected = checkExpected(data.rows, entry);
          if (expected == 1) {
            tableDataSub += "<tr>";
            tableDataSub += "<td>" + data.metaData.items[entry].name + "</td>";

            $.each(data.metaData.dimensions.pe, function(pkey, pentry) {
              var exp_count = getExpectedToReport(data.rows, pentry, entry);
              var reportval = getReport(data.rows, pentry, entry);
              if (reportval) {
                if (reportval == exp_count) {
                  tableDataSub +=
                    '<td style="background-color: #77ff77;">' +
                    reportval +
                    "/" +
                    exp_count +
                    "</td>";
                } else {
                  tableDataSub +=
                    '<td style="background-color: #ffeb9c;">' +
                    reportval +
                    "/" +
                    exp_count +
                    "</td>";
                }
              } else {
                var bgcolor = "#ffeb9c";
                tableDataSub +=
                  '<td style="border: 1px solid #fff;" bgcolor="' +
                  bgcolor +
                  '">' +
                  reportval +
                  "</td>";
              }
            });

            tableDataSub += "</tr>";
          }
        });
        // title fill
        var url =
          "https://hiskenya.org/api/organisationUnits/" +
          ounit +
          ".json?fields=id,name";
        $.ajax({
          dataType: "json",
          url: url,
          success: function(datax) {
            $("#ttitle").html(datax["name"] + ".");
          }
        });
        // END title fill

        tableDataSub += "</tbody>";
        //footer line
        // tableDataSub += footer;
        //subcounty

        $("#subcounty_rr").removeClass("hidden");
        if ($.fn.DataTable.isDataTable("#subcounty_rr")) {
          $("#subcounty_rr")
            .DataTable()
            .destroy();
          $("#subcounty_rr").empty();
          $("#subcounty_rr").append(tableDataSub);
        } else {
          // $("#subcounty_rr").append('<tbody>');
          $("#subcounty_rr").append(tableDataSub);
          // $("#subcounty_rr").append('</tbody>');
        }
        // console.log("tableDataSub: "+tableDataSub);
        $("#subcounty_rr").DataTable({
          dom: "Bfrtlip",
          lengthMenu: [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
          ],
          ordering: false,
          buttons: ["copy", "csv", "excel", "pdf", "print", "pageLength"]
        });
      },
      error: function(request, status, error) {
        $(".loader-sp.sp-sub").addClass("hidden");
        $(".rrdetailsbox-sub").addClass("hidden");
        console.log(
          "Reporting Rate Details: error fetching json. Status: " +
            status +
            " ::: Error: " +
            error +
            ". ||| " +
            JSON.stringify(request)
        );
        $(".rdstate-sub").html(
          '<div class ="alert alert-danger"><strong>' +
            request.responseJSON.httpStatusCode +
            ": " +
            request.responseJSON.message +
            '</strong><br/>Failed to load this data. Please <a href="#" class="btn btn-xs btn-primary btn-rounded" onclick="window.location.reload(true)">refresh</a> this page to retry</div>'
        );
      }
    });
  }

  //get the org unit
  function getOrgUnit(uid, period) {
    var url =
      "https://hiskenya.org/api/organisationUnits/" +
      uid +
      ".json?fields=id,name";

    $.ajax({
      dataType: "json",
      url: url, //Relative or absolute path to response.php file
      success: function(data) {
        $("h5.card-title").html(data["name"] + " - " + period);
      }
    });
  }

  //get the report details
  function getReport(rows, period, orgunit) {
    var rowval = 0;

    //loop through the rows
    $.each(rows, function(rkey, rentry) {
      //check for orgunit and period
      if (
        orgunit == rentry[2] &&
        period == rentry[1] &&
        rentry[0] == "RRnz4uPHXdl.ACTUAL_REPORTS"
      ) {
        rowval = parseInt(rentry[3]);
      }
    });

    return rowval;
  }

  //get the # expected to report
  function getExpectedToReport(rows, prd, ounit) {
    var exp_count = 0;
    $.each(rows, function(indx, onerow) {
      if (
        ounit == onerow[2] &&
        prd == onerow[1] &&
        onerow[0] == "RRnz4uPHXdl.ACTUAL_REPORTS"
      ) {
        exp_count = exp_count + 1;
      }
    });

    return exp_count;
  }

  //get the # expected to report
  function getExpectedSub(rows, period, orgunit) {
    var rowval = 0;

    //loop through the rows
    $.each(rows, function(rkey, rentry) {
      //check for orgunit and period
      if (
        orgunit == rentry[2] &&
        period == rentry[1] &&
        rentry[0] == "RRnz4uPHXdl.EXPECTED_REPORTS"
      ) {
        rowval = parseInt(rentry[3]);
      }
    });

    return rowval;
  }

  function dateToStr(ledate) {
    var leyear = ledate.substr(0, 4);
    var lemonth = ledate.substr(4, 5);
    // console.log('leyear ni: '+leyear);
    // console.log('lemonth ni: '+lemonth);
    if (lemonth == "01") {
      var numonth = "Jan";
    }
    if (lemonth == "02") {
      var numonth = "Feb";
    }
    if (lemonth == "03") {
      var numonth = "Mar";
    }
    if (lemonth == "04") {
      var numonth = "Apr";
    }
    if (lemonth == "05") {
      var numonth = "May";
    }
    if (lemonth == "06") {
      var numonth = "Jun";
    }
    if (lemonth == "07") {
      var numonth = "Jul";
    }
    if (lemonth == "08") {
      var numonth = "Aug";
    }
    if (lemonth == "09") {
      var numonth = "Sept";
    }
    if (lemonth == "10") {
      var numonth = "Oct";
    }
    if (lemonth == "11") {
      var numonth = "Nov";
    }
    if (lemonth == "12") {
      var numonth = "Dec";
    }
    var lenudate = numonth + " " + leyear;
    return lenudate;
  }

  //expected to report
  //get the report details
  function checkExpected(rows, orgunit) {
    var rowval = 0;

    //loop through the rows
    $.each(rows, function(rkey, rentry) {
      // console.log(rentry);
      //check for orgunit and period
      if (rentry[0] == "RRnz4uPHXdl.EXPECTED_REPORTS" && rentry[2] == orgunit) {
        rowval = parseInt(rentry[3]);
        //break;
      }
    });

    return rowval;
  }

  // fetch mfl codes

  var mfl_codes_array = [];
  mfl_url =
    "https://hiskenya.org/api/organisationUnits.json?fields=id,code&paging=false";
  //  mfl_url = 'http://localhost/pmi/json/mflcode.json';
  getMFLarray(mfl_url);

  function getMFLarray(mfl_url) {
    $.getJSON(mfl_url, function(data) {
      mfl_codes_array = data.organisationUnits;
      // console.log('mfl_codes_array: '+mfl_codes_array);
    });
  }

  //---------- fetch mfl codes
  // filter by mfl codes
  function getMFLcode(dhis_id) {
    if (mfl_codes_array == null) {
      getMFLarray(mfl_url);
    }
    // var ous = data.organisationUnits;
    var ous = mfl_codes_array;
    var arr_filterd_by_dhis_code = $.grep(ous, function(v) {
      return v.id === dhis_id;
    });
    if(arr_filterd_by_dhis_code.length<1){
      mfl_id = 'Not Available';
      }else{
      mfl_id = arr_filterd_by_dhis_code[0].code;
    }
    return mfl_id;
  }
  // filter by mfl codes

  //sleep function
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
}
