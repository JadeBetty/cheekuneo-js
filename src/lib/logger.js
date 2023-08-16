import chalk from 'chalk';
//Code was all made by GoodBoyNeon from Cheeka Source code. All rights reserved to him.
const convertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');

    // eslint-disable-next-line prefer-const
    let [hours, minutes, seconds] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours}:${minutes}:${seconds}`;
};

const generateTimestamp = () => {
    const date = new Date();
    const rawTime = date.toLocaleTimeString();
    const currentDate = date.toLocaleDateString();
    const currentTime = convertTime12to24(rawTime);
    const currentTimestamp = `${currentDate} ${currentTime}`;
    return currentTimestamp;
};

const info = (message) => {
    const rawTimestamp = generateTimestamp();
    const coloredTimestamp = chalk.gray(`[${rawTimestamp}]`);
    const status = chalk.bgBlueBright.bold(' INFO ');
    const msg = chalk.blueBright(message);
    console.log(`\n${coloredTimestamp} ${status} ${msg}`);
};
const success = (message) => {
    const rawTimestamp = generateTimestamp();
    const coloredTimestamp = chalk.gray(`[${rawTimestamp}]`);
    const status = chalk.bgGreenBright.bold(' SUCCESS ');
    const msg = chalk.green(message);
    console.log(`\n${coloredTimestamp} ${status} ${msg}`);
};
const error = (message) => {
    const rawTimestamp = generateTimestamp();
    const coloredTimestamp = chalk.gray(`[${rawTimestamp}]`);
    const status = chalk.bgRedBright.bold(' ERROR ');
    const msg = chalk.red(message);
    console.log(`\n${coloredTimestamp} ${status} ${msg}`);
};

const warn = (message) => {
    const rawTimestamp = generateTimestamp();
    const coloredTimestamp = chalk.gray(`[${rawTimestamp}]`);
    const status = chalk.bgYellowBright.bold(' WARN ');
    const msg = chalk.yellow(message);
    console.log(`\n${coloredTimestamp} ${status} ${msg}`);
};
const logger = { info, success, error, warn }
export default logger;


//Code was all made by GoodBoyNeon from Cheeka Source code. All rights reserved to him.