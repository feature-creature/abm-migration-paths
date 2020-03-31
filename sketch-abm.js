/*
 * Migration Pathways ABM
 *
 */

let migrationPathwaysABM = p5i => {
  p5i.disableFriendlyErrors = true;

  var pause = false;
  var fr = 30;
  var wEnv = 600; //1920
  var hEnv = 600; //1080
  p5i.ticks = 300;
  

  var numOfMigrants = 30;
  p5i.migrants = [];
  p5i.origin = [[0,0],[wEnv/2,hEnv]];
  p5i.destination = [[wEnv/2,0],[wEnv,hEnv]];

  p5i.setup = function() {
    var canvas = p5i.createCanvas(wEnv, hEnv,p5i.P2D);
    canvas.mousePressed(p5i.pauseSketch);
    p5i.frameRate(fr);
    p5i.textSize(22);
    p5i.background(175);

    p5i.drawEnvironment();
    for(var i = 0; i < numOfMigrants; i++){
      p5i.migrants.push(
        new Migrant(p5i, p5i.random(p5i.origin[0][0]+15, p5i.origin[1][0]), p5i.random(p5i.origin[0][1]+15, p5i.origin[1][1]-15), 0, 0, 15)
      );
    };
  }


  p5i.draw = function() {
    p5i.drawEnvironment();
    for(var i = 0; i < p5i.migrants.length; i++){p5i.migrants[i].show();}
    for(var i = 0; i < p5i.migrants.length; i++){p5i.migrants[i].update();}
    p5i.drawLabels();
    p5i.isCompleted();
  }


  p5i.drawEnvironment = function(){
    p5i.background(175);
    p5i.push();
    p5i.line(p5i.origin[1][0],p5i.origin[0][1],p5i.origin[1][0],p5i.origin[1][1]);
    p5i.pop();
  }


  p5i.drawLabels = function(){
    p5i.push();
    p5i.stroke(0);
    p5i.text("Model",15,35);
    p5i.text(p5i.frameCount + "/" + p5i.ticks,15,55);
    p5i.pop();
  }


  p5i.pauseSketch = function(){
    pause = pause ? false : true;
    pause?p5i.noLoop():p5i.loop();
  }

  p5i.isCompleted = function(){if(p5i.frameCount>=p5i.ticks)p5i.noLoop();}
}


let abm = new p5(migrationPathwaysABM,'abm-main');
