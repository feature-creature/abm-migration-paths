/*
 * Migrant
 *
 */

function Migrant (p5i,xPos,yPos,xDir,yDir,diameter){
  this.pos = p5i.createVector(xPos,yPos);
  this.d = diameter;
  this.state = "potential";


  this.employers= [];
  this.intermediaries = [];
  for(var i = 0; i < p5i.employers.length; i++)this.employers.push(false);
  for(var i = 0; i < p5i.intermediaries.length; i++)this.intermediaries.push(false);


  var parent = this;
  this.states= {
    "potential":{
      logic:function(){parent.isSeeking()},
      move:function(){parent.potentialWalk()},
      color:p5i.color(255,200,100),
      stroke:p5i.color(255),
    },
    "seeking":{
      logic:function(){parent.hasFoundIntermediary()},
      move:function(){parent.seekingWalk()},  
      color:p5i.color(255),
      stroke:p5i.color(255),
    },
    "brokered":{
      logic:function(){parent.findEmployer()},
      move:function(){parent.brokeredWalk()}, 
      color:p5i.color(0,174,66,255),
      stroke:p5i.color(0,255,255,255),
      strokeWeight:3,
    },
    "transit":{
      logic:function(){},
      move:function(){parent.transitWalk()}, 
      color:p5i.color(255,174,66,255),
      stroke:p5i.color(200,255,255,255),
      strokeWeight:2,
      transitWalkCount:0,
    },
    "employed":{
      logic:function(){parent.work()},
      move:function(){parent.employedWalk()},    
      color:p5i.color(255,174,66,255),
      stroke:p5i.color(0,0,255,255),
      strokeWeight:2,
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


  // potential -------------------

  this.isSeeking = function(){if(this.normalizedBool(0.000125)) this.state = "seeking";}
  
  this.potentialWalk = function(){
    this.randomWalk(
      -3, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  };


  // seeking -------------------

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

  this.seekingWalk = function(){
    this.randomWalk(
      -1, 3, 0.5, p5i.origin[0][0]+this.d, p5i.origin[1][0],
      -3, 3, 0.5, p5i.origin[0][1]+this.d, p5i.origin[1][1]-this.d
    );
  };


  // brokered -------------------

  this.findEmployer = function(){this.path.update();};
  
  this.brokeredWalk = function(){this.path.show();};


  // transit -------------------

  this.transitWalk = function(){
    this.path.show();

    this.pos = this.path.steps[this.path.steps.length - 1 - this.states[this.state].transitWalkCount].pos;
    p5i.push();
    p5i.stroke(this.states.transit.stroke);
    p5i.line(this.pos.x,this.pos.y,this.employer.pos.x,this.employer.pos.y);
    p5i.pop();

    
    if(this.states[this.state].transitWalkCount != this.path.steps.length - 1)this.states[this.state].transitWalkCount++;//1
    if(this.states[this.state].transitWalkCount == this.path.steps.length - 1){this.state = "employed"}
  }

  // employed -------------------

  this.work = function(){
    xTest = this.pos.x;
    xTest += p5i.random() >= 0.5 ? 3 :-3;
    yTest = this.pos.y;
    yTest += p5i.random() >= 0.5 ? 3 : -3;
    var posTest = p5i.createVector(xTest,yTest);
    var d = p5.Vector.dist(posTest,this.employer.pos);
    if(d < this.employer.dWorkPlace/2 && d > this.employer.d*2)this.pos.x = posTest.x;
    if(d < this.employer.dWorkPlace/2 && d > this.employer.d*2)this.pos.y = posTest.y;
  }

  this.employedWalk = function(){
    this.path.show();
    this.show();
  };


  this.normalizedBool = function(x){return p5i.random() <= x;} 

  this.randomWalk = function(xStepMin,xStepMax,xSpread,xMin,xMax,yStepMin,yStepMax,ySpread,yMin,yMax){
    nextMove = this.pos.copy().add(p5i.random() >= xSpread ? xStepMin : xStepMax,p5i.random() >= ySpread ? yStepMin : yStepMax);
    if((nextMove.x >= xMin && nextMove.x <= xMax) && (nextMove.y >= yMin && nextMove.y <= yMax))this.pos = nextMove;
  };
  
}
