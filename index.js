import colors from 'colors';

const [arg] = process.argv.splice(2);

console.log(`Hello ${colors.red(arg)}`);