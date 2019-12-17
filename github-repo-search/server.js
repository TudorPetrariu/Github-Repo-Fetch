const express = require('express');
const app = express();




app.get('/repos/signin/callback', (req, res, next) => {
    const { query } = req
    const { code } = query
    if (!code) {
        return res.send({
            succes: false,
            message: "error"
        })

    }
    console.log('working here')
    console.log('SecretCode', code)
})

app.listen(9000)