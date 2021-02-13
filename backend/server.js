const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const TensorUrls = require('./routes/routes');


app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use('/app', TensorUrls);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log("server is running"));