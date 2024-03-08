import React from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import arrow_up_right_from_square from "../../assets/arrow-up-right-from-square.png";

const Popupstory = ({ startTs, endTs, onClose }) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeTS = (type, value) => {
        dispatch({ type: type, payload: value });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white w-64 p-6 rounded-lg shadow-lg z-10">
                <div className="flex justify-between items-center">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    // onClick={() => navigate("/logs")}
                    >
                        <img src={arrow_up_right_from_square} alt="arrow_up_right_from_square" className="w-4 h-4 mr-2" />
                        <span>View Logs</span>
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
                        onClick={() => {
                            onClose();
                            changeTS("SET_STARTTS_VALUE", null);
                            changeTS("SET_ENDTS_VALUE", null);
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popupstory;
