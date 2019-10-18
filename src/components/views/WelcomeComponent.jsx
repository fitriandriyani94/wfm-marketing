import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import FooterComponent from './FooterComponent.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import ReactMinimalPieChart from 'react-minimal-pie-chart';

class WelcomeComponent extends Component {
    render() {

        const data = [
            {          									
                color: "steelblue", 
                points: [
                    {x: 1, y: 1}, 
                    {x: 2, y: 2}, 
                    {x: 3, y: 3},
                    {x: 4, y: 4}, 
                    {x: 5, y: 5}, 
                    {x: 6, y: 6},
                    {x: 7, y: 7} 
                ] 
            }
        ];

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
                    <p>
                        <Button variant="primary">Learn more</Button>
                    </p>
                </Jumbotron>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <ReactMinimalPieChart
                                data={[
                                    {
                                        title: 'Maximum Job',
                                        value: 10,
                                        color: '#3232A8'
                                    },
                                    {
                                        title: 'Minimum Job',
                                        value: 5,
                                        color: '#3298A8'
                                    }
                                ]}
                                animate
                                style={{height: '200px'}}
                                label
                                labelStyle={{
                                    fontSize: '7px',
                                    fontFamily: 'sans-serif',
                                    fill: '#121212'
                                }}
                                radius={42}
                                labelPosition={112}
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