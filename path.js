/*
 * Path Instance
 *
 */

function Path (p5i, migrant, pos, dir, network){

  this.pos = pos;
  this.dir = dir;
  this.network = network

  var initial = new Route(p5i,null,this.pos,this.dir,9); 
  var current = initial;
  this.routes = [];
  this.shortestRoute = [];
  this.routes.push(current);
  this.migrant = migrant;


  this.state = p5i.random() <= 0.5 ? "a" : "b";
  var parent = this;
  this.networks = {
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



  this.update = function(){
    this.states[this.state].move();
  };


  this.show = function(){
    p5i.push();
    p5i.noFill();
    p5i.strokeWeight(2);
    p5i.stroke(this.networks[this.network].color);
    migrant.state == "brokered"? p5i.beginShape(p5i.POINTS) : p5i.beginShape();
    //2
    for(var i = 0; i < this.routes.length; i++){p5i.vertex(this.routes[i].pos.x,this.routes[i].pos.y);}
    p5i.endShape();
    p5i.pop();
  };


  this.grow = function(network,employed){
    // look at each intermediary
    for(var i = 0; i < p5i.intermediaries.length; i++){
      
      // if this intermediary is in the same network as this migrant
      if(p5i.intermediaries[i].network == this.network && migrant.intermediaries[i] == false){

        var intermediary = p5i.intermediaries[i];
        var record = intermediary.dMax; 
        var closestRoute = null;
        
        // compare all the migrant's routes to this intermediary
        for(var j = 0; j < this.routes.length;j++){

          var route = this.routes[j]
          var d = p5.Vector.dist(intermediary.pos,route.pos);

          // if this route is within the intermediary's death diameter
          if(intermediary.dMin > d){
            //stop adding routes to the migrant's path in the direction of this intermediary
            closestRoute = null;
            // do not revisit the intermediary again
            migrant.intermediaries[i]=true;
            
            // if this intermediary is an employer, employ this migrant
            if(intermediary.hiring){
              migrant.employer = intermediary; 
              migrant.state = "transit";
            }
            break;

          // if this this route is within the intermediary's influence diameter
          // and is the closest route without entering the death diameter
          }else if(d < record){
            // identify this route the closest route to this intermediary
            record = d;
            closestRoute = route;
          }
        }

        // if a (closest) route is influenced by this intermediary
        if(closestRoute != null){
          // determine the next route's direction
          var nextDir = p5.Vector.sub(intermediary.pos,closestRoute.pos);
          // normalize this new direction to length 1
          nextDir.normalize();
          // add it to the closest route's direction
          closestRoute.dir.add(nextDir);
          // increase the closest route's count by 1
          closestRoute.count++;
        }

      }
    }

    // for any influenced branch add a new branch with the averaged direction
    // if its influecing intermediaries
    for(var i = this.routes.length - 1; i >= 0; i--){
      var route = this.routes[i];
      if(route.count > 0){
        route.dir.div(route.count + 1);
        this.routes.push(route.next());
        route.reset();
      }
    }

    if(migrant.state == "transit"){
      var eRecord = 10000;
      var employerRoute;
      var shortestPath = [];
      
      // find route that terminates at employer
      for(var i = this.routes.length -1; i > 0; i--){
        var ed = p5.Vector.dist(migrant.employer.pos,this.routes[i].pos);
        if(ed < eRecord){
          eRecord = ed;
          employerRoute = this.routes[i];
        }
      };

      // prune all alternative paths that do not lead to employer
      shortestPath.push(employerRoute);
      while(shortestPath[shortestPath.length-1].parent != null){
        shortestPath.push(shortestPath[shortestPath.length-1].parent);
      }
      this.routes = shortestPath;
    }
  };

}
