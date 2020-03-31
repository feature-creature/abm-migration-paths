/*
 * Migrant
 *
 */

function Migrant (p5i,xPos,yPos,xDir,yDir,diameter){

  this.pos = p5i.createVector(xPos,yPos);
  this.dir = p5i.createVector(xDir,yDir);
  this.d = diameter;
  this.colorStroke = p5i.color(0,0,0,255);
  this.colorFill = p5i.color(255,255,255,255);
  this.normalizedBool = function(x){return p5i.random() <= x;} 
  this.exampleBoo = this.normalizedBool(0.5); 

  this.update = function(){
   this.potentialWalk();
   //this.seekingWalk();
  }


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.strokeWeight(3);
    p5i.stroke(this.colorStroke);
    p5i.fill(this.colorFill);
    p5i.ellipse(0,0,this.d,this.d);
    p5i.pop();
  }

  this.potentialWalk = function(){
    this.randomWalk(
      -3, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d,
    );
  } 

  this.seekingWalk = function(){
    this.randomWalk(
      -1, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d,
    );
  } 

  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  }
}
