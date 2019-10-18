import React from 'react';
import { Doughnut } from 'react-chartjs-2';

class NutritionChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nutritionData:{
                labels: ["Total Fat", "Fiber", "Sugar", "Protein"],
                datasets:[],
            }
        }

    }

    componentDidUpdate(prevProps){
        const { flavor, nutritionFacts } = this.props;
        const { labels } = this.state.nutritionData;

        if(prevProps.flavor !== flavor){
            this.setState({
                nutritionData: {
                    labels: labels,
                    datasets: [{
                        label: 'Nutritional Facts',
                        data: this.getNutritionalData(nutritionFacts),
                        backgroundColor: [
                            'rgba(234, 28, 45)',
                            'rgba(254, 218, 101)',
                            'rgba(176, 223, 225)',
                            'rgba(0, 131, 117)'
                        ]
                    }]
                }
            });

            
        }
    }

    getNutritionalData(facts){
        const { labels } = this.state.nutritionData;
        const data = labels.map(label => { return facts[label] })
        return data;
    }

    render(){
        console.log(this.state.nutritionData);
        return(
            <div className="scoop-data-charts">
                <h2>Nutritional Facts</h2>
                <Doughnut
                    data={this.state.nutritionData}
                    options={{
                        maintainAspectRatio: false,
                        // responsive: true,
                        legend:{
                            position: "bottom",
                            labels: {
                                fontSize: 13,
                            }
                        },
                        title:{
                            display: false,
                            text: `${this.props.flavor} Ice Cream Nutritional Facts`
                        },
                        tooltips:{
                            bodyFontSize: 13,
                            position: "nearest",
                        }
                        // scales:{
                        //     yAxes:[{
                        //         ticks:{
                        //             max: 35
                        //         }
                        //     }]
                        // }
    
                    }}
                />
            </div>
        )
    }


}

export default NutritionChart;