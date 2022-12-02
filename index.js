import colors from 'colors';

// const [arg] = process.argv.splice(2);
//
//  console.log(`Hello ${colors.red(arg)}`);

const arg = process.argv.splice(2);
const min = parseInt(arg[0]);
const max = parseInt(arg[1]);

const color = ['green', 'yellow', 'red']
let coll = 0;
const print = num => {
    console.log(colors[color[coll]](num))

    if (coll === color.length - 1) {
        coll = 0

    } else {
        coll++

    }
}

if (isNaN(min) || isNaN(max)) console.log('Не верные аргументы')
let fl =0
loop:
    for (let i = min; i <= max; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue loop;
        }
        fl =1;
        print(i)
    }
    if(fl===0) console.log("В диапазоне нет простых чисел")