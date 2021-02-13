const express = require('express');
const router = express.Router();  
const tf = require('@tensorflow/tfjs');

router.get( '/', async (request, response) => {
        try {
            const x = [8, 3, 5, 5, 6, 5, 7, 8, 2, 3, 5, 2, 4, 3, 9];
            const y = [3, 5, 5, 6, 5, 7, 8, 2, 3, 5, 2, 4, 3, 9, 6];
            const preVal = [38];
            var res;

            const model = tf.sequential();
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
                }
                else if (res >= 31 && res <= 80) {
                    res = "내일 : 보통";
                }
                else if (res >= 81 && res <= 150) {
                    res = "내일 : 나쁨";
                }
                else {
                    res = "내일 : 매우나쁨";
                }
                response.json(res);            
            });

        } catch (error) {
            console.log(error.msg);
            return response.status(500).json({msg: "Server Error..."});
        }
    }
);

module.exports = router;
