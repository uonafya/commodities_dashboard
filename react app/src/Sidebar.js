import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
        <HashRouter basename="/">
        <div className="scroll-sidebar">
            <nav className="sidebar-nav">
                <ul id="sidebarnav" className="p-t-30">
                    <li className="sidebar-item"> 
                    <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/" aria-expanded="false"><i className="mdi mdi-view-dashboard"></i><span className="hide-menu">Dashboard</span></Link>
                    </li>
                    {/* <li className="sidebar-item"> 
                    <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Stock Status </span></a>
                    <ul aria-expanded="false" className="collapse  first-level">
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="acts.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">ACTs</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="as.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">AS</span></a></li>
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="sp.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">SP</span></a></li>	
                        <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="rdts.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">RDTs</span></a></li>
                    </ul>
                    </li> */}
                    {/* <li className="sidebar-item"> 
                        <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Reporting </span></a>
                        <ul aria-expanded="false" className="collapse  first-level">
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="reportrate.html" aria-expanded="false"><i className="mdi mdi-chart-bar"></i><span className="hide-menu">Reporting Rate</span></a></li>
                            <li className="sidebar-item"> 
                                <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Details </span></a>
                                <ul aria-expanded="false" className="collapse  first-level">
                                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="rrdetails-fac.html" aria-expanded="false"><i className="mdi mdi-chart-bar"></i><span className="hide-menu">Facility</span></a></li>
                                    <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="rrdetails-sub.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Sub-county</span></a></li>
                                </ul>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li className="sidebar-item"> 
                        <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Data Quality </span></a>
                        <ul aria-expanded="false" className="collapse  first-level">
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="dq-completeness.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Completeness</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="dq-concordance.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Concordance</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="dq-consistency.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Consistency</span></a></li>
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="dq-comparison.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu">Comparison</span></a></li> 
                        </ul>
                    </li> */}
                    <li className="sidebar-item"> 
                        <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">Supply Chain Performance </span></a>
                        <ul aria-expanded="false" className="collapse  first-level">
                            <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/scpsummary/" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu"> Summary</span></Link></li>
                            <li className="sidebar-item"> <Link className="sidebar-link waves-effect waves-dark sidebar-link" to="/scpsummary/" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu"> Detailed</span></Link></li>
                        </ul>
                    </li>
                    {/* <li className="sidebar-item"> 
                        <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i className="mdi mdi-receipt"></i><span className="hide-menu">National </span></a>
                        <ul aria-expanded="false" className="collapse  first-level">
                            <li className="sidebar-item"> <a className="sidebar-link waves-effect waves-dark sidebar-link" href="national.html" aria-expanded="false"><i className="mdi mdi-border-inside"></i><span className="hide-menu"> Summary</span></a></li>
                        </ul>
                    </li> */}
                </ul>
            </nav>
        </div>
        </HashRouter>
      );
    }
}


export default Sidebar;