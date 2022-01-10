const svgns = "http://www.w3.org/2000/svg";

const options = [
  { text: 'first', weight: 2 },
  { text: 'first', weight: 2 },
  { text: 'first', weight: 2 },
  { text: 'second', weight: 1 },
  { text: 'third', weight: 1 },
];

createSvg();

function createSvg() {
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('height', 200);
  svg.setAttribute('width', 200);

  let offset = -0.25;
  const totalSum = options.reduce((acc, current) => acc + current.weight, 0);
  const sections = [];
  const lines = [];
  options.forEach(option => {
    const optionWeight = option.weight / totalSum;
    const { circle, line } = getSection(optionWeight, offset, option.text);
    sections.push(circle);
    lines.push(line);
    offset += optionWeight;
  });

  svg.append(...sections);
  svg.append(...lines);
  document.body.appendChild(svg);
}

function getSection(weight, offset, text) {
  const rotateDeg = 360 * offset;
  
  const circle = document.createElementNS(svgns, 'circle');
  circle.setAttribute('r', 50);
  circle.setAttribute('cx', 100);
  circle.setAttribute('cy', 100);
  circle.setAttribute('fill', 'transparent');
  circle.setAttribute('stroke', getRandomColor());
  circle.setAttribute('stroke-width', 100);
  circle.setAttribute('stroke-dasharray', `calc(${weight} * ${Math.PI} * 100) calc(${Math.PI} * 100)`);
  circle.setAttribute('transform-origin', 'center');
  circle.setAttribute('transform', `rotate(${rotateDeg})`);

  const line = document.createElementNS(svgns, 'line');
  line.setAttribute('stroke', 'black');
  line.setAttribute('x1', 100);
  line.setAttribute('y1', 100);
  line.setAttribute('x2', 100 + 100 * Math.cos((offset + weight / 2) * 2 * Math.PI));
  line.setAttribute('y2', 100 + 100 * Math.sin((offset + weight / 2) * 2 * Math.PI));

  return { circle, line };
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
