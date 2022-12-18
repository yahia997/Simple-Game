window.addEventListener('load', () => {
    document.body.style.height = `${window.innerHeight}px`;
});

var current = "right";
var count = 0;
const speeds = [1];
const directions = ["top", "bottom", "right", "left"];

let checkArr = [];

var shield = document.getElementById("shield");
var countElem = document.getElementById("count");

// to handle keyboard clicks
window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
        shield.style.transform = "rotate(-90deg)";
        current = "top";
    } else if (e.key === "ArrowDown" || e.key === "s") {
        shield.style.transform = "rotate(90deg)";
        current = "bottom";
    } else if (e.key === "ArrowRight" || e.key === "d") {
        shield.style.transform = "rotate(0deg)";
        current = "right";
    } else if (e.key === "ArrowLeft" || e.key === "a") {
        shield.style.transform = "rotate(180deg)";
        current = "left";
    }
});


// to generate new balls and handle lose
setInterval(() => {
    let dir = directions[Math.floor(Math.random() * directions.length)];
    let time = speeds[Math.floor(Math.random() * speeds.length)];

    // create new ball
    let elem = document.createElement("div");
    elem.classList.add(`${dir}`, "fire");
    elem.style.animationDuration = `${time}s`;
    elem.id = count;
    
    checkArr.push([time, dir, count]);
    checkArr.sort((a, b) => a[0] - b[0]);
    
    
    document.body.appendChild(elem);
    
    setTimeout(() => {
        if (checkArr[0][1] !== current) {
            // we you lose
            window.location.reload();
        }

        // increase points
        count++;
        countElem.textContent = count;

        // remove the ball
        document.getElementById(checkArr[0][2]).remove();
        checkArr.shift();
    }, checkArr[0][0] * 1000);


}, 1000);