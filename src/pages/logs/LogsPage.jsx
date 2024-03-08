import react, { useState, useEffect } from "react"
import { MimicLogs } from "../../API/api-mimic";
import { useSelector } from 'react-redux';

const LogsPage = () => {


    const [logs, setLogs] = useState();
    const [loading, setLoading] = useState(true);
    const selectedField = useSelector((state) => state.selectedField);
    const startTs = useSelector((state) => state.startTs);
    const endTs = useSelector((state) => state.endTs);

    const FetchLogsData = async () => {
        setLoading(true);
        try {
            const response = await MimicLogs.fetchPreviousLogs({ startTs: startTs ? startTs : 0, endTs: endTs ? endTs : selectedField, limit: 20 });
            if (response != []) {
                setLogs(response);
            }
            setTimeout(() => { setLoading(false) }, 10);

        }
        catch (error) {
            setTimeout(() => { setLoading(false) }, 10);
            console.log(error)
        }
    }

    useEffect(() => {
        FetchLogsData();
    }, [selectedField])



    return (
        <>
            {loading ?

                <div className="flex justify-center items-center mt-24">
                    <div className="border-t-4 border-blue-900 rounded-full w-12 h-12 animate-spin"></div>
                </div>

                :

                <div className="container mx-auto p-8 m-4 border border-solid border-gray-300 rounded-lg text-gray-300 font-monospace  overflow-y-auto  h-screen-10%" style={{ backgroundColor: "rgba(14, 22, 35, 1)" }}>
                    {logs.length > 0 ? (
                        logs.map((log, index) => (
                            <div key={index} >
                                <span style={{ color: "rgba(94, 123, 170, 1)" }}>| Feb {log.timestamp} 18:58:35.167 [info] </span>
                                : <span style={{ color: "rgba(168, 195, 232, 1)" }}>{log.message}</span>
                                &nbsp;
                            </div>
                        ))
                    ) : (
                        <p>No logs found.</p>
                    )}
                </div >


            }

        </>
    )
}

export default LogsPage;



