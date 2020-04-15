/*
 * Employer Instance
 *
 */

function Employer (p5i,xPos,yPos,xDir,yDir,diameter,network){

  this.pos = p5i.createVector(xPos,yPos);
  this.dir = p5i.createVector(xDir,yDir);
  this.normalizedBool = function(x){return Math.random() <= x;} 
  this.exampleBoo = this.normalizedBool(0.5); 
  //this.network = p5i.random() <= 0.5 ? "a" : "b";
  this.network = network;
  this.hiring = true;
  this.harm = p5i.random();
  this.d = diameter;
  this.dWorkPlace = this.d*10;
  this.dMax = 350;
  this.dMin = 5;//20

  this.state = network;
  var parent = this;
  this.states = {
    "a" : {
      move:function(){parent.defaultWalk()},
      color:p5i.color(255,255,255),
      stroke:p5i.color(75,75,75)
    },
    "b" : {
      move:function(){parent.defaultWalk()},
      color:p5i.color(0,0,0),
      stroke:p5i.color(75,75,75)
    }
  };



  this.update = function(){}


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.stroke(0);
    p5i.fill(255,0,0,100);
    //p5i.fill(255,0,0,p5i.map(this.state,0,numOfEmployers+1,0,205));
    p5i.ellipse(0,0,this.dWorkPlace,this.dWorkPlace);

    p5i.noFill();
    p5i.strokeWeight(3);
    p5i.stroke(0,0,255);
    p5i.ellipse(0,0,this.d*2,this.d*2);
    
    p5i.fill(this.states[this.state].color);
    p5i.stroke(0);
    p5i.ellipse(0,0, this.d, this.d);
    p5i.pop();
 }


  this.defaultWalk = function(){
    this.randomWalk(
      -1, 1, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -1, 1, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  } 


  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  }
}
