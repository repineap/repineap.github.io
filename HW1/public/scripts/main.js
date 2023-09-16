let counter = 3;
const colorBox = document.getElementById('colorBox');
const colorText = document.getElementById('colorText');

main = function() {
    console.log("Ready");
    document.querySelector("#decrementButton").onclick = (event) => {
        console.log("decrement");
        counter = counter - 1;
        updateView();
    }
    document.querySelector("#resetButton").onclick = (event) => {
        console.log("reset");
        counter = 0;
        updateView();
    }
    document.querySelector("#incrementButton").onclick = (event) => {
        console.log("increment");
        counter = counter + 1
        updateView();
    }
    document.querySelector("#blueButton").onclick = (event) => {
        console.log("blue");
        colorBox.style.backgroundColor = 'blue';
        colorText.innerHTML = 'BLUE';
        colorText.style.color = 'white';
    }
    document.querySelector("#redButton").onclick = (event) => {
        console.log("red");
        colorBox.style.backgroundColor = 'red';
        colorText.innerHTML = 'RED';
        colorText.style.color = 'black';
    }
    document.querySelector("#greenButton").onclick = (event) => {
        console.log("green");
        colorBox.style.backgroundColor = 'green';
        colorText.innerHTML = 'GREEN';
        colorText.style.color = 'white';
    }
    document.querySelector("#yellowButton").onclick = (event) => {
        console.log("yellow");
        colorBox.style.backgroundColor = 'yellow';
        colorText.innerHTML = 'YELLOW';
        colorText.style.color = "black";
    }
}



updateView = function () {
    document.querySelector("#counterText").innerHTML = `${counter}`;
}

main();