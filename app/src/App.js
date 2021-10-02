import React, {useEffect} from 'react';
import './App.css';

const canvasId = "cv";
const data = (() => {
    const cnt = 10000;
    const d = new Array(cnt);
    for (let i = 0; i < cnt; i++) {
        d[i] = Math.sin(i);
    }
    return d;
})();

function App() {
    useEffect(() => {
        (async () => {
            const wasmDraw = (await import("wasm")).draw_wasm_line_chart;
            wasmDraw(canvasId, data);
        })();
    });

    return (
        <div className="App">
            <canvas id={canvasId} width="600" height="400" />
        </div>
    );
}

export default App;
