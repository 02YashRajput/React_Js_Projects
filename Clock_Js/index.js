function updateTime(){
    const hour = document.querySelector("[data-hour]")
    const minute = document.querySelector("[data-minute]")
    const second = document.querySelector("[data-second]")
    const hourHand = document.querySelector("[data-hourHand]")
    const minuteHand = document.querySelector("[data-minuteHand]")
    const secondHand = document.querySelector("[data-secondHand]")

    const date = new Date();
    const h = date.getHours()%12;
    const m = date.getMinutes();
    const s = date.getSeconds();
    hour.innerText = (h<10 ? "0" : "") + h;
    minute.innerText =(m<10 ? "0" : "") + m;
    second.innerText = (s<10 ? "0" : "") + s ;
    hourHand.style.transform = `rotate(${h*30}deg)`;
    minuteHand.style.transform = `rotate(${m*6}deg)`;
    secondHand.style.transform = `rotate(${s*6}deg)`;
}

updateTime();
setInterval(updateTime,1000)
