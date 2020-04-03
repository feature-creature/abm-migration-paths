/*
 * Intermediary Instance
 *
 */

function Intermediary (p5i,xPos,yPos,xDir,yDir,diameter){

  this.pos = p5i.createVector(xPos,yPos);
  this.dir = p5i.createVector(xDir,yDir);
  this.normalizedBool = function(x){return Math.random() <= x;} 
  this.exampleBoo = this.normalizedBool(0.5); 
  this.network = p5i.random() <= 0.5 ? "a" : "b";
  this.hiring = false;
  this.d = diameter;
  this.dMin = 20;

  var parent = this;
  this.networks = {
    "a" : {
      move:function(){parent.recruitingWalk()},
      color:p5i.color(255,255,255),
      stroke:p5i.color(75,75,75)
    },
    "b" : {
      move:function(){parent.recruitingWalk()},
      color:p5i.color(0,0,0),
      stroke:p5i.color(75,75,75)
    }
  };


  this.update = function(){
    this.networks[this.network].move();
  }


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.fill(this.networks[this.network].color);
    p5i.noStroke();
    p5i.ellipse(0,0,this.d,this.d);
    
    p5i.noFill();
    p5i.strokeWeight(2);
    p5i.stroke(this.networks[this.network].stroke);
    p5i.ellipse(0,0,this.d*2,this.d*2);
    p5i.pop();
  }

  this.recruitingWalk = function(){
    this.randomWalk(
      -1, 1, 0.5, p5i.destination[0][0]-this.d-300, p5i.destination[1][0],
      -1, 1, 0.5, p5i.destination[0][1]+this.d, p5i.destination[1][1]-this.d
    );
  } 


  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  }
}
