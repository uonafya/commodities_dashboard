            //-------------------1--------------------------
            // Highcharts
            function pieOne(thename,compliant_facility_count,non_compliant_facility_count){
                Highcharts.chart('pc1', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: thename
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            colors: ['#7bd48d','#ffc7ce'],
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Percentage',
                        colorByPoint: true,
                        data: [{
                            name: 'Opening SOH = Closing SOH previous month',
                            y: compliant_facility_count
                        }, {
                            name: 'Opening SOH ≠ Closing SOH previous month',
                            y: non_compliant_facility_count
                        }]
                    }]
                });
            };
            //-------------------end 1--------------------------


            //-------------------2--------------------------
             
            function pieTwo(x,y){
                Highcharts.chart('pc2', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Artesunate inj'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            colors: ['#7bd48d','#ffc7ce'],
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'Opening SOH = Closing SOH previous month',
                            y: x
                        }, {
                            name: 'Opening SOH ≠ Closing SOH previous month',
                            y: y
                        }]
                    }]
                });
            };
            //-------------------end 2--------------------------


            //-------------------3--------------------------
            function pieThree(title,subtitle,disc,nodisc){
                Highcharts.chart('pc3', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: title
                    },
                    subtitle: {
                        text: subtitle
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            colors: ['#7bd48d','#ffc7ce'],
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        align: 'center'
                    },
                    series: [{
                        name: 'Consistency',
                        colorByPoint: true,
                        data: [{
                            name: 'No discrepancy',
                            y: nodisc,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Discrepancy',
                            y: disc
                        }]
                    }]
                });
            };
            //-------------------end 3--------------------------



            //-------------------4--------------------------
            // Build the chart
            function pieFour(x,y){
                Highcharts.chart('pc4', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Internal Data Consistency (Artesunate inj)'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            showInLegend: true
                        }
                    },
                    series: [{
                        name: 'Brands',
                        colorByPoint: true,
                        data: [{
                            name: 'No discrepancy',
                            y: 10.85
                        }, {
                            name: 'Discrepancy',
                            y: 4.67
                        }]
                    }]
                });
            };
            //-------------------end 4--------------------------




            //-------------------column--------------------------
            function columnOne(per_arr,pop_title,totadj_title,totdisp_title,pop_arr,totadj_arr,totdisp_arr){
                Highcharts.chart('dq-column', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Comparison of # patients vs. doses dispensed'
                    },
                    subtitle: {
                        text: null
                    },
                    xAxis: {
                        categories: per_arr,
                        title: {
                            text: 'Period'
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            // text: 'Population',
                            text: 'Number (#)',
                            align: 'middle'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        // valueSuffix: ' millions'
                        valueSuffix: ' '
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        borderWidth: 1,
                        // backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        // name: pop_title,
                        name: '# Patients',
                        data: pop_arr,
                        color: '#9bbb59'
                    }, {
                        // name: totdisp_title,
                        name: '# Doses dispensed',
                        data: totdisp_arr,
                        color: '#c0504d'
                    }, {
                        // name: totadj_title,
                        name: '# Adj. doses',
                        data: totadj_arr,
                        color: '#4f81bd'
                    }]
                });
            };
            //-------------------end column--------------------------

            function lineOne(wbdataset){
                var perd = wbdataset[0];
                var reported = wbdataset[1];
                var didNotReport = wbdataset[2];
                Highcharts.chart('wbdata', {

                    title: {
                        text: 'Reporting health facilities that had weight band data in DHIS'
                    },
            
                    subtitle: {
                        text: ''
                    },
            
                    yAxis: {
                        title: {
                            text: 'Facilities'
                        }
                    },
                    xAxis:{
                      title: {
                        text: 'period'
                      },
                      categories: perd
                    }
                    ,
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },
            
                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            }
                        }
                    },
            
                    series: [{
                        name: 'Yes',
                        data: reported
                    }, {
                        name: 'No',
                        data: didNotReport
                    }],
            
                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }
            
                });
            
            };
            // end Highcharts
        
