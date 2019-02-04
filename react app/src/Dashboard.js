import React, { Component } from 'react';
// import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="titlelabel">Kenya - May 2018</h4>
          </div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">County Malaria Commodity Stock Status</h5>
                <div className="malaria_commodity_table t_three" style={{height: '450px', overflowY:'auto'}}>
                  <table className="table adjc_soh_mos" style={{position:'relative'}}>
                    <thead>
                      <tr>
                        <th scope="col">Items</th>
                        <th scope="col">adjusted AMC</th>
                        <th scope="col">Latest SOH</th>
                        <th scope="col">MOS</th> 
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>AL6</td><td>147586</td><td>1360145</td><td bgcolor="#85bfe0">9.2</td></tr>
                      <tr><td>AL12</td><td>390681</td><td>750127</td><td bgcolor="#ffeb9c">1.9</td></tr>
                      <tr><td>AL18</td><td>172258</td><td>352998</td><td bgcolor="#ffeb9c">2.0</td></tr>
                      <tr><td>AL24</td><td>90110</td><td>1447010</td><td bgcolor="#85bfe0">16.1</td></tr><tr><td>AL all</td><td>800635</td><td>3910279</td><td bgcolor="#7bd48d">4.9</td></tr>
                      <tr><td>AS inj</td><td>638803</td><td>363371</td><td bgcolor="#ffeb9c">0.6</td></tr>
                      <tr><td>SP tabs</td><td>251024</td><td>3923695</td><td bgcolor="#85bfe0">15.6</td></tr>
                      <tr><td>RDTs</td><td>4158</td><td>1401874</td><td bgcolor="#85bfe0">337.2</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Percentage of health facilities</h5>
                <div className="t_one_state col-md-12"></div>                              
                <div className="malaria_commodity_table t_one" style={{height: '450px', overflowY:'auto'}}>
                  <table className="table percent_healthfa" style={{position:'relative'}}>
                    <thead>
                      <tr>
                        <th scope="col">Items</th>
                        <th scope="col">Over Stocked</th>
                        <th scope="col">Stock OK</th>
                        <th scope="col">Under Stocked</th> 
                      </tr>
                    </thead>
                    <tbody>
                    <tr><td>AL6</td><td bgcolor="#85bfe0">12.0%</td><td bgcolor="#7bd48d">3.7%</td><td bgcolor="#ffeb9c">4.6%</td></tr><tr><td>AL12</td><td bgcolor="#85bfe0">6.3%</td><td bgcolor="#7bd48d">3.3%</td><td bgcolor="#ffeb9c">9.9%</td></tr><tr><td>AL18</td><td bgcolor="#85bfe0">6.0%</td><td bgcolor="#7bd48d">2.7%</td><td bgcolor="#ffeb9c">7.2%</td></tr><tr><td>AL24</td><td bgcolor="#85bfe0">15.6%</td><td bgcolor="#7bd48d">2.3%</td><td bgcolor="#ffeb9c">2.8%</td></tr><tr><td>AS inj</td><td bgcolor="#85bfe0">0.7%</td><td bgcolor="#7bd48d">0.6%</td><td bgcolor="#ffeb9c">8.1%</td></tr><tr><td>SP tabs</td><td bgcolor="#85bfe0">7.6%</td><td bgcolor="#7bd48d">1.0%</td><td bgcolor="#ffeb9c">1.2%</td></tr><tr><td>RDTs</td><td bgcolor="#85bfe0">0.1%</td><td bgcolor="#7bd48d">0.0%</td><td bgcolor="#ffeb9c">0.0%</td></tr></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">No of health facilities with:</h5>
                <div className="malaria_commodity_table t_two" style={{height: '450px', overflowY:'auto'}}>
                  <table className="table number_healthfa" style={{position:'relative'}}>
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">&gt;6 MOS</th>
                        <th scope="col">3-6 MOS</th>
                        <th scope="col">&lt; 3 MOS</th>
                        <th scope="col">O/S</th>
                        <th scope="col">No Mos</th>
                        <th scope="col">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>AL6</td><td bgcolor="#85bfe0">1392</td><td bgcolor="#7bd48d">424</td><td bgcolor="#ffeb9c">537</td><td bgcolor="#ff0000" style={{color:'#fff'}}>587</td><td>8647</td><td>11587</td></tr>
                      <tr><td>AL12</td><td bgcolor="#85bfe0">727</td><td bgcolor="#7bd48d">386</td><td bgcolor="#ffeb9c">1146</td><td bgcolor="#ff0000" style={{color:'#fff'}}>761</td><td>8567</td><td>11587</td></tr>
                      <tr><td>AL18</td><td bgcolor="#85bfe0">691</td><td bgcolor="#7bd48d">315</td><td bgcolor="#ffeb9c">837</td><td bgcolor="#ff0000" style={{color:'#fff'}}>1014</td><td>8730</td><td>11587</td></tr>
                      <tr><td>AL24</td><td bgcolor="#85bfe0">1811</td><td bgcolor="#7bd48d">261</td><td bgcolor="#ffeb9c">327</td><td bgcolor="#ff0000" style={{color:'#fff'}}>298</td><td>8890</td><td>11587</td></tr>
                      <tr><td>AS inj</td><td bgcolor="#85bfe0">81</td><td bgcolor="#7bd48d">65</td><td bgcolor="#ffeb9c">935</td><td bgcolor="#ff0000" style={{color:'#fff'}}>1582</td><td>8924</td><td>11587</td></tr>
                      <tr><td>SP tabs</td><td bgcolor="#85bfe0">882</td><td bgcolor="#7bd48d">121</td><td bgcolor="#ffeb9c">143</td><td bgcolor="#ff0000" style={{color:'#fff'}}>40</td><td>10401</td><td>11587</td></tr>
                      <tr><td>RDTs</td><td bgcolor="#85bfe0">14</td><td bgcolor="#7bd48d">2</td><td bgcolor="#ffeb9c">5</td><td bgcolor="#ff0000" style={{color:'#fff'}}>32</td><td>11534</td><td>11587</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
