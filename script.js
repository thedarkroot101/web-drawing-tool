const canvas = document.querySelector("#canvas");
const circleBtn = document.querySelector("#circleBtn");

let temp = null;

const state = {
    startX: 0,
    startY: 0,
    toolType: null, // line, circle, etc
    color: '#000000ff',
    fillColor: 'transparent',
    width: 2,
};
//  Tool selection
circleBtn.addEventListener('click', () => {
    if (state.toolType === 'circle') {
        state.toolType = null;
        circleBtn.classList.remove('active');
    } else {
        state.toolType = 'circle';
        circleBtn.classList.add('active');
    }
});

const lineBtn = document.querySelector("#lineBtn");
lineBtn.addEventListener('click', () => {
    if (state.toolType === 'line') {
        state.toolType = null;
        lineBtn.classList.remove('active');
    } else {
        state.toolType = 'line';
        lineBtn.classList.add('active');
    }
});

//    Circle tool
function drawCircle(e) {
    state.startX = e.clientX;
    state.startY = e.clientY;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", state.startX);
    circle.setAttribute("cy", state.startY);
    circle.setAttribute("r", 0);
    circle.setAttribute("stroke", state.color);
    circle.setAttribute("fill", state.fillColor);
    circle.setAttribute("stroke-width", state.width);

    canvas.appendChild(circle);

    temp = circle;
}

function updateCircle(e) {
    const a = e.clientX - state.startX;
    const b = e.clientY - state.startY;
    const radius = Math.sqrt(a * a + b * b);

    temp.setAttribute('r', radius);
}

//    Line tool
function drawLine(e) {
    state.startX = e.clientX;
    state.startY = e.clientY;//I forget to copy this line last time .. thats why its don't store the first point

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", state.startX);
    line.setAttribute("y1", state.startY);
    line.setAttribute("x2", state.startX);
    line.setAttribute("y2", state.startY);
    line.setAttribute("stroke", state.color);
    line.setAttribute("stroke-width", state.width);
    canvas.appendChild(line);

    temp = line;
}

function updateLine(e) {

    temp.setAttribute("x2", e.clientX);
    temp.setAttribute("y2", e.clientY);
}




//   Event listeners

canvas.addEventListener('mousedown', (e) => {
    if (state.toolType === 'circle')
        drawCircle(e);
    else if (state.toolType === 'line')
        drawLine(e);
    else return;
});

canvas.addEventListener('mousemove', (e) => {

    if (state.toolType === 'circle')
        updateCircle(e);
    else if (state.toolType === 'line')
        updateLine(e);
    else return;
});

canvas.addEventListener('mouseup', () => {
    temp = null;
});