import React, { useState } from 'react';
import logo from "../assets/TF_logo.svg"
import { useNavigate } from 'react-router-dom';
import Downarrow from "../assets/chevron.svg"
import metrics_icon from "../assets/metrics-gray.png"
import logs_icon from "../assets/list.png"
import active_metrics_icon from "../assets/metrics.png"
import active_logs_icon from "../assets/list-active.png"
import active_option from "../assets/active_option.png"
import underline from "../assets/underline.png"


function Navbar() {


    const path = window.location.pathname;
    const navigate = useNavigate()

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(5)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <div className="bg-white shadow-lg p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="TrueFoundry Logo" className="h-10 mr-2" />
                </div>

                <div className="flex-grow flex items-center text-gray-900 space-x-8 ml-6">
                    <button onClick={() => { navigate('/') }} className={`flex items-center text-${path === '/' ? "black" : "gray"}-600 text-lg font-medium`}>
                        <div>
                            <div className="flex">
                                <img src={path === '/' ? active_metrics_icon : metrics_icon} alt="Metrics Icon" className="h-5 mr-2 mt-1" />
                                <span>Metrics</span>
                            </div>
                            <div>
                                {path == '/' && <img src={underline} width={"100%"} />}
                            </div>
                        </div>
                    </button>
                    <button onClick={() => { navigate('/logs') }} className={`flex items-center text-${path === '/logs' ? "black" : "gray"}-600 text-lg font-medium`}>
                        <div>
                            <div className="flex items-center">
                                <img src={path === '/logs' ? active_logs_icon : logs_icon} alt="Logs Icon" className="h-5 mr-2" />
                                <span>Logs</span>
                            </div>
                            {
                                path == '/logs' &&
                                <div>
                                    <img src={underline} width={"100%"} />
                                </div>
                            }
                        </div>
                    </button>
                </div>

                <div className="relative">

                    <div style={{ display: "flex", alignItems: "right", borderRadius: "4px", border: "1px solid rgba(62, 86, 128, 1)", justifyContent: "space-between", padding: "0 5px" }}>
                        <button onClick={toggleDropdown} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(62, 86, 128, 1)", fontSize: "22px", display: "flex", alignItems: "center" }}>
                            {selectedField >= 60 ? `Last ${selectedField / 60} hour` : `Last ${selectedField % 60} minutes`}
                            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                    </div>


                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 text-bold">

                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer text-lg" value={5} onClick={(e) => { setSelectedField(e.target.value) }} > Last 5 minutes</li>
                                {selectedField == 5 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                            <hr />
                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer text-lg " value={15} onClick={(e) => { setSelectedField(e.target.value) }}>Last 15 minutes</li>
                                {selectedField == 15 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                            <hr />
                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer  text-lg " value={30} onClick={(e) => { setSelectedField(e.target.value) }}>Last 30 minutes</li>
                                {selectedField == 30 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                            <hr />
                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer  text-lg" value={60} onClick={(e) => { setSelectedField(e.target.value) }}>Last 1 hour   </li>
                                {selectedField == 60 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                            <hr />
                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer  text-lg " value={180} onClick={(e) => { setSelectedField(e.target.value) }}>Last 3 hour  </li>
                                {selectedField == 180 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                            <hr />
                            <div className='flex items-center text-gray-800 hover:bg-gray-100'>
                                <li className="block px-4 py-2 cursor-pointer  text-lg " value={300} onClick={(e) => { setSelectedField(e.target.value) }}>Last 6 hour  </li>
                                {selectedField == 300 && <img src={active_option} alt="active option" width={12} />}
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </div >
    );
}

export default Navbar;
