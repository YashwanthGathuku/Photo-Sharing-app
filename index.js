const express = require('express');
const app = express();
const port = 1311;
app.listen(port, ()=>{

})
app.get('/', (request, response)=>{
    response.json({
        "Hosting": "Sphinxlike"
    })
})

console.log(`Listening on ${port}`);