import React, { useState } from "react";
import Footer from "./Footer";

function DerivadaRaiz() {
  const [x, setX] = useState(0);

  // Función f(x)
  const f = (x) => Math.sqrt(3 * x * x + 5);

  // Derivada f'(x)
  const derivada = (x) => (3 * x) / Math.sqrt(3 * x * x + 5);

  return (
    <>
      <div className="container-fluid">
        <h2 className="text-center py-4">
          Derivada de una raíz - f(x) = √(3x² + 5)
        </h2>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <label>
            Ingresa el valor de x:
            <input
              type="number"
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
              step="0.1"
              style={{ marginLeft: 10 }}
            />
          </label>
          <p className="fw-bold">
            f({x}) = <strong>{f(x).toFixed(4)}</strong>
          </p>
          <p className="fw-bold">
            f'({x}) = <strong>{derivada(x).toFixed(4)}</strong>
          </p>
        </div>
      </div>
      <Footer size={700} />
    </>
  );
}

export default DerivadaRaiz;
