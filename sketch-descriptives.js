/*
 * Migration Pathways Descriptives
 *
 */

let migrationPathwaysDescriptives = p5i => {
  p5i.disableFriendlyErrors = true;

  var pause = false;
  var fr = 30;
  var wEnv = 1920;
  var hEnv = 200;

  p5i.setup = function() {
    var canvas = p5i.createCanvas(wEnv, hEnv,p5i.P2D);
    p5i.frameRate(fr);
    p5i.textSize(22);
    p5i.background(175);
    p5i.drawEnvironment();
  }


  p5i.draw = function() {
    p5i.drawEnvironment();
    p5i.drawTrendlines();
    p5i.drawLabels();
    if(abm.logMigrantStates.length == abm.ticks)p5i.noLoop();
  }


  p5i.drawEnvironment = function(){
    p5i.background(175);
    p5i.push();
    p5i.pop();
  }


  p5i.drawLabels = function(){
    p5i.push();
      p5i.textAlign(p5i.LEFT);
      p5i.translate(5,0);
      p5i.text("0",0,hEnv-7);
      p5i.text(abm.migrants.length,0,hEnv-140);
      p5i.textAlign(p5i.RIGHT);
      p5i.text(abm.logMigrantStates.length +" / "+abm.ticks,wEnv-12,hEnv-7);
    p5i.pop();
    
    p5i.push();
    p5i.fill(165);
    p5i.rect(0,0,wEnv,35);
    p5i.pop();
    p5i.push();
      p5i.textAlign(p5i.RIGHT);
      p5i.translate(0,25);
      p5i.push();
        p5i.translate(253,0);
        p5i.text(abm.logMigrantStates[abm.logMigrantStates.length-1][0] + " Potential Migrants", 0, 0);
        p5i.stroke(255);
        p5i.fill(255);
        p5i.ellipse(17,-8,15,15);
      p5i.pop();
      p5i.push();
        p5i.translate(wEnv * 0.4,0);
        p5i.text(abm.logMigrantStates[abm.logMigrantStates.length-1][1] + " Seeking Migrants", 0, 0);
        p5i.strokeWeight(3);
        p5i.stroke(255);
        p5i.fill(255,174,66);
        p5i.ellipse(17,-8,15,15);
      p5i.pop();
      p5i.push();
        p5i.translate(wEnv * 0.7,0);
        p5i.text(abm.logMigrantStates[abm.logMigrantStates.length-1][2] + " Transit Migrants", 0, 0);
        p5i.strokeWeight(3);
        p5i.stroke(200,255,255);
        p5i.fill(255,174,66);
        p5i.line(17, -8, 37, -8);
        p5i.ellipse(17,-8,15,15);
      p5i.pop();
      p5i.push();
        p5i.translate(wEnv - 35,0);
        p5i.text(abm.logMigrantStates[abm.logMigrantStates.length-1][3] + " Employed Migrants", 0, 0);
        p5i.strokeWeight(3);
        p5i.stroke(0,0,255);
        p5i.fill(255,174,66);
        p5i.ellipse(17,-8,15,15);
      p5i.pop();
    p5i.pop();
  }


  p5i.drawTrendlines = function(){
    p5i.push();
      p5i.translate(10,hEnv-35);
      p5i.line(-2,0,-2,-95);
      p5i.line(-2,2,wEnv-20,2);
      //---
      p5i.push();
        p5i.fill(abm.migrants[0].states.employed.stroke);
        p5i.noStroke();
        p5i.beginShape();
        p5i.vertex(0,-95);
        for(var i = 0; i < abm.logMigrantStates.length;i++){
          p5i.vertex((wEnv-20)/abm.ticks*(i+1), p5i.map(abm.logMigrantStates[i][0],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][1],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][2],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][3],0,abm.migrants.length,0,-95));
        }
        p5i.vertex((wEnv-20)/abm.ticks*(i), 0);
        p5i.vertex(0,0);
        p5i.endShape(p5i.CLOSE);
      p5i.pop();
      //---
      p5i.push();
        p5i.fill(abm.migrants[0].states.transit.stroke);
        p5i.noStroke();
        p5i.beginShape();
        p5i.vertex(0,-95);
        for(var i = 0; i < abm.logMigrantStates.length;i++){
          p5i.vertex((wEnv-20)/abm.ticks*(i+1), p5i.map(abm.logMigrantStates[i][0],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][1],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][2],0,abm.migrants.length,0,-95));
        }
        p5i.vertex((wEnv-20)/abm.ticks*(i), 0);
        p5i.vertex(0,0);
        p5i.endShape(p5i.CLOSE);
      p5i.pop();
      //---
        p5i.push();
        p5i.fill(abm.migrants[0].states.seeking.color);
        p5i.noStroke();
        p5i.beginShape();
        p5i.vertex(0,-95);
        for(var i = 0; i < abm.logMigrantStates.length;i++){
          p5i.vertex((wEnv-20)/abm.ticks*(i+1), p5i.map(abm.logMigrantStates[i][1],0,abm.migrants.length,0,-95) + p5i.map(abm.logMigrantStates[i][0],0,abm.migrants.length,0,-95));
        }
        p5i.vertex((wEnv-20)/abm.ticks*(i), 0);
        p5i.vertex(0,0);
        p5i.endShape(p5i.CLOSE);
      p5i.pop();
      //---
      p5i.push();
        p5i.fill(abm.migrants[0].states.potential.color);
        p5i.noStroke();
        p5i.beginShape();
        p5i.vertex(0,-95);
        for(var i = 0; i < abm.logMigrantStates.length;i++){
          p5i.vertex((wEnv-20)/abm.ticks*(i+1), p5i.map(abm.logMigrantStates[i][0],0,abm.migrants.length,0,-95));
        }
        p5i.vertex((wEnv-20)/abm.ticks*(i), 0);
        p5i.vertex(0,0);
        p5i.endShape(p5i.CLOSE);
      p5i.pop();
    p5i.pop();
  }


  p5i.pauseSketch = function(){
    pause = pause ? false : true;
    pause?p5i.noLoop():p5i.loop();
  }

}


let descriptives = new p5(migrationPathwaysDescriptives,'abm-data');
