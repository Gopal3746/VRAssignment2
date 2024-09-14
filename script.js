const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bus = {
  x: -200,
  y: canvas.height - 140,
  bodyWidth: 500,
  bodyHeight: 150,
  wheelRadius: 30,
  wheelSpeed: 0.08,
  movementSpeed: 1.8,
  bodyColor: '#FFD700',
  windowColor: '#BBDEFB',
  wheelColor: '#333',
  tireColor: '#555',
  wheelRotation: 0
};
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  Body();
  Wheels();
  Mirror();
  Smoke();
  Ladder();
  Doors();
}
function Body() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let grd = ctx.createLinearGradient(bus.x - bus.bodyWidth / 2, bus.y - bus.bodyHeight / 2, bus.x - bus.bodyWidth / 2, bus.y + bus.bodyHeight);
  grd.addColorStop(0, "#50f2ff");
  grd.addColorStop(1, "#50f2ff");
  ctx.fillStyle = grd;
  ctx.strokeStyle = '#50f2ff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(bus.x - bus.bodyWidth / 2, bus.y - bus.bodyHeight / 2, bus.bodyWidth, bus.bodyHeight, 20);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#00afbd';
  ctx.beginPath();
  ctx.roundRect(bus.x - bus.bodyWidth / 2 + 20, bus.y - bus.bodyHeight / 2 - 10, bus.bodyWidth - 40, bus.bodyHeight / 8, 10);
  ctx.fill();
  const doorWidth = 60;
  const doorYOffset = 20;
  const windowHeight = bus.bodyHeight / 2 - 30;
  const windowWidth = 40;
  const spacing = 20;
  const leftDoorX = bus.x - bus.bodyWidth / 2;
  const middleDoorX = bus.x;
  const rightDoorX = bus.x + bus.bodyWidth / 2 - doorWidth;
  let windowStartX = leftDoorX + doorWidth + spacing;
  const windowPositions = [];
  while (windowStartX + windowWidth <= middleDoorX - doorWidth / 2 - spacing) {
    windowPositions.push(windowStartX);
    windowStartX += windowWidth + spacing;
  }
  windowStartX = middleDoorX + doorWidth / 2 + spacing;
  while (windowStartX + windowWidth <= rightDoorX - spacing) {
    windowPositions.push(windowStartX);
    windowStartX += windowWidth + spacing;
  }
  ctx.fillStyle = bus.windowColor;
  windowPositions.forEach(position => {
  ctx.beginPath();
  ctx.rect(position, bus.y - bus.bodyHeight / 2 + doorYOffset + spacing, windowWidth, windowHeight);
  ctx.fill();
  });
  Doors();
  Mirror();
  Smoke();
}
function Mirror() {
    const rodRadius = 5;
    const rodLength = 50;
    const mirrorWidth = 20;
    const mirrorHeight = 40;
    const rodOverlap = 10;
    const curveRadius = 15;
    const baseMountWidth = 10;
    const baseMountHeight = 10;
    const baseMountX = bus.x + bus.bodyWidth / 2 - rodRadius;
    const baseMountY = bus.y - bus.bodyHeight / 2 + 10;
    ctx.fillStyle = '#666';
    ctx.fillRect(baseMountX - baseMountWidth / 2, baseMountY - baseMountHeight / 2, baseMountWidth, baseMountHeight);
    const rodStartX = baseMountX - rodOverlap;
    const rodStartY = baseMountY;
    const rodEndX = rodStartX + rodLength;
    const rodEndY = rodStartY;
    ctx.beginPath();
    ctx.moveTo(rodStartX, rodStartY);
    ctx.lineTo(rodEndX, rodEndY);
    ctx.arcTo(rodEndX + curveRadius, rodEndY, rodEndX + curveRadius, rodEndY + mirrorHeight / 2, curveRadius);
    ctx.lineTo(rodEndX + curveRadius, rodEndY + mirrorHeight / 2);
    ctx.lineTo(rodEndX + curveRadius, rodEndY - rodRadius);
    ctx.arcTo(rodEndX, rodEndY - rodRadius, rodStartX, rodStartY, curveRadius);
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
    const mirrorBoxX = rodEndX + curveRadius - mirrorWidth / 2;
    const mirrorBoxY = rodEndY + rodRadius;
    ctx.fillStyle = '#000';
    ctx.fillRect(mirrorBoxX, mirrorBoxY, mirrorWidth, mirrorHeight);
    const gradient = ctx.createLinearGradient(mirrorBoxX, mirrorBoxY, mirrorBoxX, mirrorBoxY + mirrorHeight);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(mirrorBoxX, mirrorBoxY, mirrorWidth, mirrorHeight);
    }
    function Smoke() {
      const smokeDensity = 4;
      ctx.fillStyle = 'rgba(169, 169, 169, 0.5)';
      for (let i = 0; i < smokeDensity; i++) {
        let smokeX = bus.x - bus.bodyWidth / 2 + Math.random() * 100;
        let smokeY = bus.y + bus.bodyHeight / 2 - 20 + Math.random() * 20;
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, 15 + Math.random() * 15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function Wheels() {
      RWheel(bus.x - bus.bodyWidth / 3, bus.y + bus.bodyHeight / 2 - 10, bus.wheelRadius, bus.wheelRotation);
      RWheel(bus.x + bus.bodyWidth / 3 - 30, bus.y + bus.bodyHeight / 2 - 10, bus.wheelRadius, bus.wheelRotation);
    }
    function Ladder() {
      ctx.save();
      const ladderX = bus.x - bus.bodyWidth / 2 + 30;
      const ladderY = bus.y - bus.bodyHeight / 2 + 10;
      const ladderHeight = 100;
      const ladderWidth = 5;
      const rungCount = 5;
      const rungSpacing = ladderHeight / (rungCount + 1);
      const rungWidth = 30;
      ctx.strokeStyle = 'black';
      ctx.lineWidth = ladderWidth;
      ctx.beginPath();
      ctx.moveTo(ladderX, ladderY);
      ctx.lineTo(ladderX, ladderY + ladderHeight);
      ctx.moveTo(ladderX + rungWidth, ladderY);
      ctx.lineTo(ladderX + rungWidth, ladderY + ladderHeight);
      ctx.stroke();
      ctx.lineWidth = 3;
      for (let i = 1; i <= rungCount; i++) {
        let rungY = ladderY + i * rungSpacing;
        ctx.beginPath();
        ctx.moveTo(ladderX - 5, rungY);
        ctx.lineTo(ladderX + rungWidth + 5, rungY);
        ctx.stroke();
      }
      ctx.restore();
    }
    function RWheel(centerX, centerY, radius, rotation) {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.strokeStyle = bus.wheelColor;
      ctx.lineWidth = 6;
      ctx.fillStyle = bus.tireColor;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2);
      ctx.fill();
      Spokes(0, 0, radius);
      ctx.restore();
    }
    function Spokes(centerX, centerY, radius) {
      ctx.strokeStyle = bus.wheelColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        let angle = (i / 8) * Math.PI * 2;
        let x = centerX + radius * Math.cos(angle);
        let y = centerY + radius * Math.sin(angle);
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    function Doors() {
      const doorWidth = 60;
      const doorHeight = bus.bodyHeight - 40;;
      const doorYOffset = 20;  
      const leftDoorX = bus.x - bus.bodyWidth / 2 + (bus.bodyWidth - 2 * doorWidth) / 2;
      const rightDoorX = bus.x + bus.bodyWidth / 2 - doorWidth - 10; 
      Door(leftDoorX, bus.y - bus.bodyHeight / 2 + doorYOffset, doorWidth, doorHeight);
      Door(rightDoorX, bus.y - bus.bodyHeight / 2 + doorYOffset, doorWidth, doorHeight);
    }
    function Door(x, y, width, height) {
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);
      const panelWidth = width / 2;
      const panelHeight = height;
      ctx.fillStyle = '#BBDEFB';  
      for (let i = 0; i < 2; i++) {
        ctx.fillRect(x + i * panelWidth, y, panelWidth, panelHeight);
      }
      const handleWidth = 10;
      const handleHeight = 20;
      const handleX = x + width / 2 - handleWidth / 2;
      const handleY = y + height / 2 - handleHeight / 2;
      ctx.fillStyle = '#666';  
      ctx.fillRect(handleX, handleY, handleWidth, handleHeight);
    }
    function update() {
      bus.x += bus.movementSpeed;
      bus.wheelRotation += bus.wheelSpeed;
      if (bus.x > canvas.width + bus.bodyWidth / 2) {
        bus.x = -bus.bodyWidth / 2;
      }
    }

    function processInput() {
      //
    }
    window.onload = function() {
    requestAnimationFrame(mainLoop);
    function mainLoop() {
    processInput();
    update();
    draw();
    requestAnimationFrame(mainLoop);
  }
};
