import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';


export default function TensorLoading() {
    const [loading, setloading] = useState(true);
    const [currentData, setData] = useState('0');
    const [boxColor, setBoxColor] = useState({
        backgroundColor: "",
        color: ""
    })

    useEffect(
        function () {
            const x = [8, 3, 5, 5, 6, 5, 7, 8, 2, 3, 5, 2, 4, 3, 9];
            const y = [3, 5, 5, 6, 5, 7, 8, 2, 3, 5, 2, 4, 3, 9, 6];
            const preVal = [38];
            var res;

            const model : any = tf.sequential();
            model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
            model.compile({ loss: 'meanSquaredError', optimizer: tf.train.sgd(0.001) });

            const xs = tf.tensor2d(x, [15, 1]);
            const ys = tf.tensor2d(y, [15, 1]);

            model.fit(xs, ys, { epochs: 750 }).then(() => {
                tf.round(model.predict(tf.tensor2d(preVal, [1, 1])));
                res = tf.round(model.predict(tf.tensor2d(preVal, [1, 1])));
                res = res.toString();
                res = res.substring(14, 16);

                if (res <= 30) {
                    res = "내일 : 좋음";
                    setBoxColor({backgroundColor: "green", color: "white"})
                }
                else if (res >= 31 && res <= 80) {
                    res = "내일 : 보통";
                    setBoxColor({backgroundColor: "#ffe259", color: "black"})
                }
                else if (res >= 81 && res <= 150) {
                    res = "내일 : 나쁨";
                    setBoxColor({backgroundColor: "red", color: "white"})
                }
                else {
                    res = "내일 : 매우나쁨";
                    setBoxColor({backgroundColor: "#9B0000", color: "white"})
                }
                setData(res);
                setloading(false);
            });
        })

        
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