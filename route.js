/*
 * Route Instance
 *
 */

function Route (p5i, parent, pos, dir, length){
  this.pos = pos;
  this.dir = dir;
  this.dirInit = this.dir.copy();
  this.count = 0;
  this.l = length;


  this.show = function(){
    if(parent != null)p5i.line(this.pos.x,this.pos.y,parent.pos.x,parent.pos.y);
  }


  this.next = function(){
    var dirNext = p5.Vector.mult(this.dir,this.l);
    var posNext = p5.Vector.add(this.pos,dirNext);
    var routeNext = new Route(p5i,this,posNext,this.dir.copy(),this.l);
      return routeNext;
  }

  
  this.reset = function(){
    this.dir = this.dirInit.copy();
    this.count = 0;
  }

}
