const svgns = "http://www.w3.org/2000/svg";

const options = [
  { text: 'second fd', weight: 1 },
  { text: 'first', weight: 1 },
  { text: 'first', weight: 2 },
  { text: 'second', weight: 1 },
  { text: 'third', weight: 1.5 },
];

createSvg();
initializeButton();

function initializeButton() {
  const button = document.querySelector('button');
  let deg = 0;
  button.onclick = () => {
    const duration = 1500 + Math.random() * 1000;
    document.documentElement.style.setProperty('--transition-duration', duration + 'ms')

    deg += 20 * Math.abs(Math.round(Math.random() * 500));
    const css = '-webkit-transform: rotate(' + deg + 'deg);';
    const svg = document.querySelector('.roulette');
    svg.setAttribute('style', css);
  };
}

function createSvg() {
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('height', 200);
  svg.setAttribute('width', 200);
  svg.setAttribute('class', 'roulette');

  let offset = -0.25;
  const totalSum = options.reduce((acc, current) => acc + current.weight, 0);

  const sections = [];
  const lines = [];
  const textElements = [];

  options.forEach((option, i) => {
    const optionWeight = option.weight / totalSum;
    const {
      circle,
      line,
      text,
      separatorLine
    } = getSection(optionWeight, offset, option.text, i);
    sections.push(circle);
    lines.push(line, separatorLine);
    textElements.push(text);
    offset += optionWeight;
  });

  svg.append(...sections);
  svg.append(...lines);
  svg.append(...textElements);
  svg.append(...getDecorativeCircles());
  document.body.appendChild(svg);
}

function getDecorativeCircles() {
  const centerCircle = document.createElementNS(svgns, 'circle');
  centerCircle.setAttribute('r', 10);
  centerCircle.setAttribute('cx', 100);
  centerCircle.setAttribute('cy', 100);
  centerCircle.setAttribute('fill', 'white');
  centerCircle.setAttribute('stroke', 'black');
  centerCircle.setAttribute('stroke-width', '4px');

  const borderCircle = document.createElementNS(svgns, 'circle');
  borderCircle.setAttribute('r', 99);
  borderCircle.setAttribute('cx', 100);
  borderCircle.setAttribute('cy', 100);
  borderCircle.setAttribute('fill', 'transparent');
  borderCircle.setAttribute('stroke', 'black');
  borderCircle.setAttribute('stroke-width', '2px');

  return [centerCircle, borderCircle];
}

function getSection(weight, offset, text, id) {
  const rotateDeg = 360 * offset;
  const textId = `line${id}`;
  const color = getRandomColor();

  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttribute('r', 50);
  circle.setAttribute('cx', 100);
  circle.setAttribute('cy', 100);
  circle.setAttribute('fill', 'transparent');
  circle.setAttribute('stroke', color);
  circle.setAttribute('stroke-width', 100);
  circle.setAttribute('stroke-dasharray', `calc(${weight} * ${Math.PI} * 100) calc(${Math.PI} * 100)`);
  circle.setAttribute('transform-origin', 'center');
  circle.setAttribute('transform', `rotate(${rotateDeg})`);

  const separatorLine = document.createElementNS(svgns, 'line');
  separatorLine.setAttribute('fill', 'none');
  separatorLine.setAttribute('stroke', 'black');
  separatorLine.setAttribute('x1', 100);
  separatorLine.setAttribute('y1', 100);
  separatorLine.setAttribute('x2', 100 + 100 * Math.cos(offset * 2 * Math.PI));
  separatorLine.setAttribute('y2', 100 + 100 * Math.sin(offset * 2 * Math.PI));

  const line = document.createElementNS(svgns, 'path');
  line.setAttribute('id', textId);
  line.setAttribute('fill', 'none');
  const x0 = 100,
    y0 = 100,
    x1 = 100 + 100 * Math.cos((offset + weight / 2) * 2 * Math.PI),
    y1 = 100 + 100 * Math.sin((offset + weight / 2) * 2 * Math.PI);
  line.setAttribute('d', `M${x0} ${y0} L ${x1} ${y1}`);

  const textPath = document.createElementNS(svgns, 'textPath');
  textPath.setAttribute('href', `#${textId}`)
  textPath.innerHTML = text;

  const textEl = document.createElementNS(svgns, 'text');
  textEl.setAttribute('x', '25%');
  textEl.setAttribute('text-anchor', 'middle');
  textEl.setAttribute('fill', getContrastYIQ(color));
  textEl.setAttribute('font-family', "'Lucida Grande', sans-serif");
  textEl.appendChild(textPath);

  return {
    circle,
    line,
    separatorLine,
    text: textEl
  };
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getContrastYIQ(hexcolor) {
  const r = parseInt(hexcolor.substr(1, 2), 16);
  const g = parseInt(hexcolor.substr(3, 2), 16);
  const b = parseInt(hexcolor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
