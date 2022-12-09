import EventEmitter from "events" ;

const [hour, day, month, year] = process.argv[2].split('-')
const deadline = new Date(Date.UTC(year, month - 1, day, hour))
const emmiter = new EventEmitter()

const getTime = (sec) => {

    const days = sec > 0 ? Math.floor(sec / 1000 / 60 / 60 / 24) : 0;
    const hours = sec > 0 ? Math.floor(sec / 1000 / 60 / 60) % 24 : 0;
    const minutes = sec > 0 ? Math.floor(sec / 1000 / 60) % 60 : 0;
    const seconds = sec > 0 ? Math.floor(sec / 1000) % 60 : 0;

    return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`
}

const timeLeft = (deadline) => {
    const presentTime = new Date();

    if (presentTime >= deadline) {
        emmiter.emit('timerEnd');
    } else {
        console.log(getTime((deadline - presentTime) / 1000) + 'left')
    }
}

const showTimer = (timer) => {
    clearInterval(timer);
    console.log("Вреья вышло")
}


const timer = setInterval(() => {
    emmiter.emit('timerGo', deadline)
}, 1000);

emmiter.on('timerGo', timeLeft);
emmiter.on('timerEnd', () => {
    showTimer(timer);
})
