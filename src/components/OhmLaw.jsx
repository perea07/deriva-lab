import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Footer from "./Footer";

const OhmLaw = () => {
  const [resistance, setResistance] = useState(10); // valor inicial R
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // I(t) constante: 0.2t
  const I = (t) => 0.2 * t;
  const V = (t, R) => R * I(t); // V(t) = R * I(t)

  const generateData = (R) => {
    const time = [];
    const currentData = [];
    const voltageData = [];

    for (let t = 0; t <= 10; t++) {
      time.push(t);
      currentData.push(I(t));
      voltageData.push(V(t, R));
    }

    return { time, currentData, voltageData };
  };

  // Inicializar gráfico
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const { time, currentData, voltageData } = generateData(resistance);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Corriente I(t) = 0.2t (A)",
            data: currentData,
            borderColor: "green",
            fill: false,
          },
          {
            label: `Voltaje V(t) = ${resistance} × 0.2t (V)`,
            data: voltageData,
            borderColor: "orange",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Tiempo (s)" } },
          y: { title: { display: true, text: "Valor (A o V)" } },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, []);

  // Actualizar gráfico cuando cambia R
  useEffect(() => {
    if (chartInstance.current) {
      const { voltageData } = generateData(resistance);
      chartInstance.current.data.datasets[1].data = voltageData;
      chartInstance.current.data.datasets[1].label = `Voltaje V(t) = ${resistance} × 0.2t (V)`;
      chartInstance.current.update();
    }
  }, [resistance]);

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center py-3 fs-2">
          ⚡ Ley de Ohm dinámica: V(t) = I(t) × R
        </h2>

        <p className="text-center">
          En este experimento, puedes cambiar el valor de la resistencia{" "}
          <strong>R</strong> y ver cómo afecta el voltaje. La corriente se
          mantiene como \( I(t) = 0.2t \).
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3 py-3">
          <label>Resistencia (Ω): {resistance}</label>
          <br />
          <input
            type="range"
            min="1"
            max="20"
            step="1"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
          />
        </div>

        <canvas ref={chartRef} width="300" height="100"></canvas>
      </div>
      <Footer size={100}/>
    </>
  );
};

export default OhmLaw;
