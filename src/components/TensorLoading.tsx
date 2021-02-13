import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TensorLoading() {
    const [loading, setloading] = useState(true);
    const [currentData, setData] = useState('0');
    const [boxColor, setBoxColor] = useState({
        backgroundColor: "",
        color: ""
    })

    async function GetData()  {
        try {

            const response = await axios.get('http://localhost:4000/app');
            console.log(response.data);

            if (response.data === "내일 : 좋음") {
                setBoxColor({backgroundColor: "green", color: "white"})
            }
            else if (response.data === "내일 : 보통") {
                setBoxColor({backgroundColor: "#ffe259", color: "black"})
            }
            else if (response.data === "내일 : 나쁨") {
                setBoxColor({backgroundColor: "red", color: "white"})
            }
            else {
                setBoxColor({backgroundColor: "#9B0000", color: "white"})
            }     

            setloading(false);
            setData(response.data);

        } catch (error) {
            setloading(true);
        }    
    }

    useEffect(() => {
        GetData();
    }, []);

        
    if (loading) {
        return (
            <div className="loading">
            </div>
        )
    }

    else {
        return (
        <div className="result" style={boxColor}>
            { currentData.toString() }
        </div>
        )
     }
     


}