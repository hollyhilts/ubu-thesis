const Museum = (p5) => {

  let snowflakes = []; // array to hold snowflake objects
  const avatars = []; // for avatar sprites
  const modules = []; // for module sprites

  p5.setup = () =>  {
    p5.createCanvas(p5.windowWidth/2, p5.windowHeight/2);
    p5.noStroke();
    avatars.push(new avatar());
    modules.push(new module());
  }

  p5.draw = () => {
    p5.fill(240);
    p5.background('brown');
    let t = p5.frameCount / 60; // update time

    // create a random number of snowflakes each frame
    for (let i = 0; i < p5.random(5); i++) {
      snowflakes.push(new snowflake()); // append snowflake object
    }

    // loop through snowflakes with a for..of loop
    for (let flake of snowflakes) {
      flake.update(t); // update snowflake position
      flake.display(); // draw snowflake
    }

    p5.fill(20);
    avatars[0].update();
    avatars[0].display();

    modules[0].display();
  }

  // snowflake class
  function snowflake() {

    // initialize coordinates
    this.posX = 0;
    this.posY = p5.random(-50, 0);
    this.initialangle = p5.random(0, 2 * p5.PI);
    this.size = p5.random(2, 5);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p5.sqrt(p5.random(p5.pow(p5.width / 2, 2)));
    this.update = function(time) {
      // x position follows a circle
      let w = 0.6; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = p5.width / 2 + this.radius * p5.sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += p5.pow(this.size, 0.5);

      // delete snowflake if past end of screen
      if (this.posY > p5.height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      p5.ellipse(this.posX, this.posY, this.size);
    };
  }

  // User character
  function avatar() {
    // initial
    this.posX = p5.width/2;
    this.posY = p5.height/2;
    this.size = 10;

    this.display = function () {
      p5.ellipse(this.posX, this.posY, this.size);
    }

    this.update = function () {
      if (p5.keyIsDown(p5.LEFT_ARROW)) {
        this.posX -= 3;
      }
      if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        this.posX += 3;
      }
      if (p5.keyIsDown(p5.UP_ARROW)) {
        this.posY -= 3;
      }
      if (p5.keyIsDown(p5.DOWN_ARROW)) {
        this.posY += 3;
      }
    }
  }

  // Interactive modules, will need to add parameters
  function module() {
    this.posX = p5.width/2;
    this.posY = p5.height/10;
    this.size = 20;

    this.display = function() {
      p5.ellipse(this.posX, this.posY, this.size)
    }
  }
}

export default Museum
