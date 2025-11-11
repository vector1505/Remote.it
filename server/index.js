import http from "http"
import express from "express"
import {Server as SocketServer} from "socket.io"
import pty from "node-pty"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ptyProcess = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: __dirname,
    env: process.env
});



const app = express();

const server  = http.createServer(app)

const io = new SocketServer({
    cors: '*'
})

io.attach(server);

ptyProcess.onData(data => {
    io.emit('terminal:data',data)
})

io.on(`connection`, (socket)=>{
    console.log(`socket connected, id: ${socket.id}`);

    socket.on('terminal:write',(data)=>{
        ptyProcess.write(data);
    })
})

server.listen(9000,()=>{
    console.log(`Docker server running on port 9000`);
})


