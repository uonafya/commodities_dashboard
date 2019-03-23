function filterMain(countyid, subcountyid, periodid) {

        if (countyid == null) {
                countyid = 'tAbBVBbueqD';
        }

        if (subcountyid != null) {
                countyid = subcountyid;
        }

        if (periodid != null) {
                periodid = periodid;
        } else {
                periodid = '201805';
        }

        //load the mos by commodity
        var url = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr;Y4O2r9a9QRQ;DUnK0MqACvs;goYRWZ7kJAA;R4VD8EvRxyN&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';
        fetchMosbycombox(url);



        //% of health facilities
        var urlfa = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:zLR3PBVPgN5;bJILAolJsSJ;jtGNoWcdNcx;p2aNqT2HVyr;DUnK0MqACvs;goYRWZ7kJAA;R4VD8EvRxyN&dimension=ou:' + countyid + ';LEVEL-5&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //define the name holder
        var itemnames = ["AL6", "AL12", "AL18", "AL24", "AS inj", "SP tabs", "RDTs"];

        //parse the data for mos percentage
        fetchPercHealthFA(urlfa,itemnames);

        //parse adjusted consumption and physical count
        //parse the data for mos number
        fetchNumberHealthFA(urlfa,itemnames);


        //adjc FA
        var urlcon = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:Wg31yLDAehm;CK20eip3oTe;BiwM8SUgpJ1;KLoeF6isJCz;jwofVi31cHY;nvJsVaN8FOB;f5mBCkj0aSu;iMHDfVvYm0W&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //physical count/SOH    
        var urlphy = 'https://testhis.uonbi.ac.ke/api/29/analytics.json?dimension=dx:BnGDrFwyQp9.rPAsF4cpNxm;c0MB4RmVjxk.rPAsF4cpNxm;qnZmg5tNSMy.rPAsF4cpNxm;gVp1KSFI69G.rPAsF4cpNxm;MUxtqmB3VL6;iOARK31NdLp.rPAsF4cpNxm;imheYfA1Kiw.rPAsF4cpNxm;cPlWFYbBacW.rPAsF4cpNxm&dimension=ou:' + countyid + '&filter=pe:' + periodid + '&displayProperty=NAME&outputIdScheme=UID';

        //get the physical count into an array
        var sohval = [];

        var alnames = ["AL6", "AL12", "AL18", "AL24", "AL all", "AS inj", "SP tabs", "RDTs"];

        $.getJSON(urlphy, function (data) {
                var counter = 0;
                $.each(data.metaData.dimensions.dx, function (key, entry) {
                        //console.log(entry);              
                        var valsoh = getSOH(data.rows, entry);
                        sohval.push(valsoh);
                        //increment the counter
                        counter++;
                })
        });

        //delay for a few seconds 3 seconds
        sleep(3000);
        fetchAdjSOH(urlcon);


        //function to get SOH value from loop
        function getSOH(rows, entry) {
        var mysoh = 0;
        $.each(rows, function (rkey, rentry) {
                if (entry == rentry[0]) {
                        mysoh = rentry[2];
                }
        })
                return parseFloat(mysoh);
        }

//get the adjusted consumption value
//function to get value from loop
        function getConsumption(rows, entry) {
        var conval = 0;

        $.each(rows, function (rkey, rentry) {
                if (entry == rentry[0]) {
                        conval = rentry[2];
                }
        })

        return parseFloat(conval);
        }

//sleep function
        function sleep(milliseconds) {
                var start = new Date().getTime();
                for (var i = 0; i < 1e7; i++) {
                        if ((new Date().getTime() - start) > milliseconds) {
                                break;
                        }
                }
        }
}