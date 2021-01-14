
//selects HTML element called chart
const chartE1 = document.querySelector(".chart");

//Creates canvas element and sets width/height
const canvas = document.createElement("canvas");
canvas.width = 100;
canvas.height = 100;

//adds canvas within the Chart element tags
chartE1.appendChild(canvas);

//initializes ctx object to manipulate canvas 
const ctx = canvas.getContext("2d");

//sets line width
ctx.lineWidth = 15;
//sets radius of arc
const R = 40;

function drawCircle(color, ratio, anticlockwise){
//sets color of arc
ctx.strokeStyle = color //#2c65cf for income and #f7261f for expenses 
ctx.beginPath();
//defines arc of doughnut chart, parameters in order as follows: x axis, y axis, radius, startAngle(in radians), endAngle(in radians), anticlockwise(boolean)
ctx.arc(canvas.width/2, canvas.height/2, R, 0, ratio * 2 * Math.PI, anticlockwise);
ctx.stroke();
}

//Parsing data, removing unecessary characters and turning into integer for income
let rawIncome = document.getElementsByClassName("budget__income--value")[0].textContent;
let income = parseInt(rawIncome.slice(2).replace(',',''));

//Parsing data, removing unecessary characters and turning into integer for expenses
let rawExpenses = document.getElementsByClassName("budget__expenses--value")[0].textContent;
let expenses = parseInt(rawExpenses.slice(2).replace(',',''));


function updateChart(income, expenses) {
    //clears rectangle behind chart
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //defines ratio of arc from total income/expenses
    let ratio = income / (income + expenses);
    //draws income arc
    drawCircle("#2c65cf", -ratio, true);
    //draws expenses arc
    drawCircle("#f7261f", 1 - ratio, false);
    console.log(income, expenses);
}

//Executes update chart 
document.querySelector(".add__btn").addEventListener("click", updateChart(income, expenses));