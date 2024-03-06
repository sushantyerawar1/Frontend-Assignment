import react, { useState, useEffect } from "react"
import Navbar from "./navbar";
import { MimicMetrics } from "../API/api-mimic";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Metrics = () => {

    const [loading, setLoading] = useState(true);
    const [cpu_usage, setCpu_Usage] = useState([]);
    const [memory_usage, setMemory_Usage] = useState([]);
    const [network_usage, setNetwork_Usage] = useState([]);
    const [disk_iops, setDisk_Iops] = useState([]);


    const [cpuUsageData, setCpuUsageData] = useState({});

    // Converting unstructured data of Cpu Usage to structured format for ChartJS
    useEffect(() => {

        const labels = [];
        const datasets = [];
        const cpuunstructureddata = cpu_usage?.['graphLines']

        cpuunstructureddata?.map((data, inddata) => {
            const allvalue = [];
            if (inddata == 0) {
                const cpuunstructuredValues = data?.values;
                cpuunstructuredValues.map((value, indval) => {
                    labels.push(value["timestamp"]);
                    allvalue.push(value['value'])
                })
            } else {
                const cpuunstructuredValues = data?.values;
                cpuunstructuredValues.map((value, indval) => {
                    allvalue.push(value['value'])
                })
            }
            datasets.push({
                label: data?.name,
                data: allvalue,
                fill: false,
                borderColor: (data?.name == "Limits" ? "rgba(5, 150, 105, 1)" : (data?.name == "Requested" ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)"))
            })
        })

        setCpuUsageData({
            labels: labels,
            datasets: datasets
        })

    }, [cpu_usage])


    const [memoryUsageData, setMemoryUsageData] = useState({});

    // Converting unstructured data of Memory Usage to structured format for ChartJS
    useEffect(() => {

        const labels = [];
        const datasets = [];
        const memoryunstructureddata = memory_usage?.['graphLines']

        memoryunstructureddata?.map((data, inddata) => {
            const allvalue = [];
            if (inddata == 0) {
                const memoryunstructuredValues = data?.values;
                memoryunstructuredValues.map((value, indval) => {
                    labels.push(value["timestamp"]);
                    allvalue.push(value['value'])
                })
            } else {
                const memoryunstructuredValues = data?.values;
                memoryunstructuredValues.map((value, indval) => {
                    allvalue.push(value['value'])
                })
            }
            datasets.push({
                label: data?.name,
                data: allvalue,
                fill: false,
                borderColor: (data?.name == "Limits" ? "rgba(5, 150, 105, 1)" : (data?.name == "Requested" ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)"))
            })
        })

        setMemoryUsageData({
            labels: labels,
            datasets: datasets
        })

    }, [memory_usage])

    const [networkUsageData, setNetworkUsageData] = useState({});

    // Converting unstructured data of Network Usage to structured format for ChartJS
    useEffect(() => {

        const labels = [];
        const datasets = [];
        const networkunstructureddata = network_usage?.['graphLines']

        networkunstructureddata?.map((data, inddata) => {
            const allvalue = [];
            if (inddata == 0) {
                const networkunstructuredValues = data?.values;
                networkunstructuredValues.map((value, indval) => {
                    labels.push(value["timestamp"]);
                    allvalue.push(value['value'])
                })
            } else {
                const networkunstructuredValues = data?.values;
                networkunstructuredValues.map((value, indval) => {
                    allvalue.push(value['value'])
                })
            }
            datasets.push({
                label: data?.name,
                data: allvalue,
                fill: false,
                borderColor: (data?.name == "Limits" ? "rgba(5, 150, 105, 1)" : (data?.name == "Requested" ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)"))
            })
        })

        setNetworkUsageData({
            labels: labels,
            datasets: datasets
        })

    }, [network_usage])


    const [diskIopsData, setDiskIOPSData] = useState({});

    // Converting unstructured data of disk iops to structured format for ChartJS
    useEffect(() => {

        const labels = [];
        const datasets = [];
        const diskunstructureddata = disk_iops?.['graphLines']

        diskunstructureddata?.map((data, inddata) => {
            const allvalue = [];
            if (inddata == 0) {
                const diskunstructuredValues = data?.values;
                diskunstructuredValues.map((value, indval) => {
                    labels.push(value["timestamp"]);
                    allvalue.push(value['value'])
                })
            } else {
                const diskunstructuredValues = data?.values;
                diskunstructuredValues.map((value, indval) => {
                    allvalue.push(value['value'])
                })
            }
            datasets.push({
                label: data?.name,
                data: allvalue,
                fill: true,
                backgroundColor: (data?.name == "Read" ? "rgba(206, 224, 248, 0.3)" : "rgba(255, 99, 71, 0.4)"),
                borderColor: (data?.name == "Read" ? "rgba(37, 99, 235, 1)" : " rgba(220, 38, 38, 1)")
            })
        })

        setDiskIOPSData({
            labels: labels,
            datasets: datasets
        })

    }, [disk_iops])




    const FetchMetricsData = async () => {
        setLoading(true);
        try {
            const response = await MimicMetrics.fetchMetrics({ startTs: 20, endTs: 18000 });
            if (response != []) {
                setCpu_Usage(response[0]);
                setMemory_Usage(response[1]);
                setNetwork_Usage(response[2]);
                setDisk_Iops(response[3]);
            }
            setTimeout(() => { setLoading(false) }, 10);

        }
        catch (error) {
            setTimeout(() => { setLoading(false) }, 10);
            console.log(error)
        }
    }

    useEffect(() => {
        FetchMetricsData();
    }, [])



    return (
        <>
            <Navbar />


            {loading ?

                <div className="flex justify-center items-center mt-24">
                    <div className="border-t-4 border-blue-900 rounded-full w-12 h-12 animate-spin"></div>
                </div>

                :

                <div className="container mx-auto p-4 m-4 border border-solid border-gray-300 rounded-lg ">
                    <h1 className="text-2xl font-bold mb-4 ml-2">Metrics</h1>
                    <hr />
                    <div className="flex flex-wrap mt-2">

                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg " style={{ color: "rgba(62, 86, 128, 1)" }}>
                                {cpu_usage?.['name']}
                                <Line data={cpuUsageData} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                {memory_usage?.['name']}
                                <Line data={memoryUsageData} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                {network_usage?.['name']}
                                <Line data={networkUsageData} />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 mb-4">
                            <div className="bg-white-200 h-screen/2 flex-grow p-4 border border-solid border-gray-300 rounded-lg" style={{ color: "rgba(62, 86, 128, 1)" }}>
                                {disk_iops?.['name']}
                                <Line data={diskIopsData} />
                            </div>
                        </div>

                    </div>
                </div>


            }

        </>
    )
}

export default Metrics;


