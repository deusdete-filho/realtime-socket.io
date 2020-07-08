const Koa = require('koa')
const http = require('http')
const socket = require('socket.io')

const app = new Koa()
const server = http.createServer(app.callback())
const io = socket(server)

const SERVER_HOST = 'localhost'
const SERVER_PORT = 8080

io.on('connection', socket => {
    console.log('[IO] Connection => Servidor conectado')
    socket.on('chat.message', data => {
        console.log('[SOCKET] Chat.message => ', data)
        io.emit('chat.message', data)
    })
    socket.on('disconnect', () => {
        console.log('[SOCKET] Disconnect => Servidor desconectado')
    })
})

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen => Servidor on  http://${SERVER_HOST}:${SERVER_PORT}`)
})