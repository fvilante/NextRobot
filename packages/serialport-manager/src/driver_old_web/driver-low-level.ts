import * as Stream from 'stream'
const a = Stream.Readable

import * as serial_port  from 'serialport';
const SerialPort = serial_port.default

// tslint:disable: no-expression-statement no-if-statement


const port = new SerialPort(`COM3`, { 
  autoOpen: true, // ????
  dataBits: 8,
  parity: 'none',
  rtscts: false,
  xon: false,
  xoff: false,
  baudRate: 2400,
})

const example = async () => {

  
  const ESC = 27
  const STX = 2 
  const Direcao = 0
  const Canal = 2
  const DadoH = 0x00 
  const DadoL = 0x00
  const ETX = 3
  const CHECKSUM = 0x50


    // Read the port data
    port.on("open", function ():any {
        console.log('open');
        console.log('enviando')
        port.write([
          //ESC, STX, Direcao+Canal, DadoH, DadoL, ESC, ETX, CHECKSUM
          //0x1B, 0x02, 0xC1, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x87,
          0x1B, 0x02, 0xC2, 0x50, 0x61, 0x02, 0x1B, 0x03, 0x86,
          ])
        console.log('Enviado COM3!')
    
    });


    // Open errors will be emitted as an error event
   port.on('error', function(err:any):any {
    console.log('Error: ', err.message)
  })
    
    // Switches the port into "flowing mode"
    port.on('data', function (data:any):any {
        console.log(`Data COM3: ${data}`)  
    })

    // Read data that is available but keep the stream from entering //"flowing mode"
//port.on('readable', function ():any {
  //console.log('Data:', port.read());
//});
  
    // Open errors will be emitted as an error event
port.on('close', function(err:any):any {
    console.log('closed port: ', err.message)
  })

    // Because there's no callback to write, write errors will be emitted on the port:

    setTimeout( () => port.close(), 3000)


}

example()

// ===============================================================================
//      serial port server
// ===============================================================================

function showPortOpen():any {
  console.log('port open. Data rate: ' + port.baudRate);
}


function showPortClose():any {
  console.log('port closed.');
}

function showError(error:any):any {
  console.log('Serial port error: ' + error);
}

port.on('open', showPortOpen);
port.on('data', readSerialData);
port.on('close', showPortClose);
port.on('error', showError);

// ===============================================================================
//      web server
// ===============================================================================

const WebSocketServer = require('ws').Server;

// tslint:disable: no-expression-statement no-let no-if-statement

const SERVER_PORT = 8081;               // port number for the webSocket server
const wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
let connections = new Array;          // list of connections to the server

wss.on('connection', handleConnection);
 
function handleConnection(client:any):any {
    console.log("New Connection"); // you have a new client

    connections.push(client); // add this client to the connections array

    client.on('message', sendToSerial); // when a client sends a message,

    client.on('close', function():any { // when a client closes its connection
    console.log("connection closed"); // print it out
    const position = connections.indexOf(client); // get the client's position in the array
    connections.splice(position, 1); // and delete it from the array
 });
}


function sendToSerial(data:any):any {
    console.log("sending to serial: " + data);
    //myPort.write(data);
   }

// This function broadcasts messages to all webSocket clients
function broadcast(data:any):any {
    connections.map( x => x.send(data))
   }

export function readSerialData(data:any):any {
    console.log(data);
    // if there are webSocket connections, send the serial data
    // to all of them:
   
    if (connections.length > 0) {
      broadcast(data);
    }
 }