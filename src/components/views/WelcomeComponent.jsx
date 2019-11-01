import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
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
                    categories: ["Dede", "Yang Mi", "Nurrahma", "Yunita", "Ayu", "Vena", "Nasya"]
                }
            },
            pieseries: [
                {
                    name: "series",
                    data: [45, 50, 49, 60, 70, 91, 50]
                }
            ],
            series: [],
            chartOptions: {
                labels: ['Follow Up', 'Promosi', 'Stand By']
            }
        }
        this.refreshJobCategoryCount = this.refreshJobCategoryCount.bind(this);
        this.refreshJobEmployeeCount = this.refreshJobEmployeeCount.bind(this);
    }

    componentDidMount() {
        this.refreshJobCategoryCount();
        this.refreshJobEmployeeCount(); 
    }

    refreshJobCategoryCount() {
        OptimizerService.getJobCategoryCount()
        .then(
            response => {
                this.setState({series:response.data})
            }
        )
    }

    refreshJobEmployeeCount() {
        OptimizerService.getJobEmployeeCount()
        .then(
            response => {
                this.setState({pieseries:response.data})
            }
        )
    }

    render() {
        return(
            <>
                <HeaderComponent/>
                <Jumbotron>
                    {<h1>Welcome {this.props.match.params.name}</h1>}
                    <p>
                        This is a workforce management application, You can manage your employees <Link to="/employees">here</Link>.
                    </p>
                    <p>
                        You can manage job for your employees <Link to="/jobs">here</Link>.
                    </p>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Chart options={this.state.chartOptions} series={this.state.series} type="pie" width="400" />
                        </div>
                        <div className="col-md-6">
                            <Chart
                                options={this.state.pieoptions}
                                series={this.state.pieseries}
                                type="line"
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