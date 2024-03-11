import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import arrow_up_right_from_square from "../../assets/arrow-up-right-from-square.png";

const Popupstory = ({ startTs, endTs, onClose, xIndex, yIndex }) => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const popupRef = useRef(null);


    const changeTS = (type, value) => {
        dispatch({ type: type, payload: value });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
                changeTS("SET_STARTTS_VALUE", null);
                changeTS("SET_ENDTS_VALUE", null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose, changeTS]);

    const styles = {
        position: "absolute",
        left: `${xIndex > 1400 ? 1260 : xIndex}px`,
        top: `${yIndex}px`,
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-gray-800 opacity-10"></div>
            <div ref={popupRef} className="bg-white p-2 rounded-lg shadow-lg z-10" style={styles}>
                <div className="flex flex-col">
                    <button
                        className="bg-black text-white px-2 py-2 rounded-lg flex items-center hover:bg-gray-800 focus:outline-none focus:ring focus:ring-white"
                    // onClick={() => navigate("/logs")}
                    >
                        <img src={arrow_up_right_from_square} alt="arrow_up_right_from_square" className="w-4 h-4 mr-2" />
                        <span>View Logs</span>
                    </button>
                    <div className="flex-grow"></div>
                </div>
            </div>
        </div>
    );
};
export default Popupstory;
