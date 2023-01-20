import React, { Component } from "react";
import Main from "./template/Main";
import "./Home.css";
import ChartProduct1 from "./chart/ChartProduct1";
import ChartProduct2 from "./chart/ChartProduct2";


export default class Home extends Component {

    render() {

        return (
            <Main icon="home" title="Início" subtitle="Visualização gráfica do fluxo de mercadorias" className="grid">
                <ChartProduct1 className="chart mt-3" />
                <ChartProduct2 className="chart mt-3"  /> 
            </Main>
        )
    }
}

