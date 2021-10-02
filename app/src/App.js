import React, {useEffect} from 'react';
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";

import './App.css';

const canvasId = "cv";
const data = (() => {
    const cnt = 5000;
    const d = new Array(cnt);
    for (let i = 0; i < cnt; i++) {
        d[i] = Math.sin(i);
    }
    return d;
})();

const amId = "am";
const amData = data.map((value, i) => {
    return {
        i,
        value
    };
});
const getAmchart = (chartId) => {
    const chart = am4core.create(chartId, am4charts.XYChart);
    chart.zoomOutButton.disabled = true;
    const xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.minGridDistance = 60;
    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueX = "i";
    series.dataFields.valueY = "value";
    // disable initial effect for performance
    series.showOnInit = false;
    // set opacity to 1 for performance
    series.fillOpacity = 1;
    series.strokeOpacity = 1;
    return {chart, xAxis, yAxis, series};
};

function App() {
    useEffect(() => {
        (async () => {
            const wasmDraw = (await import("wasm")).draw_wasm_line_chart;
            wasmDraw(canvasId, data);
        })();

        const {chart} = getAmchart(amId);
        chart.data = amData;
    });

    return (
        <div className="App">
            <canvas id={canvasId} width="600" height="400" />
            <div id={amId} style={{"height": "100%"}}>
                &nbsp;
            </div>
        </div>
    );
}

export default App;
