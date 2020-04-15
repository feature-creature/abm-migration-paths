/*
 * Migration Pathways ABM
 *
 */

let migrationPathwaysABM = p5i => {
  p5i.disableFriendlyErrors = true;

  p5i.ticks = 3000;
  var pause = true;
  var fr = 60;
  var wEnv = 1920;//1920;
  var hEnv = 1080;//1080;
  

  p5i.migrants = [];
  var numOfMigrants = 200;//200;
  var migrantDiameter = 15;

  p5i.intermediaries = [];
  var numOfIntermediaries = 90;//90;
  var intermediaryDiameter = 15;
  
  p5i.employers = [];
  var numOfEmployers = 4;
  var employerDiameter = 15;

  p5i.logMigrantStates = [];

  p5i.origin = [[0,0],[wEnv/2,hEnv]];
  p5i.destination = [[wEnv/2,0],[wEnv,hEnv]];

  p5i.setup = function() {
    var canvas = p5i.createCanvas(wEnv, hEnv,p5i.P2D);
    canvas.mousePressed(p5i.pauseSketch);
    p5i.frameRate(fr);
    p5i.textSize(22);
    p5i.background(175);

    p5i.drawEnvironment();
    p5i.initEmployers();
    p5i.initIntermediaries();
    p5i.initMigrants();
    p5i.noLoop();
  }


  p5i.draw = function() {
    p5i.drawEnvironment();
    for(var i = 0; i < p5i.employers.length; i++){p5i.employers[i].update();}
    for(var i = 0; i < p5i.intermediaries.length; i++){p5i.intermediaries[i].update();}
    for(var i = 0; i < p5i.migrants.length; i++){p5i.migrants[i].update();}

    for(var i = 0; i < p5i.employers.length; i++){p5i.employers[i].show();}
    for(var i = 0; i < p5i.intermediaries.length; i++){p5i.intermediaries[i].show();}
    for(var i = 0; i < p5i.migrants.length; i++){p5i.migrants[i].show();}
    p5i.drawLabels();
    p5i.logStates();
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
    p5i.textAlign(p5i.CENTER);
    p5i.text("ORIGIN",wEnv*0.25,50);
    p5i.text("DESTINATION",wEnv*0.75,50);
    //p5i.text(p5i.frameRate(),15,77);
    p5i.pop();
  }


  p5i.pauseSketch = function(){
    pause = pause ? false : true;
    pause?p5i.noLoop():p5i.loop();
  }


  p5i.isCompleted = function(){if(p5i.frameCount>=p5i.ticks)p5i.noLoop();}


  p5i.logStates = function(){
    var totals = {"potential":0,"seeking":0,"brokered":0,"transit":0,"employed":0,};
    for(var i = 0; i < p5i.migrants.length; i++){totals[p5i.migrants[i].state]++;}
    p5i.logMigrantStates.push(totals);
  }

  
  p5i.initEmployers = function(){
    for(var i = 0; i < numOfEmployers; i++){
      var networkTemp = (i+1)/numOfEmployers <= 0.5? "a" : "b";
      var validLocation = false;

      while(validLocation == false){
        validLocation = true;
        var posTest = p5i.createVector(
          p5i.random(p5i.destination[0][0] *1.75, p5i.destination[1][0]-(employerDiameter*5)),
          p5i.random(p5i.destination[0][1]+(employerDiameter*5), p5i.destination[1][1]-(employerDiameter*5))
        );
        for(var j = 0; j < p5i.employers.length;j++)if(p5.Vector.dist(posTest,p5i.employers[j].pos) < employerDiameter*10)validLocation = false;
      }

      p5i.employers.push(new Employer(p5i, posTest.x, posTest.y, 0, 0, intermediaryDiameter,networkTemp));
    }
  }


  p5i.initIntermediaries = function(){
    for(var i = 0; i < numOfIntermediaries; i++){
      var validLocation = false;

      while(validLocation == false){
        validLocation = true;
        var posTest = p5i.createVector(
          p5i.random(p5i.destination[0][0]*0.7 - intermediaryDiameter, p5i.destination[1][0]*0.9), 
          p5i.random(p5i.destination[0][1]+intermediaryDiameter, p5i.destination[1][1]-intermediaryDiameter)
        );
        for(var j = 0; j < p5i.employers.length;j++)if(p5.Vector.dist(posTest,p5i.employers[j].pos) < employerDiameter*5)validLocation = false;
      }

      p5i.intermediaries.push(new Intermediary(p5i, posTest.x,posTest.y, 0, 0, intermediaryDiameter));
    }
  }


  p5i.initMigrants = function(){
   for(var i = 0; i < numOfMigrants; i++){
    p5i.migrants.push(
      new Migrant(p5i, 
        p5i.random(p5i.origin[0][0]+migrantDiameter, p5i.origin[1][0]), 
        p5i.random(p5i.origin[0][1]+migrantDiameter, p5i.origin[1][1]-migrantDiameter), 
        0, 0, migrantDiameter)
      );
    }
  }


}


let abm = new p5(migrationPathwaysABM,'abm-main');
