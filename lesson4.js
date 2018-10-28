// 1.	Исправить часы

function Clock() {
    this.date = new Date();
}

Clock.prototype.start = function() {
    setInterval(Clock.bind(this), 1000); // терялся контекст вызова, исправлено с помощью оборачивания в bind
};

Clock.prototype.getTime = function() {
    return this.date.toLocaleTimeString();
}


const myClock = new Clock();

myClock.start();
console.log(myClock.getTime());

setTimeout(function() {
    console.log(myClock.getTime());
}, 5000);


// 2.	Разработать класс AlarmClock.

function AlarmClock(alarmTime) {
    Clock.apply(this, arguments);
    this.alarmTime = alarmTime;
}

AlarmClock.prototype = Object.create(Clock.prototype);
AlarmClock.prototype.constructor = AlarmClock;

AlarmClock.prototype.setAlarmTime = function(alarmTime) {
    this.alarmTime = alarmTime;
    console.log('Установлен будильник на время ' + this.alarmTime);
}

AlarmClock.prototype.checkAlarmTime = function() {
    if (this.alarmTime === this.date.toLocaleTimeString()) {
        alert('Звенит будильник!!!');
    }
}

AlarmClock.prototype.start = function() {
    Clock.prototype.start.apply(this, arguments);
    setInterval(this.checkAlarmTime.bind(this), 1000);
}

const myAlarmClock = new AlarmClock();
myAlarmClock.setAlarmTime('14:03:00');
myAlarmClock.start();