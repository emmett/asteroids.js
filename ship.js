(function(root) {
    var Asteroids = root.Asteroids = (root.Asteroids || {});
    var MovingObject = Asteroids.MovingObject;

    var Ship = Asteroids.Ship = function(pos, vel, radius) {
      var COLOR = "black";
      this.heading = 0;
      this.thrust = 0;
      MovingObject.call(this, pos, vel, radius, COLOR);
    };
    
    Ship.inherits(MovingObject);
    
    Ship.prototype.rotate = function(rad){
      this.heading += rad;
    };
    
    Ship.prototype.power = function(impulse){ 
      this.thrust = impulse;
      this.vel[0] += this.thrust * Math.cos(this.heading);
      this.vel[1] += this.thrust * Math.sin(this.heading);
    };
    
    Ship.prototype.decelerate = function(){
      this.vel[0] = this.vel[0] * .97;
      this.vel[1] = this.vel[1] * .97;
    };
  
}) (this);