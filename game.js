(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
    
	var Game = Asteroids.Game = function (ctx) {
		this.ctx = ctx;
		this.asteroids = this.addAsteroids(1);
		this.ship = this.addShip();
		this.bullets = [];
	};
  
	Game.FPS = 20;
	Game.DIM_X = 500;
	Game.DIM_Y = 500;
    
	Game.prototype.addAsteroids = function (numAsteroids) {
		var arr = [];
		for (var i = 0; i < numAsteroids ; i++){
			arr.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		}
		return arr;
	};
  
	Game.prototype.addShip = function () {
		var pos = [Game.DIM_X/2, Game.DIM_Y/2];
		var vel = [0,0];
		return new Asteroids.Ship(pos,vel, 10, "Black");
	};
    
	Game.prototype.draw = function () {
		var ctx = this.ctx;
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.asteroids.forEach(function (asteroid) {
			asteroid.draw(ctx);
		});
		
		this.bullets.forEach(function (bullet) {
			bullet.draw(ctx);
		});
		this.ship.draw(ctx);
	};
    
	Game.prototype.fireBullet = function (){
		var that = this;
		if (this.bullets.length < 30){
			this.bullets.push(that.ship.fireBullet());
		} else {
			(this.removeBullet(1))
		}
	};
	
	Game.prototype.move = function () {
		this.asteroids.forEach(function (asteroid) {
			asteroid.move();
		});
		this.ship.move();
		this.bullets.forEach(function (bullet){
			bullet.move();
		});
	};
    
	Game.prototype.step = function () {
		this.move();
		this.draw();
		this.checkCollisions();
		this.ship.decelerate(1);
		this.checkKeys();
	};
    
	Game.prototype.start = function () {
		var that = this;
		this.clock = setInterval(that.step.bind(that), Game.FPS);
	};
  
	Game.prototype.checkCollisions = function () {
		var that = this;

		this.asteroids.forEach(function (asteroid) {
			if (asteroid.isCollidedWith(that.ship)) {
				that.stop();
				alert("Game over!");
			}
		});
	};
  
	Game.prototype.stop = function () {
		clearInterval(this.clock);
	};
	
	Game.prototype.checkKeys = function(){
		
		if (key.isPressed('w')) {
			this.ship.power();
		}

		if (key.isPressed('a')) {
			this.ship.rotate( Math.PI / 30);
		}
  
		if (key.isPressed('s')) {
			this.ship.decelerate(10);
		}

		if (key.isPressed('d')) {
			this.ship.rotate( - Math.PI/ 30);
		}

    
		if (key.isPressed('m')) {
			this.fireBullet();
		}
	};
  
  
}) (this);