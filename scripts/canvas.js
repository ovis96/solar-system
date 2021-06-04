requirejs(["./helper"], function() {
  const GLOBAL_COLOR = '#ffffff';
  const WHITE = 'white';
  const BLACK = 'black';

  const randomColor = () => {
    const r = Math.floor(255 * Math.random());
    const g = Math.floor(255 * Math.random());
    const b = Math.floor(255 * Math.random());
    return `rgb(${r}, ${g}, ${b})`;
  }

  const canvas = document.querySelector('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas.getContext('2d');

  const mouse = {
    x: undefined,
    y: undefined,
    radius: 150,
    dx: 1,
    dy: 1,
  };
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  })



  const NUMBER_OF_PLANETS = 1000;
  const RADIUS = 5;
  const ANGLE = 2*Math.PI/3;



  function Circle(x, y, radius, color, index, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.index = index;
    this.dx = Math.random() * 3 - 1.5;
    this.dy = Math.random() * 3 - 1.5;
    if (index === 'sun') {
      this.dx = 0;
      this.dy = 0;
    }
    // this.speed = 5;
    this.mass = mass;

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      c.strokeStyle = this.color ? this.color : 'black';
      c.fillStyle = this.color ? this.color : 'black';
      c.fill();
      c.stroke()
    }

    this.move = () => {
      // if (this.index === 'sun') return;
      // let dist = Math.sqrt(square(this.dx) + square(this.dy))
      let upX = this.dx;
      let upY = this.dy;
      // check out of boundary
      // if (this.x < 0) return this.x = window.innerWidth;
      // if (this.x > window.innerWidth) return this.x = 0;

      // if (this.y < 0) return this.y = window.innerHeight;
      // if (this.y > window.innerHeight) return this.y = 0;


      // if (this.x + upX - this.radius < 0) {
      //   this.x = window.innerWidth;
      // } else if (this.x + upX + this.radius > window.innerWidth) {
      //   this.x = 0;
      // } else {
      //   this.x += upX;
      // }
      
      // if (this.y + upY - this.radius < 0)
      //   this.y = window.innerHeight;
      // else if (this.y + upY + this.radius > window.innerHeight) {
      //   this.y = 0;
      // } else {
      //   this.y += upY;
      // }
      this.x += upX;
      this.y += upY;
      if (doesCollide(sun, this)) {
        // this.dx = 0;
        // this.dy = 0;
      }
      // for (let i = 0; i<NUMBER_OF_PLANETS; i++) {
      //   if (this.index !== i) {
      //     if (doesCollide)
      //   }
      // }
      // move
    }
  }

  // create insects
  const circles = [];

  // for (let i = 0; i<NUMBER_OF_PLANETS; i++)
  // {
  //   const radius = Math.random() * 10 + 5;
  //   const x = Math.random() * (window.innerWidth - radius * 2) + radius;
  //   const y = Math.random() * (window.innerHeight - radius * 2) + radius;
  //   const nowCircle = new Circle(x, y, radius, randomColor(), i, false)
  //   let flag = 0;
  //   for (let j = 0; j<i; j++) {
  //     if (doesCollide(nowCircle, circles[j])) {
  //       flag = 1;
  //       break;
  //     }
  //   }
  //   if (flag) { // intersected with another circle so cancel this circle find a new one
  //     i --;
  //   } else {
  //     circles.push(nowCircle);
  //   }
  // }
  const sun = new Circle(window.innerWidth/2, window.innerHeight/2, 50, WHITE, 'sun', 1000)
  // const earth = new Circle(window.innerWidth/2-350, window.innerHeight/2-350, 10, 'green', 1, 1)

  const planets = [sun];
  for (let i = 0; i<NUMBER_OF_PLANETS; i++)
  {
    const mass = Math.random() * 1 + 0.2;
    const radius = mass * 10;
    const x = Math.random() * (window.innerWidth - radius * 2) + radius;
    const y = Math.random() * (window.innerHeight - radius * 2) + radius;
    const nowPlanet = new Circle(x, y, radius, randomColor(), i, mass)
    let flag = 0;
    for (let j = 0; j<=i; j++) {
      if (doesCollide(nowPlanet, planets[j])) {
        flag = 1;
        break;
      }
    }
    if (flag) { // intersected with another circle so cancel this circle find a new one
      i --;
    } else {
      planets.push(nowPlanet);
    }
  }
  function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (mouse.x && mouse.y) {
      // sun.x = mouse.x;
      // sun.y = mouse.y;
    }
    for (let i = 0; i<NUMBER_OF_PLANETS+1; i++) {
      planets[i].move();
      planets[i].draw();
    }
    sun.draw();
  }
  animate(); // animate

  setInterval(() => { // change direction of insects every 1 sec
    const G = 9.11e0;
    for (let i = 0; i<NUMBER_OF_PLANETS+1; i++) {
      for (let j = 0; j<i; j++) {
        const planetA = planets[i];
        const planetB = planets[j];
        const f = G * planetA.mass * planetB.mass / dist2(planetA, planetB);
        const a = f / planetA.mass;
        const dxy = minus(planetB, planetA);
        const dist = Math.sqrt(dist2(dxy, ZERO_VECTOR));
        dxy.x /= dist / a;
        dxy.y /= dist / a;
        if (doesCollide(planetB, planetA)) return;
        planetA.dx += dxy.x;
        planetA.dy += dxy.y;
      }
    }
  }, 100);

  // setInterval(() => {
  //   c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  // }, 20000);
});
