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
  this.state = "potential";

  var parent = this;
  this.states= {
    "potential":
      {
        logic:function(){parent.isSeeking()},
        move:function(){parent.potentialWalk()},
        color:p5i.color(255),
        stroke:p5i.color(255),
      },
    "seeking":
      {
        logic:function(){},
        move:function(){parent.seekingWalk()},  
        color:p5i.color(255,174,66,255),
        stroke:p5i.color(255),
      },
    "transit":
      {
        logic:function(){},
        move:function(){}, 
        color:p5i.color(255,174,66,255),
        stroke:p5i.color(200,255,255,255),
      },
    "employed":
      {
        logic:function(){},
        move:function(){},    
        color:p5i.color(255,174,66,255),
        stroke:p5i.color(0,0,255,255),
      }
  };


  this.update = function(){
    this.states[this.state].logic();
    this.states[this.state].move();
  }


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.strokeWeight(3);
    p5i.stroke(this.states[this.state].stroke);
    p5i.fill(this.states[this.state].color);
    p5i.ellipse(0,0,this.d,this.d);
    p5i.pop();
  }

  this.potentialWalk = function(){
    this.randomWalk(
      -3, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  } 


  this.isSeeking = function(){if(this.normalizedBool(0.000125))this.state = "seeking";}


  this.seekingWalk = function(){
    this.randomWalk(
      -1, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  } 


  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  }
}
