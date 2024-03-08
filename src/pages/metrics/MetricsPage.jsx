import React, { useState, useEffect } from "react";
import { MimicMetrics } from "../../API/api-mimic";
import Chart from "chart.js/auto";
import SelectDragPlugin from "@01coder/chartjs-plugin-selectdrag";
import 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';

Chart.register(SelectDragPlugin);

const MetricsPage = () => {

    const path = window.location.pathname;
    const [loading, setLoading] = useState(true);
    const [cpuUsage, setCpuUsage] = useState(null);
    const [memoryUsage, setMemoryUsage] = useState(null);
    const [networkUsage, setNetworkUsage] = useState(null);
    const [diskIops, setDiskIops] = useState(null);
    // const [startTs, setStartTs] = useState(null);
    // const [endTs, setEndTs] = useState(null);

    const dispatch = useDispatch();
    const selectedField = useSelector((state) => state.selectedField);
    const startTs = useSelector((state) => state.startTs);
    const endTs = useSelector((state) => state.endTs);

    const changeTS = (type, value) => {
        dispatch({ type: type, payload: value });
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await MimicMetrics.fetchMetrics({ startTs: 0, endTs: selectedField * 100 });
            if (response && response.length > 0) {
                setCpuUsage(response[0]);
                setMemoryUsage(response[1]);
                setNetworkUsage(response[2]);
                setDiskIops(response[3]);
            }
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        changeTS("SET_STARTTS_VALUE", null)
        changeTS("SET_ENDTS_VALUE", null)
    }, [selectedField]);

    useEffect(() => {
        const renderChart = (data, chartId) => {
            if (data) {
                const labels = [];
                const datasets = [];

                data.graphLines?.forEach((line, index) => {
                    const values = line.values.map(value => {
                        if (index == 0)
                            labels.push(value.timestamp);
                        return value.value;
                    });

                    datasets.push({
                        label: line.name,
                        data: values,
                        fill: false,
                        borderColor: index === 0 ? "rgba(5, 150, 105, 1)" : (index === 1 ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)")
                    });
                });

                const ctx = document.getElementById(chartId);
                if (ctx) {
                    new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: labels,
                            datasets: datasets
                        },
                        options: {
                            plugins: {
                                selectdrag: {
                                    enabled: true,
                                    onSelectComplete: (event) => {
                                        // setStartTs(null);
                                        // setEndTs(null);

                                        const values = event.range
                                        if (!startTs && !endTs) {
                                            changeTS("SET_STARTTS_VALUE", values[0])
                                            changeTS("SET_ENDTS_VALUE", values[1])
                                            // setStartTs(values[0]);
                                            // setEndTs(values[1]);
                                            // console.log(event.boundingBox);
                                        }

                                    }
                                }
                            }
                        }
                    });
                }
            }
        };

        // renderChart(cpuUsage, "cpuchart");
        // renderChart(memoryUsage, "memorychart");
        // renderChart(networkUsage, "networkchart");
        // renderChart(diskIops, "diskIopschart");

        const chartIDs = ["cpuchart", "memorychart", "networkchart", "diskIopschart"]
        const chartDatas = [cpuUsage, memoryUsage, networkUsage, diskIops]
        for (let i = 0; i < 4; i++) {
            renderChart(chartDatas[i], chartIDs[i]);
        }
    }, [cpuUsage, memoryUsage, networkUsage, diskIops]);


    // useEffect(() => {
    //     const renderChart = (data, chartId) => {
    //         if (data) {
    //             const labels = [];
    //             const datasets = [];

    //             data.graphLines?.forEach((line, index) => {
    //                 const values = line.values.map(value => {
    //                     if (index === 0)
    //                         labels.push(value.timestamp);
    //                     return value.value;
    //                 });

    //                 datasets.push({
    //                     label: line.name,
    //                     data: values,
    //                     fill: false,
    //                     borderColor: index === 0 ? "rgba(5, 150, 105, 1)" : (index === 1 ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)")
    //                 });
    //             });

    //             const ctx = document.getElementById(chartId);
    //             if (ctx) {
    //                 const chart = new Chart(ctx, {
    //                     type: "line",
    //                     data: {
    //                         labels: labels,
    //                         datasets: datasets
    //                     },
    //                     options: {
    //                         plugins: {
    //                             selectdrag: {
    //                                 enabled: true,
    //                                 onSelectComplete: (event) => {
    //                                     const values = event.range;
    //                                     if (!startTs && !endTs) {
    //                                         changeTS("SET_STARTTS_VALUE", values[0]);
    //                                         changeTS("SET_ENDTS_VALUE", values[1]);
    //                                         // Show a tooltip for the user to check logs
    //                                         chart.options.plugins.tooltip.enabled = true;
    //                                         chart.options.plugins.tooltip.custom = function (tooltip) {
    //                                             // Tooltip styling
    //                                             const tooltipEl = document.getElementById('chartjs-tooltip');
    //                                             if (!tooltipEl) {
    //                                                 const tooltipEl = document.createElement('div');
    //                                                 tooltipEl.id = 'chartjs-tooltip';
    //                                                 tooltipEl.classList.add('chartjs-tooltip');
    //                                                 tooltipEl.innerHTML = '<span>Check logs for this time range</span>';
    //                                                 document.body.appendChild(tooltipEl);
    //                                             }

    //                                             // Tooltip positioning
    //                                             const position = chart.ctx.canvas.getBoundingClientRect();
    //                                             tooltipEl.style.opacity = 1;
    //                                             tooltipEl.style.position = 'absolute';
    //                                             tooltipEl.style.left = position.left + window.pageXOffset + tooltip.caretX + 'px';
    //                                             tooltipEl.style.top = position.top + window.pageYOffset + tooltip.caretY + 'px';
    //                                         };
    //                                     }
    //                                 }
    //                             },
    //                             // tooltip: {
    //                             //     enabled: true // Initially hide tooltip
    //                             // }
    //                         }
    //                     }
    //                 });

    //                 // Store the chart instance so that we can access it later
    //                 chartInstances.push(chart);
    //             }
    //         }
    //     };

    //     // Call renderChart for each chart
    //     const chartIDs = ["cpuchart", "memorychart", "networkchart", "diskIopschart"];
    //     const chartDatas = [cpuUsage, memoryUsage, networkUsage, diskIops];
    //     const chartInstances = [];
    //     for (let i = 0; i < 4; i++) {
    //         renderChart(chartDatas[i], chartIDs[i]);
    //     }

    //     // Cleanup function to remove event listeners
    //     return () => {
    //         chartInstances.forEach(chart => {
    //             chart.destroy();
    //         });
    //     };
    // }, [cpuUsage, memoryUsage, networkUsage, diskIops]);


    // useEffect(() => {
    //     changeTS("SET_STARTTS_VALUE", null)
    //     changeTS("SET_ENDTS_VALUE", null)
    // }, [selectedField])

    // console.log(startTs, endTs, "Timesssssssssssssss")

    return (
        <>
            {loading ? (

                <div className="flex justify-center items-center mt-24">
                    <div className="border-t-4 border-blue-900 rounded-full w-12 h-12 animate-spin"></div>
                </div>


            ) : (
                <div className="container mx-auto p-4 m-4 border border-solid border-gray-300 rounded-lg ">
                    <h1 className="text-2xl font-bold mb-4 ml-2">Metrics</h1>
                    <hr />
                    <div className="flex flex-wrap mt-2">
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                CPU Usage
                                <canvas id="cpuchart" style={{ width: "100%", height: "300px", cursor: "crosshair" }}></canvas>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                Memory Usage
                                <canvas id="memorychart" style={{ width: "100%", height: "300px", cursor: "crosshair" }}></canvas>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                Network Usage
                                <canvas id="networkchart" style={{ width: "100%", height: "300px", cursor: "crosshair" }}></canvas>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                DiskIOPS Usage
                                <canvas id="diskIopschart" style={{ width: "100%", height: "300px", cursor: "crosshair" }}></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ >
    );
};

export default MetricsPage;
