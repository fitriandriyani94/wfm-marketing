import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import Chart from "react-apexcharts";
import OptimizerService from '../services/OptimizerService.js';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pieoptions: {
                chart: {
                    id: "basic-line"
                },
                xaxis: {
                    categories: ["1 Nov", "2 Nov", "3 Nov", "4 Nov", "5 Nov", "6 Nov", "7 Nov", "8 Nov", "9 Nov", "10 Nov"]
                }
            },
            pieseries: [
                {
                    name: "FOLLOW UP",
                    data: [28, 29, 33, 36, 32, 32, 33, 29, 30, 32]
                  },
                  {
                    name: "PROMOTION",
                    data: [12, 11, 14, 18, 17, 13, 13, 15, 17, 16]
                  },
                  {
                    name: "STAND BY",
                    data: [20, 19, 22, 24, 20, 23, 25, 27, 25, 22]
                  }
            ],
            pieoptions1: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: ["Dede", "Yang Mi", "Nurrahma", "Yunita", "Ayu", "Vena", "Nasya"]
                }
            },
            pieseries1: [
                {
                    name: "FOLLOW UP",
                    data: [28, 29, 33, 36, 32, 32, 33]
                }
            ],
            series: [],
            chartOptions: {
                labels: ['Follow Up', 'Promosi', 'Stand By']
            }
        }
        this.refreshJobCategoryCount = this.refreshJobCategoryCount.bind(this);
        /*this.refreshJobEmployeeCount = this.refreshJobEmployeeCount.bind(this);*/
    }

    componentDidMount() {
        this.refreshJobCategoryCount();
        /*this.refreshJobEmployeeCount();*/ 
    }

    refreshJobCategoryCount() {
        OptimizerService.getJobCategoryCount()
        .then(
            response => {
                this.setState({series:response.data})
            }
        )
    }

    /*refreshJobEmployeeCount() {
        OptimizerService.getJobEmployeeCount()
        .then(
            response => {
                this.setState({pieseries:response.data})
            }
        )
    }*/

    render() {
        return(
            <>
                <HeaderComponent/>
                <Jumbotron>
                    {<h2>Selamat Datang {this.props.match.params.name}</h2>}
                    <p>
                        Anda dapat mengubah atau menambahkan karyawan <Link to="/employees">disini</Link>.
                    </p>
                    <p>
                        Anda dapat mengubah atau menambahkan pekerjaan untuk karyawan <Link to="/jobs">disini</Link>.
                    </p>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {/*<Chart options={this.state.chartOptions} series={this.state.series} type="pie" width="400" />*/}
                            <Chart
                                options={this.state.pieoptions}
                                series={this.state.pieseries}
                                type="line"
                                width="500"
                            />
                        </div>
                        <div className="col-md-6">
                            <Chart
                                options={this.state.pieoptions1}
                                series={this.state.pieseries1}
                                type="bar"
                                width="500"
                            />
                        </div>
                    </div>
                </div>                
                <hr/>
                <FooterComponent/>
            </>
        )
    }
}

export default WelcomeComponent