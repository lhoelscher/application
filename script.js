const express = require('express');
const redis = require('redis');
const app = express();

const client = redis.createClient();
client.connect();
app.get('/order/:key', async (req, res) => {
    const {key} = req.params;
    const value = req.query;
    await client.lPush(key, JSON.stringify(value), function(error,resp){});
    return res.send('SUCCESS');
});

app.get('/:key', async (req,res) => {

    const {key} = req.params;
    const rawData = await client.lRange(key,0,-1);

    return res.send(rawData);

});

app.get('/', (req,res) => {

    return res.send('Hello World');

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {

    console.log(`Server listening on port ${PORT}`);

});