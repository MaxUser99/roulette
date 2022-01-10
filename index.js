const svgns = "http://www.w3.org/2000/svg";

const options = [
  { text: '', weight: 3 },
  { text: '', weight: 1 },
  { text: '', weight: 1 },
  { text: '', weight: 1 },
];

createSvg();

function createSvg() {
  const svg = document.createElementNS(svgns, 'svg');
  svg.setAttribute('height', 200);
  svg.setAttribute('width', 200);
  svg.setAttribute('transform', 'rotate(-90)');

  let offset = 0;
  const totalSum = options.reduce((acc, current) => acc + current.weight, 0);
  const sections = options.map(option => {
    const optionWeight = option.weight / totalSum;
    const section = getSection(optionWeight, offset);
    offset += optionWeight;
    return section;
  });

  svg.append(...sections);
  document.body.appendChild(svg);
}

function getSection(weight, offset) {
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

  return circle;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
