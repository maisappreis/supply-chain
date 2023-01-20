import React, { Component } from "react";
import "./Chart.css";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

// Tentei muito, mas infelizmente não consegui puxar as dados e fazer todas as manipulações necessárias para renderizar os gráficos.
// Deixei este código aqui apenas para mostrar como eu gostaria que os gráficos ficassem no frontend.

const data = [
    { month: "2022-01", inputAmount: 40, outputAmount: 24 },
    { month: "2022-02", inputAmount: 30, outputAmount: 13 },
    { month: "2022-03", inputAmount: 20, outputAmount: 15 },
    { month: "2022-04", inputAmount: 27, outputAmount: 25 },
    { month: "2022-05", inputAmount: 48, outputAmount: 40 },
    { month: "2022-06", inputAmount: 23, outputAmount: 12 },
    { month: "2022-07", inputAmount: 34, outputAmount: 24 },
    { month: "2022-08", inputAmount: 25, outputAmount: 11 }
];

export default class ChartProduct2 extends Component {

    render() {
        return (
            <div className="chart">
                <div className="chart-1">
                    <h5 className="title">Smartphone Samsung Galaxy A32 128GB Azul</h5>
                    <BarChart
                        width={550}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inputAmount" fill="#82ca9d" name="Entradas" />
                        <Bar dataKey="outputAmount" fill="#8884d8" name="Saídas" />
                    </BarChart>
                </div>

                <div className="chart-2">
                    <h5 className="title">Notebook Avell A70 Mob Rtx3050 I7 11800h</h5>
                    <BarChart
                        width={550}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inputAmount" fill="#82ca9d" name="Entradas" />
                        <Bar dataKey="outputAmount" fill="#8884d8" name="Saídas" />
                    </BarChart>
                </div>
            </div>
        )
    }
}
