import React, { useState, useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import Footer from "./Footer";

const NewtonLaw = () => {
  const [mass, setMass] = useState(5);
  const [type, setType] = useState("linear");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const accelerationFunctions = {
    linear: (t) => 2 * t,
    quadratic: (t) => t * t,
    sine: (t) => Math.sin(t),
  };

  const generateData = (mass, type) => {
    const aFunc = accelerationFunctions[type];
    const time = [];
    const accelerationData = [];
    const forceData = [];

    for (let t = 0; t <= 10; t++) {
      const a = aFunc(t);
      time.push(t);
      accelerationData.push(a);
      forceData.push(mass * a);
    }

    return { time, accelerationData, forceData };
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const { time, accelerationData, forceData } = generateData(mass, type);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Aceleración (m/s²)",
            data: accelerationData,
            borderColor: "blue",
            fill: false,
          },
          {
            label: `Fuerza (N) = ${mass} × a(t)`,
            data: forceData,
            borderColor: "red",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Tiempo (s)" } },
          y: { title: { display: true, text: "Valor" } },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      const { forceData, accelerationData } = generateData(mass, type);
      chartInstance.current.data.datasets[0].data = accelerationData;
      chartInstance.current.data.datasets[1].data = forceData;
      chartInstance.current.data.datasets[1].label = `Fuerza (N) = ${mass} × a(t)`;
      chartInstance.current.update();
    }
  }, [mass, type]);

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center py-3 fs-2">
          ⚙️ Segunda Ley de Newton: F = m × a(t)
        </h2>

        <p className="text-center">
          Esta simulación muestra cómo la fuerza cambia en función de una
          aceleración variable, multiplicada por una masa constante. Esto
          ilustra la derivada de una función por una constante.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3 py-2">
          <label>Masa (kg): {mass}</label>
          <br />
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
          />
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 py-4">
          <label>Función de aceleración:</label>
          <br />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="linear">a(t) = 2t</option>
            <option value="quadratic">a(t) = t²</option>
            <option value="sine">a(t) = sin(t)</option>
          </select>
        </div>

        <canvas ref={chartRef} width="200" height="50"></canvas>
      </div>
      <Footer size={200} />
    </>
  );
};

export default NewtonLaw;
