import React from 'react';
import './ScoopFlavor.css';
import TrendChart from './TrendChart';
import NutritionChart from './NutritionChart';
import TrendByState from './TrendByState';

class ScoopFlavor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flavor: null,
            nutritionFacts: {},
        }

        this.setFlavor = this.setFlavor.bind(this);
    }

    componentDidMount(){
        const flavors = ["Vanilla", "Chocolate", "Cookies N Cream", "Mint Chocolate Chip", "Chocolate Chip Cookie Dough"];
        const randomFlavor = flavors[Math.floor(Math.random() * flavors.length)];
        const nutritions = this.getNutritionFacts(randomFlavor);

        this.setState({
            flavor: randomFlavor,
            nutritionFacts: nutritions
        });
    }

    setFlavor(flavor){
        if(this.state.flavor !== flavor){
            const nutritions = this.getNutritionFacts(flavor);

            this.setState({
                flavor: flavor,
                nutritionFacts: nutritions
            });
        }
    }

    getNutritionFacts(flavor){
        //typically AJAX call here to fetch data
        const nutritionFacts = require("../assets/data/nutritionalFacts.json");
        return nutritionFacts[flavor];
    }

    render(){
        const { flavor, nutritionFacts } = this.state;

        return(
            <main className="dashboard">
                <aside className="sidebar-scoops">
                    <h1>Top Flavors in USA</h1>
                    <article>
                        <div className="scoop" onClick={() => this.setFlavor("Vanilla")} >
                            <h2 className="flavor-labels">Vanilla</h2>
                            <img src={require('../assets/images/vanilla.png')} />
                        </div>
                        <div className="scoop" onClick={() => this.setFlavor("Chocolate")} >
                            <h2 className="flavor-labels">Chocolate</h2>
                            <img src={require('../assets/images/chocolate.png')} />
                        </div>
                        <div className="scoop" onClick={() => this.setFlavor("Cookies N Cream")} >
                            <h2 className="flavor-labels">Cookies N Cream</h2>
                            <img src={require('../assets/images/cookiencream.png')} />
                        </div>
                        <div className="scoop" onClick={() => this.setFlavor("Mint Chocolate Chip")} >
                            <h2 className="flavor-labels">Mint Chocolate Chip</h2>
                            <img src={require('../assets/images/mint.png')} />
                        </div>
                        <div className="scoop" onClick={() => this.setFlavor("Chocolate Chip Cookie Dough")} >
                            <h2 className="flavor-labels">Chocolate Chip Cookie Dough</h2>
                            <img src={require('../assets/images/cookiedough.png')} />
                        </div>
                        <div className="scoop">
                            <h2 className="flavor-labels"></h2>
                            <img src={require('../assets/images/cone.png')} />
                        </div>

                    </article>
                </aside>
                <section className="section-charts">
                    <div className="scoop-data">
                        <NutritionChart flavor={flavor} nutritionFacts={nutritionFacts}/>
                        <TrendByState flavor={flavor} />
                    </div>
                    <div className="scoop-trend">
                        <TrendChart flavor={flavor}/>
                    </div>
                </section>
            </main>
        )
    }
}

export default ScoopFlavor;