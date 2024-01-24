
/*created by prashant shukla */

var paddle2 =10,paddle1=10;

var paddle1X = 5,paddle1Height = 110;
var paddle2Y = 685,paddle2Height = 70;

var score1 = 0, score2 =0;
var paddle1Y;

var  playerscore =0;
var audio1;
var pcscore =0;
//ball x and y and speedx speed y and radius
var ball = {
    x:350/2,
    y:480/2,
    r:20,
    dx:3,
    dy:3
}
var V;
var M;
var RU=null;
var P="F";
var RS="F";
var Y;
var BT;
var MM;
function PBC(){
  P="T";
  document.getElementById("SB").innerHTML="Status: Playing Game!";
}
function RST(){
  pcscore=0;
  playerscore=0;
  reset();
}
function preload(){
  BT=loadSound("ball_touch_paddel.wav");
  MM=loadSound("missed.wav");
}
function setup(){
  var canvas =  createCanvas(700,600);
  canvas.parent('CC');
  V= createCapture(VIDEO);
  V.hide();
  V.size(700, 600);
  M= ml5.poseNet(V, ML);
  M.on("pose", GR);
  document.getElementById("SB").innerHTML="Status: Click Play!";
}


function draw(){

 background(0);
 image(V, 0, 0, 700, 600);

 fill("white");
 stroke("white");
 //rect(680,0,20,700);

 fill("white");
 stroke("white");
 //rect(0,0,20,700);
 if (RU!=null && RU[0].pose.rightWrist.confidence>0.1){
  Y=RU[0].pose.rightWrist.y-100;
  console.log(Y)
 }
   //funtion paddleInCanvas call 
   paddleInCanvas();
 
   //left paddle
   fill("blueviolet");
    stroke("blueviolet");
    strokeWeight(0.5);
   paddle1Y = Y; 
   rect(paddle1X,Y,paddle1,paddle1Height,100);
   
   
    //pc computer paddle
    fill("white");
    stroke("white");
   var paddle2y =ball.y-paddle2Height/2;  rect(paddle2Y,paddle2y,paddle2,paddle2Height,100);
   if(P=="T"){ 
    //function midline call
    midline();
    
    //funtion drawScore call 
   drawScore();
   
   //function models call  
   models();
   
   //function move call which in very important
    move();
}
}



//function reset when ball does notcame in the contact of padde
function reset(){
   ball.x = width/2+100,
   ball.y = height/2+100;
   ball.dx=3;
   ball.dy =3;
   
}


//function midline draw a line in center
function midline(){
    for(i=0;i<700;i+=10) {
    var y = 0;
    fill("white");
    stroke("white");
    rect(width/2,y+i,10,480);
    }
}


//function drawScore show scores
function drawScore(){
    textAlign(CENTER);
    textSize(20);
    fill("white");
    stroke("white")
    text("Player:",100,50)
    text(playerscore,140,50);
    text("Computer:",500,50)
    text(pcscore,555,50)
}


//very important function of this game
function move(){
   fill("white");
   stroke("white");
   strokeWeight(0.5);
   ellipse(ball.x,ball.y,ball.r,20)
   ball.x = ball.x + ball.dx;
   ball.y = ball.y + ball.dy;
   if(ball.x+ball.r>width-ball.r/2){
       ball.dx=-ball.dx-0.5;       
   }
  if (ball.x-2.5*ball.r/2< 0){
  if (ball.y >= paddle1Y&& ball.y <= paddle1Y + paddle1Height) {
    ball.dx = -ball.dx+0.5;
    playerscore++;
    BT.play();
  }
  else{
    pcscore++;
    reset();
    navigator.vibrate(100);
    MM.play();
  }
}
if(pcscore ==4){
    fill("#FFA500");
    stroke(0)
    rect(0,0,width,height-1);
    fill("white");
    stroke("white");
    textSize(25)
    text("Game Over!☹☹",width/2,height/2);
    text("Restart the game!",width/2,height/2+30)
}
   if(ball.y+ball.r > height || ball.y-ball.r <0){
       ball.dy =- ball.dy;
   }   
}


//width height of canvas speed of ball 
function models(){
    textSize(18);
    fill(255);
    noStroke();
    text("Width:"+width,135,15);
    text("Speed:"+abs(ball.dx),50,15);
    text("Height:"+height,235,15);
}


//this function help to not go te paddle out of canvas
function paddleInCanvas(){
  if(mouseY+paddle1Height > height){
    mouseY=height-paddle1Height;
  }
  if(mouseY < 0){
    mouseY =0;
  }  
}
function ML(){
  console.log("model loaded!");
}
function GR(R,E){
  console.log(R);
  RU=R;
}