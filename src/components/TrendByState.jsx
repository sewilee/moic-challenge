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
        
        return(
            <div id="horizontal-bar-container">
                <h2>The Search for Ice Cream:</h2>
                <p>Top 10 States</p>
                <HorizontalBar
                    // id = "horizontal-bar"
                    data = {{
                        labels: labels,
                        datasets: [{
                            label: "Search Popularity",
                            data: dataSets
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
                        // onResize:() => {
                        //     let canvas = document.getElementById("horizontal-bar");
                        //     let parent = document.getElementById("horizontal-bar-container");
                        //     canvas.width = parent.offsetWidth;
                        //     canvas.height = parent.offsetHeight;
                        // }
                    }}
                />
            </div>
        )
    }
}

export default TrendByState;