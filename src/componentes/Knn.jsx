import React, { useEffect, useState, useRef } from 'react';
import { Chart, ScatterController, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { trainingSet } from '../scripts/data.js';
import Styled from '../assets/css/knn.module.css';

// Registra los componentes necesarios
Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip, Legend, annotationPlugin);

const Knn = () => {
    const [k, setK] = useState(5); // Valor inicial de k
    const chartRef = useRef(null); // Referencia para almacenar la instancia del gráfico

    useEffect(() => {
        const ctx = document.getElementById(`${Styled.chart}`).getContext('2d');

        if (chartRef.current) {
            chartRef.current.destroy(); // Destruye la instancia previa del gráfico
        }

        chartRef.current = new Chart(ctx, {
            type: 'scatter',
            data: chartData(),
            options: chartOptions(),
        });

        const plotButton = document.querySelector(`#plot`);
        const predictButton = document.querySelector(`#predict`);

        if (plotButton) {
            plotButton.addEventListener('click', handlePlot);
        }

        if (predictButton) {
            predictButton.addEventListener('click', handlePredict);
        }

        // Cleanup event listeners on unmount
        return () => {
            if (plotButton) {
                plotButton.removeEventListener('click', handlePlot);
            }
            if (predictButton) {
                predictButton.removeEventListener('click', handlePredict);
            }
            if (chartRef.current) {
                chartRef.current.destroy(); // Destruye la instancia del gráfico al desmontar el componente
            }
        };
    }, [k]); // Vuelve a ejecutar el efecto cuando cambia k

    const handlePlot = () => {
        const newPoint = {
            x: Number(document.querySelector(`#humidity`).value),
            y: Number(document.querySelector(`#pressure`).value),
        };

        const chart = chartRef.current;

        // Punto nuevo al dataset
        chart.data.datasets[1].data.push(newPoint);

        // Punto nuevo tamaño 5 y color verde
        chart.data.datasets[1].pointBackgroundColor.push('green');
        chart.data.datasets[1].pointRadius.push(5);

        const radius = 1.5; // Radio del círculo para los vecinos más cercanos
        chart.options.plugins.annotation.annotations = {
            circle: {
                type: 'ellipse',
                xMin: newPoint.x - radius,
                xMax: newPoint.x + radius,
                yMin: newPoint.y - radius,
                yMax: newPoint.y + radius,
                backgroundColor: 'transparent',
                borderColor: 'green',
                borderWidth: 2,
            },
        };

        chart.update();
    };

    const handlePredict = () => {
        const chart = chartRef.current;
        const newPointIndex = chart.data.datasets[1].data.length - 1;
        const newPoint = chart.data.datasets[1].data[newPointIndex];
        const x = newPoint.x;
        const y = newPoint.y;
        let distances = [];

        trainingSet().forEach((point) => {
            distances.push(Math.sqrt((point.humidity - x) ** 2 + (point.pressure - y) ** 2));
        });

        let redNeighbors = 0;
        let blueNeighbors = 0;
        let nearestNeighbors = [];

        for (let i = 0; i < k; i++) { // Usar el valor de k seleccionado
            let min = Math.min.apply(Math, distances);
            const index = distances.indexOf(min);
            trainingSet()[index].rain ? redNeighbors++ : blueNeighbors++;
            distances[index] = +Infinity;
            nearestNeighbors.push(index);
        }

        // Resaltar los vecinos más cercanos
        chart.data.datasets[0].pointRadius = trainingSet().map((_, index) =>
            nearestNeighbors.includes(index) ? 7 : 5
        );

        if (redNeighbors > blueNeighbors) {
            document.querySelector(`#output`).innerHTML = 'Probablemente llueva';
            chart.data.datasets[1].pointBackgroundColor[newPointIndex] = 'blue';
        } else {
            document.querySelector(`#output`).innerHTML = 'Probablemente no llueva';
            chart.data.datasets[1].pointBackgroundColor[newPointIndex] = 'red';
        }

        chart.update();
    };

    function chartData() {
        return {
            datasets: [
                {
                    label: 'Datos sobre probabilidad de Lluvia',
                    data: trainingSet().map((point) => {
                        return { x: point.humidity, y: point.pressure };
                    }),
                    pointBackgroundColor: trainingSet().map((point) => {
                        return point.rain ? 'blue' : 'red';
                    }),
                    pointRadius: 5,
                    showLine: false,
                    backgroundColor: 'black',
                },
                {
                    label: 'Datos nuevos',
                    data: [],
                    pointBackgroundColor: [],
                    pointRadius: [],
                }
            ],
        };
    }

    function chartOptions() {
        return {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { fontSize: 20 },
                },
                annotation: {
                    annotations: {},
                },
            },
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Humedad',
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 20,
                        },
                        max: 10,
                        min: 0,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Presión',
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        font: {
                            size: 20,
                        },
                        max: 10,
                        min: 0,
                    },
                },
            },
        };
    }

    return (
        <div className={Styled.knn}>
            <div className={Styled.chart}>
                <canvas id={Styled.chart} />
            </div>
            <div className={Styled.knnInputs}>
                <div className={Styled.formChart}>
                    <span>
                        Valor de humedad (x): <input type="text" id="humidity" />
                    </span>
                    <br />
                    <span>
                        Valor de presión (y): <input type="text" id="pressure" />
                    </span>
                    <br />
                    <span>
                        Número de vecinos (k): 
                        <select 
                            id="neighbors" 
                            value={k} 
                            onChange={(e) => setK(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={7}>7</option>
                            <option value={9}>9</option>
                            <option value={11}>11</option>
                            <option value={13}>13</option>
                            <option value={15}>15</option>
                        </select>
                    </span>
                    <br />
                    <span>
                        Ingresar valor <button id="plot">Ingresar</button>
                    </span>
                    <br />
                    <span>
                        Predecir salida <button id="predict">Predecir</button>
                    </span>
                    <br />
                    <span id="output" style={{ fontSize: '2rem' }}>Salida: </span>
                </div>
            </div>
        </div>
    );
};

export default Knn;
