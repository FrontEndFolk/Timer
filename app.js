const timer = document.querySelector('.countdown__timer');
const dataList = document.querySelectorAll('._date')
const runBtn = document.querySelector('.controls__run');
const resetBtn = document.querySelector('.controls__reset');
const pauseBtn = document.querySelector('.controls__pause');
const days = document.querySelector('.countdown__day');
const hours = document.querySelector('.countdown__hours');
const minutes = document.querySelector('.countdown__minutes');
const block = document.querySelector('.anti-click');
let intervalTimer = undefined;

function getTimerDate() {
    timerDate = 'Thu, 01 Jan 1970 ';
    for (let num of dataList) {
        timerDate += `${num.textContent}:`;
    }
    return Date.parse(timerDate.slice(0, 28) + ' GMT');
}

function changeTime(elem = null, val, act = '') {
    if (act === '+') {
        if (val >= 9) {
            elem.parentNode.children[1].textContent = val + 1
        } else {
            elem.parentNode.children[1].textContent = '0' + `${val + 1}`
        }
    }
    if (act === '-') {
        if (val >= 9) {
            elem.parentNode.children[1].textContent = val - 1
        } else {
            elem.parentNode.children[1].textContent = '0' + `${val - 1}`
        }
    }
    if (act === '') {
        if (val < 10) {
            return '0' + `${val}`
        } else {
            return val
        }
    }
}

function render() {
    let time = getTimerDate();
    if (time == 0) {
        return
    } else {
        runBtn.setAttribute('disabled', null);
        block.classList.add('anti-click--active');
        pauseBtn.removeAttribute('disabled');
    }
    intervalTimer = setInterval(() => {
        time -= 1000;
        time = new Date(time);
        days.textContent = changeTime(undefined, time.getUTCHours(), undefined);
        hours.textContent = changeTime(undefined, time.getMinutes(), undefined);
        minutes.textContent = changeTime(undefined, time.getSeconds(), undefined);
        if (time <= 0) {
            clearInterval(intervalTimer);
            runBtn.toggleAttribute('disabled');
            block.classList.remove('anti-click--active');
            alert('ring ring mzfk')
        }
    }, 1000)
}

timer.addEventListener('click', (event) => {
    let button = event.target;
    let val = Number(button.parentNode.children[1].textContent);
    if (button.className === 'add' && val < 24) {
        changeTime(button, val, '+');
    }
    if (button.className === 'reduce' && val > 0) {
        changeTime(button, val, '-');
    }

    getTimerDate();
});

runBtn.addEventListener('click', render);


resetBtn.addEventListener('click', () => {
    clearInterval(intervalTimer);
    for (let num of dataList) {
        num.textContent = '00';
    }
    runBtn.removeAttribute('disabled');
    block.classList.remove('anti-click--active');
    pauseBtn.setAttribute('disabled', null);
    pauseBtn.textContent = 'PAUSE';
});


pauseBtn.addEventListener('click', (event) => {
    if (event.target.textContent === 'PAUSE') {
        event.target.textContent = 'UNPAUSE';
        clearInterval(intervalTimer);
    } else {
        event.target.textContent = 'PAUSE';
        render();
    }
});