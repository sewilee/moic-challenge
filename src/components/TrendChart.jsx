import React from 'react';
import { Line } from 'react-chartjs-2';

class TrendChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chartData: {},
            monthlyData: {},
        }
    }

    componentDidMount(){
        //AJAX call here to fetch data
        const searchTrend = require('../assets/data/byTrend-2018.json')
        const flavors = Object.keys(searchTrend[0]).slice(1);
        const dataSet = this.getMonthlyData(searchTrend, flavors);

        this.setState({
            chartData: this.getChartState(flavors, dataSet),
            monthlyData: dataSet,
            flavors: flavors,
        });
    }

    componentDidUpdate(prevProps){
        // typically new data will be fetched or appended in case there has been a change
        // but in this case, data is not being changed just a new flavor is clicked
        if(prevProps.flavor !== this.props.flavor){
            const { flavors, monthlyData } = this.state;
            this.setState({
                chartData: this.getChartState(flavors, monthlyData)
            })
        }
    }

    getMonthlyData(trendArr, flavors){
        const icecreamData = {
            months:{
                JAN: {},
                FEB: {},
                MAR: {},
                APR: {},
                MAY: {},
                JUNE: {},
                JULY: {},
                AUG: {},
                SEPT: {},
                OCT: {},
                NOV: {},
                DEC: {}
            },
            iceCream:{}
        };

        let prevMonth;

        for(let i = 0; i < trendArr.length; i++){
            const obj = trendArr[i];
            const month = obj.Week.split("-")[1];

            flavors.forEach(flavor => {
                if(i === 0){
                    icecreamData.months[month][flavor] = [obj[flavor]];
                    icecreamData.iceCream[flavor] = [];
                }
                else if(prevMonth !== month & i !== 0){
                    icecreamData.months[month][flavor] = [obj[flavor]]

                    const prevMonthArr = icecreamData.months[prevMonth][flavor];
                    const prevMonthAVG = prevMonthArr.reduce((a, b) => a + b, 0) / prevMonthArr.length;

                    icecreamData.iceCream[flavor].push(prevMonthAVG)
                } 
                else if(i === trendArr.length - 1){
                    icecreamData.months[month][flavor].push(obj[flavor]);

                    const monthArr = icecreamData.months[month][flavor];
                    const monthAVG = monthArr.reduce((a, b) => a + b, 0) / monthArr.length;

                    icecreamData.iceCream[flavor].push(Math.floor(monthAVG));
                }
                else {
                    icecreamData.months[month][flavor].push(obj[flavor]);
                }
            });

            prevMonth = month;
        }
    
        return icecreamData;
    }

    getChartState(flavors, dataSet){
        const months = Object.keys(dataSet.months);

        const strawberry = 'rgba(244, 153, 185)';
        const peach = 'rgba(245, 218, 244)';
        const pom = 'rgba(141, 19, 54, .3)';
        const cherry = 'rgba(234, 28, 45)';
        const banana = 'rgba(254, 218, 101)';
        const blueberry = 'rgba(176, 233, 225)';
        const watermelon = 'rgba(0, 131, 117)';

        const iceCreamTrend = flavors.map(flav => {
            let color;
            let fill = false;
            let backgroundColor = 'rgba(0, 0, 0, 0)';
            let borderDash = [10, 10];

            if (flav === "Vanilla") { color = strawberry}
            if (flav === "Chocolate") { color = cherry}
            if (flav === "Cookies N Cream") { color = banana}
            if (flav === "Mint Chocolate Chip") { color = blueberry}
            if (flav === "Chocolate Chip Cookie Dough") { color = watermelon}

            if (this.props.flavor === flav){ 
                backgroundColor = pom
                fill = true;
                borderDash = []
            }

            return ({
                label: flav,
                data: dataSet.iceCream[flav],
                borderColor: color,
                backgroundColor: backgroundColor,
                pointBackgroundColor: color,
                borderWidth: 2,
                fill: fill,
                borderDash: borderDash,
            })
        });

        return {
            labels: months,
            datasets: iceCreamTrend.reverse(),
        }
    }


    render(){
        return(
            <Line
                data = {this.state.chartData}
                options = {{
                    maintainAspectRatio: false,
                    title: {
                        display: false,
                        text: 'Trends of Favorite Ice Cream'
                    },
                    legend: {
                        position: "right",
                    },
                    tooltips:{
                        mode: 'label',
                        position: 'nearest',
                        bodySpacing: 3,
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Popularity Peaks"
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Months"
                            }
                        }]
                    }
                }}
            />
        )
    }
}

export default TrendChart; 