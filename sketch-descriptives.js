/*
 * Migration Pathways Descriptives
 *
 */

let migrationPathwaysDescriptives = p5i => {
  p5i.disableFriendlyErrors = true;

  var pause = false;
  var fr = 30;
  var wEnv = 600; //1920
  var hEnv = 200; //1080

  p5i.setup = function() {
    var canvas = p5i.createCanvas(wEnv, hEnv,p5i.P2D);
    //canvas.mousePressed(p5i.pauseSketch);
    p5i.frameRate(fr);
    p5i.textSize(22);
    p5i.background(175);

    p5i.drawEnvironment();
  }


  p5i.draw = function() {
    p5i.drawEnvironment();
    p5i.drawLabels();
  }


  p5i.drawEnvironment = function(){
    p5i.background(175);
    p5i.push();
    p5i.pop();
  }


  p5i.drawLabels = function(){
    p5i.push();
    p5i.stroke(0);
    p5i.text("Data",15,35);
    p5i.pop();
  }


  p5i.pauseSketch = function(){
    pause = pause ? false : true;
    pause?p5i.noLoop():p5i.loop();
  }

}


let descriptives = new p5(migrationPathwaysDescriptives,'abm-data');
