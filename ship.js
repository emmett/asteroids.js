(function (root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	var MovingObject = Asteroids.MovingObject;
		
	var maxV = 20;
		
	var Ship = Asteroids.Ship = function (pos, vel, radius) {
		var COLOR = "black";
		this.heading = Math.PI;
		MovingObject.call(this, pos, vel, radius, COLOR);
	};
    
	Ship.inherits(MovingObject);
    
	Ship.prototype.rotate = function (rad){
		this.heading += rad;
	};
		
	Ship.prototype.draw = function  (ctx){
		var pos = this.pos;
		var ang = this.heading;
		var pi = Math.PI;
		var leftVert = ang + (2.25 / 3) * pi;
		var rightVert = ang + (3.75 / 3) * pi;
		var rad = this.radius * 1.2;
				
			
		ctx.beginPath();
		ctx.moveTo(pos[1] + rad * Math.sin(ang), pos[0] + rad * Math.cos(ang));
		ctx.lineTo(pos[1] + rad * Math.sin(leftVert), pos[0] + rad * Math.cos(leftVert));
		ctx.lineTo(pos[1] + rad * Math.sin(rightVert), pos[0] + rad * Math.cos(rightVert));
		ctx.closePath();
		ctx.strokeStyle = '#27ae60';
		ctx.lineWidth = 1;
		ctx.stroke();
			
	};
		    
	Ship.prototype.power = function(){
     	
		this.vel[0] += 1 * Math.cos(this.heading);
		this.vel[1] += 1 * Math.sin(this.heading);
			
		if (this.vel[1] > maxV){
			this.vel[1] = maxV;
		}
			
		if (this.vel[1] < -maxV){
			this.vel[1] = -maxV;
		}
			
		if (this.vel[0] < -maxV){
			this.vel[0] = -maxV;
		}
			
		if (this.vel[0] > maxV){
			this.vel[0] = maxV;
		}
	};
    
	Ship.prototype.decelerate = function (num){
		this.vel[0] = this.vel[0] * (100 - num) / 100 ;
		this.vel[1] = this.vel[1] * (100 - num) / 100 ;
	};
		
	Ship.prototype.fireBullet = function() {
		var pos = this.pos;
		var rad = this.radius;
		var ang = this.heading;
		var origin = [pos[1] + rad * Math.sin(ang), pos[0] + rad * Math.cos(ang)]
		var bulletVel = [];
			
		bulletVel[1] = 10 *  Math.cos(ang) + this.vel[0];
		bulletVel[0] = 10 *  Math.sin(ang) + this.vel[1];
			
		return new Asteroids.Bullet(origin, bulletVel, 5);
	}
  
}) (this);