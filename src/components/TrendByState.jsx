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
            <div>
                <HorizontalBar 
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
                            display: true,
                            text: `The Search for ${this.props.flavor} Ice Cream: Top 10 States`,
                        },
                        scales:{
                            xAxes:[{
                                ticks:{
                                    min: 0,
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default TrendByState;