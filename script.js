const canvas = document.querySelector("#canvas");

let temp = null;

const state = {
    startX: 0,
    startY: 0,
    toolType: null, // line, circle, etc
    color: '#000000ff',
    fillColor: '#00000001',
    width: 2,
};

canvas.addEventListener('mousedown', (e) => {
    state.toolType = 'circle';
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
});

canvas.addEventListener('mousemove', (e) => {

    if (state.toolType === 'circle') {
        const a = e.clientX - state.startX;
        const b = e.clientY - state.startY;
        const radius = Math.sqrt(a * a + b * b);

        temp.setAttribute('r', radius);
    }
});

canvas.addEventListener('mouseup', () => {
    state.toolType = null;
    temp = null;
});