import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

class TrendByState extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allStateInfo: [],
        }

    }

    componentDidUpdate(prevProps){
        const { flavor } = this.props;

        if(prevProps.flavor !== flavor){
            const stateData = this.getStateDataByFlavor(flavor);
            this.setState({
                allStateInfo: stateData,
            });
        }
    }

    getStateDataByFlavor(flavor){
        const fileName = flavor.split(" ").join("");
        const stateTrend = require(`../assets/data/StateTrend/${fileName}.json`);
        const stateData = {}

        stateTrend.forEach(obj => {
            stateData[obj.Region] = obj[flavor];
        });

        const sortedStates = [];
        for(let state in stateData){
            sortedStates.push([state, stateData[state]]);
        }

        return sortedStates.sort((a, b) => {
            return b[1] - a[1]
        });
    }



    render(){
        let dataArr;
        let labels = [];
        let dataSets = [];

        if(this.state.allStateInfo.length !== 0){
            dataArr = this.state.allStateInfo.slice(0, 10);
            dataArr.forEach( obj => {
                labels.push(obj[0]);
                dataSets.push(obj[1]);
            });
        }

        const hoverColors = [
            'rgba(234, 28, 45)',
            'rgba(254, 218, 101)',
            'rgba(176, 223, 225)',
            'rgba(0, 131, 117)'
        ];

        const strawberry = 'rgba(244, 153, 185, 0.6)';
        const peach = 'rgba(245, 218, 244, 0.6)';
        const pom = 'rgba(141, 19, 54, 0.6)';
        
        return(
            <div id="horizontal-bar-container">
                <h2>Top 10 State Search</h2>
                <HorizontalBar
                    data = {{
                        labels: labels,
                        datasets: [{
                            data: dataSets,
                            backgroundColor: [
                                peach, strawberry, pom,
                                peach, strawberry, pom,
                                peach, strawberry, pom,
                                peach
                            ],
                            hoverBackgroundColor: hoverColors[Math.floor(Math.random() * hoverColors.length)]
                        }]
                    }}
                    options = {{
                        maintainAspectRatio: true,
                        responsive: true,
                        legend: {
                            display: false,
                        },
                        title:{
                            display: false,
                            text: `The Search for ${this.props.flavor} Ice Cream: Top 10 States`,
                        },
                        scales:{
                            xAxes:[{
                                display: false,
                                ticks:{
                                    min: 0,
                                }
                            }],
                            yAxes:[{
                                gridLines:{
                                    display: false,
                                }
                            }]
                        },
                        tooltips: {
                            enabled: false,
                        }
                    }}
                />
            </div>
        )
    }
}

export default TrendByState;