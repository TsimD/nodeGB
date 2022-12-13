import fs from 'fs';
import readline from 'readline';

const readStream = fs.createReadStream('./access_tmp.log', 'utf-8')
const ip1 = '89.123.1.41';
const ip2 = '34.48.240.111';
const write1 = fs.createWriteStream(`${ip1}`);
const write2 = fs.createWriteStream(`${ip2}`);

const rl = readline.createInterface({input: readStream})

rl.on('line', (line) => {
    if (line.includes(ip1)) {
        write1.write(line + '\n');
    }
    if (line.includes(ip2)) {
        write2.write(line + '\n');
    }

})