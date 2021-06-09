'use strict'

var app = require('express')(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    port = process.env.PORT || 3000,
    publicDir = `${__dirname}/public`;

http.listen(port, () => {
    console.log('Iniciando Express y Soclet.IO en localhost:%d', port)
})

app
    .get('/', (req, res) => {
        res.sendFile(`${publicDir}/client.html`)
    })
    .get('/streaming', (req, res) => {
        res.sendFile(`${publicDir}/server.html`)
    })

//Aqui escucho el evento que me esta enviando via socket
io.on('connection', (socket) => {
    //Me llega del servidor el evento 'streaming' mediante socket
    socket.on('streaming', (image) => {
        //Lo que me llego lo envio a los clientes
        io.emit('play-stream', image)
    })
})








