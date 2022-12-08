import dgram from 'node:dgram';

const socket = dgram.createSocket('udp4')


socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
})

socket.connect(41234, 'localhost', () => {

  const message = Buffer.from('Some bytes');
  socket.send(message);

  socket.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  })
})




