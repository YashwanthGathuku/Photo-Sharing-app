const express = require('express');
const app = new express;
const port = 1311;
app.use(express.static('public'))

app.listen(port, ()=>{
    console.log(`serving photosharing app on http://localhost:${port}`);
})