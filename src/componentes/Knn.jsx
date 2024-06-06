import React, { useEffect } from 'react';
import { Chart, ScatterController, PointElement, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { trainingSet } from '../scripts/data.js';
import Styled from '../assets/css/knn.module.css';

// Registra los componentes necesarios
Chart.register(ScatterController, PointElement, LinearScale, Title, Tooltip, Legend, annotationPlugin);

const Knn = () => {
    useEffect(() => {
        const ctx = document.getElementById(`${Styled.chart}`).getContext('2d');
        const chart = new Chart(ctx, {
            type: 'scatter',
            data: chartData(),
            options: chartOptions(),
        });

        const plotButton = document.querySelector(`#plot`);
        const predictButton = document.querySelector(`#predict`);

        if (plotButton) {
            plotButton.addEventListener('click', () => {
                const newPoint = {
                    x: Number(document.querySelector(`#humidity`).value),
                    y: Number(document.querySelector(`#pressure`).value),
                };

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
            });
        }

        if (predictButton) {
            predictButton.addEventListener('click', () => {
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

                for (let k = 1; k <= 5; k++) {
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
            });
        }

        // Cleanup event listeners on unmount
        return () => {
            if (plotButton) {
                plotButton.removeEventListener('click', () => { });
            }
            if (predictButton) {
                predictButton.removeEventListener('click', () => { });
            }
        };
    }, []);

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
