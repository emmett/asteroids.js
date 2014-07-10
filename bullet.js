(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var MovingObject = Asteroids.MovingObject;
		
	var Bullet = Asteroids.Bullet = function (pos, vel, radius) {
		this.pos = pos;
		this.vel = vel;
		this.radius = radius;
		this.color = 'rgb(128,128,0)'
		return this;
	};
		
	Bullet.inherits(MovingObject);
		
	Bullet.prototype.draw = function (ctx){
		var pos = this.pos;
		var rad = this.radius;
			
		ctx.beginPath();
		ctx.moveTo(pos[0] + rad * Math.sin(pos[0]), pos[1] + rad * Math.cos(pos[1]));
		ctx.lineTo(pos[0], pos[1]);
		ctx.closePath();
		ctx.strokeStyle = 'rgb(128,0,0)';
		ctx.lineWidth = 1;
		ctx.stroke();
	}
		
}) (this);