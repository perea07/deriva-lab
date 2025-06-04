import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Footer from "./Footer";

const CarMaintenance = () => {
  const [oilCost, setOilCost] = useState(10);
  const [checklistCost, setChecklistCost] = useState(5);
  const [brakesCost, setBrakesCost] = useState(8);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const oilFunc = (t) => oilCost * t;
  const checklistFunc = (t) => checklistCost * t;
  const brakesFunc = (t) => brakesCost * t;

  const totalFunc = (t) => oilFunc(t) + checklistFunc(t) + brakesFunc(t);
  const totalDeriv = () => oilCost + checklistCost + brakesCost;

  const generateData = () => {
    const time = [];
    const oilData = [];
    const checklistData = [];
    const brakesData = [];
    const totalData = [];
    const derivData = [];

    const slope = totalDeriv();

    for (let t = 0; t <= 10; t++) {
      time.push(t);
      oilData.push(oilFunc(t));
      checklistData.push(checklistFunc(t));
      brakesData.push(brakesFunc(t));
      totalData.push(totalFunc(t));
      derivData.push(slope);
    }

    return { time, oilData, checklistData, brakesData, totalData, derivData };
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const { time, oilData, checklistData, brakesData, totalData, derivData } =
      generateData();

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Cambio de aceite",
            data: oilData,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "Checklist",
            data: checklistData,
            borderColor: "green",
            fill: false,
          },
          {
            label: "Frenos",
            data: brakesData,
            borderColor: "orange",
            fill: false,
          },
          {
            label: "Costo total",
            data: totalData,
            borderColor: "black",
            fill: false,
            borderWidth: 2,
          },
          {
            label: "Derivada total (costo marginal)",
            data: derivData,
            borderColor: "red",
            borderDash: [5, 5],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { title: { display: true, text: "Tiempo" } },
          y: { title: { display: true, text: "Costo ($)" } },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      const { oilData, checklistData, brakesData, totalData, derivData } =
        generateData();
      chartInstance.current.data.datasets[0].data = oilData;
      chartInstance.current.data.datasets[1].data = checklistData;
      chartInstance.current.data.datasets[2].data = brakesData;
      chartInstance.current.data.datasets[3].data = totalData;
      chartInstance.current.data.datasets[4].data = derivData;
      chartInstance.current.update();
    }
  }, [oilCost, checklistCost, brakesCost]);

  return (
    <>
      <div className="container-fluid text-center">
        <h2 className="py-3">
          🔧 Derivada de una Suma - Mantenimiento de un Carro
        </h2>
        <p>
          Ingresa los costos estimados para cada componente del mantenimiento:
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <div>
            <label>Cambio de aceite ($):</label>
            <br />
            <input
              type="number"
              min="0"
              value={oilCost}
              onChange={(e) => setOilCost(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Checklist ($):</label>
            <br />
            <input
              type="number"
              min="0"
              value={checklistCost}
              onChange={(e) => setChecklistCost(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Mantenimiento de frenos ($):</label>
            <br />
            <input
              type="number"
              min="0"
              value={brakesCost}
              onChange={(e) => setBrakesCost(Number(e.target.value))}
            />
          </div>
        </div>

        <p>
          <strong>f(t) = g(t) + h(t) + i(t)</strong> → Su derivada muestra
          cuánto aumenta el costo total con el tiempo.
        </p>

        <canvas ref={chartRef} width="200" height="50"></canvas>
      </div>

      <Footer size={200} />
    </>
  );
};

export default CarMaintenance;
