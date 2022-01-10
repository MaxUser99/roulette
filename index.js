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
  const textElements = [];

  options.forEach((option, i) => {
    const optionWeight = option.weight / totalSum;
    const { circle, line, text } = getSection(optionWeight, offset, option.text, i);
    sections.push(circle);
    lines.push(line);
    textElements.push(text);
    offset += optionWeight;
  });

  svg.append(...sections);
  svg.append(...lines);
  svg.append(...textElements);
  document.body.appendChild(svg);
}

function getSection(weight, offset, text, id) {
  const rotateDeg = 360 * offset;
  const textId = `line${id}`;

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

  const line = document.createElementNS(svgns, 'path');
  line.setAttribute('id', textId);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', 'black');
  const x0 = 100,
    y0 = 100,
    x1 = 100 + 100 * Math.cos((offset + weight / 2) * 2 * Math.PI),
    y1 = 100 + 100 * Math.sin((offset + weight / 2) * 2 * Math.PI);
  line.setAttribute('d', `M${x0} ${y0} L ${x1} ${y1}`);

  const textPath = document.createElementNS(svgns, 'textPath');
  textPath.setAttribute('href', `#${textId}`)
  textPath.innerHTML = text;

  const textEl = document.createElementNS(svgns, 'text');
  // textEl.setAttribute('textLength', '50%')
  textEl.appendChild(textPath);

  return { circle, line, text: textEl };
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
