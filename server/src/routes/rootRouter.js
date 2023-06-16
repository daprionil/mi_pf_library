const express = require('express');

const rootRouter = express.Router();

rootRouter.get('/', (req,res) => {
    res.send('Está correcto');
});

module.exports = rootRouter;