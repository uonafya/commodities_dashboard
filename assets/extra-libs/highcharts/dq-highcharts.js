            //-------------------1--------------------------
            // Highcharts
            function pieOne(url){
                Highcharts.chart('pc1', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'AL 24'
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
                            name: 'Opening SOH = Closing SOH previous month',
                            y: 4.18
                        }, {
                            name: 'Opening SOH ≠ Closing SOH previous month',
                            y: 7.05
                        }]
                    }]
                });
            };
            //-------------------end 1--------------------------


            //-------------------2--------------------------
             
            function pieTwo(url){
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
                            y: 61.41
                        }, {
                            name: 'Opening SOH ≠ Closing SOH previous month',
                            y: 7.05
                        }]
                    }]
                });
            };
            //-------------------end 2--------------------------


            //-------------------3--------------------------
            function pieThree(url){
                Highcharts.chart('pc3', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Internal Data Consistency (AL 24)'
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
                            y: 61.41,
                            sliced: true,
                            selected: true
                        }, {
                            name: 'Discrepancy',
                            y: 11.84
                        }]
                    }]
                });
            };
            //-------------------end 3--------------------------



            //-------------------4--------------------------
            // Build the chart
            function pieFour(url){
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
            function columnOne(url){
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
                        categories: ['201805', '201804', '201803'],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Population (millions)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '# Patients',
                        data: [107, 31, 635]
                    }, {
                        name: '# Doses',
                        data: [133, 156, 947]
                    }, {
                        name: '# Doses adj.',
                        data: [1216, 738, 40]
                    }]
                });
            };
            //-------------------end column--------------------------

            function lineOne(url){
                Highcharts.chart('wbdata', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Reporting health facilities that had patient'
                    },
                    subtitle: {
                        text: 'weight band data in DHIS'
                    },
                    xAxis: {
                        categories: ['2018 03', '2018 04', '2018 05']
                    },
                    yAxis: {
                        title: {
                        text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'Yes',
                        data: [60, 65, 65]
                    }, {
                        name: 'No',
                        data: [60, 52, 54]
                    }]
                });
            };
            // end Highcharts
        
