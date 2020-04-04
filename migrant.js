/*
 * Migrant
 *
 */

function Migrant (p5i,xPos,yPos,xDir,yDir,diameter){

  this.pos = p5i.createVector(xPos,yPos);
  this.dir = p5i.createVector(xDir,yDir);
  this.d = diameter;
  this.normalizedBool = function(x){return p5i.random() <= x;} 
  this.exampleBoo = this.normalizedBool(0.5); 

  this.intermediaries = [];
  for(var i = 0; i < p5i.intermediaries.length; i++){
    this.intermediaries.push(false);
  }

  var parent = this;
  this.state = "potential";
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
        logic:function(){parent.hasFoundIntermediary()},
        move:function(){parent.seekingWalk()},  
        color:p5i.color(255,174,66,255),
        stroke:p5i.color(255),
      },
    "brokered":
      {
        logic:function(){parent.findEmployer()},
        move:function(){parent.brokeredWalk()}, 
        color:p5i.color(0,174,66,255),
        stroke:p5i.color(0,255,255,255),
      },
    "transit":
      {
        logic:function(){},
        move:function(){parent.transitWalk()}, 
        color:p5i.color(255,174,66,255),
        stroke:p5i.color(200,255,255,255),
        transitWalkCount:0
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
  };


  this.show = function(){
    p5i.push();
    p5i.translate(this.pos.x, this.pos.y);
    p5i.strokeWeight(3);
    p5i.stroke(this.states[this.state].stroke);
    p5i.fill(this.states[this.state].color);
    p5i.ellipse(0,0,this.d,this.d);
    p5i.pop();
  };


  this.potentialWalk = function(){
    this.randomWalk(
      -3, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  };


  this.isSeeking = function(){if(this.normalizedBool(0.00125))this.state = "seeking";} //0.000125


  this.seekingWalk = function(){
    this.randomWalk(
      -1, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  };


  this.hasFoundIntermediary = function(){
    for(var i = 0; i < p5i.intermediaries.length; i++){
      var intermediary = p5i.intermediaries[i];
      var d = p5.Vector.dist(this.pos,intermediary.pos);
      if(d < intermediary.dMin){
        this.state = "brokered";
        this.network = intermediary.network;
        this.path = new Path(p5i,this,this.pos,p5i.createVector(0,-1),this.network);
        break;
      }
    }
  };


  this.findEmployer = function(){this.path.grow();};
  
  
  this.brokeredWalk = function(){this.path.show();};


  this.transitWalk = function(){
    this.path.show();
    if(p5i.frameCount % 3 ==0){
      this.pos = this.path.routes[this.path.routes.length - 1 - this.states[this.state].transitWalkCount].pos;
      if(this.states[this.state].transitWalkCount != this.path.routes.length - 1)this.states[this.state].transitWalkCount++;
    } 
    p5i.push();
    p5i.stroke(this.states.transit.stroke);
    p5i.line(this.pos.x,this.pos.y,this.employer.pos.x,this.employer.pos.y);
    p5i.pop();
    if(this.states[this.state].transitWalkCount == this.path.routes.length -1){this.state = "employed"}
  }


  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  };
}
