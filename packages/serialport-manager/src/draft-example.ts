// tslint:disable

import * as Stream from 'stream'
const a = Stream.Readable

import * as serial_port  from 'serialport';
const SerialPort = serial_port.default



const main = async () => {


    const port = new SerialPort(`COM4`, { baudRate: 50})
    const port2 = new SerialPort(`COM5`,  { baudRate: 50})

    // Read the port data
    port.on("open", function () {
        console.log('open');
    });
    port2.on("open", function () {
        console.log('open');
    });

    
    // Switches the port into "flowing mode"
    port.on('data', function (data:any) {
        console.log('Data COM4:')
        data.map( (x:any) => console.log(x))
        //if (port.i)
        port.close()
    })

    // Switches the port into "flowing mode"
    port2.on('data', function (data:any) {
        console.log('Data COM5:')
        data.map( (x:any) => console.log(x))
        
        port2.close()
    })

    

    // Because there's no callback to write, write errors will be emitted on the port:
    port.write([1,2,3])
    console.log('Enviado COM4!')


    // Because there's no callback to write, write errors will be emitted on the port:
    port2.write([10,20,30])
    console.log('Enviado COM5!')
    
    


}

main()