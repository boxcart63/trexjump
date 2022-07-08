var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var abletojump=true;
var counter=0;
var shouldcount=false;
var fakeground; 
var frame=0
var frame2=0
var score=0
var speed=1
var gamestate="normal"
var obstacles
var clouds
var coins2
var coincount=0
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudImage= loadImage("cloud.png")
  coinImage= loadImage("realcoin.png")
  obstacles_images1= loadImage("obstacle1.png")
  obstacles_images2= loadImage("obstacle2.png")
  obstacles_images3= loadImage("obstacle3.png")
  obstacles_images4= loadImage("obstacle4.png")
  obstacles_images5= loadImage("obstacle5.png")
  obstacles_images6= loadImage("obstacle6.png")
  restart=loadImage("restart.png")
  game_over=loadImage("gameOver.png")
  jump=loadSound("jump.wav")
  bonuspointsound=loadSound("bonus.wav")
  losesound=loadSound("lose.wav")
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  obstacles=createGroup()
  //create a trex sprite
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("ded",trex_collided);
  fakeground= createSprite(300,190,600,10)
  fakeground.visible=false;
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50
  clouds=createGroup()
  coins2=createGroup()
  realgameover=createSprite(width/2,100,20,20)
  realgameover.addAnimation("ok",game_over)
  realrestart=createSprite(width/2,150,20,20)
  realrestart.addAnimation("ok",restart)
  //create ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width/2+200;

  //fake2= createSprite(300,20,600,100);
}
function draw() {
  
  background("white")
  if(score%100 == 0 &&!bonuspointsound.isPlaying()){
    bonuspointsound.play()
    console.log(1)
  }
  if(gamestate=="death"){
    speed=0
    obstacles.setVelocityXEach(0)
    clouds.setVelocityXEach(0)
    coins2.setVelocityXEach(0)
    obstacles.setLifetimeEach(-1)
    clouds.setLifetimeEach(-1)
    coins2.setLifetimeEach(-1)
    trex.changeAnimation("ded")
    realgameover.visible=true
    realrestart.visible=true
    if(keyDown("r")){
      obstacles.destroyEach()
      clouds.destroyEach()
      gamestate="normal"
      speed=1
      score=0
      coincount=0
    }
  }
  if(gamestate=="normal"){
    score+=0.5
    obstacle()
    coins()
    speed+=0.002
    cloud()
    realgameover.visible=false
    realrestart.visible=false
    trex.changeAnimation("running")
 
     

    if (ground.x<0){
      ground.x = ground.width/2;
    }
  
  
    if(trex.isTouching(fakeground)){
      abletojump=true;
    }

   
  
 //s top trex from falling down 
 
  //trex.collide(fake2)
  if(counter>10){
    counter=0;
    abletojump=false;
    shouldcount=false
   }



    if(shouldcount){
      counter++;
      if(abletojump){
        trex.velocityY= -counter;

      }
    } else{
      counter=0;
      
    }


  
  
  }
  trex.velocityY = trex.velocityY + 0.8
  text("score:"+Math.round(score),50,20)
  text("coins:"+coincount,50,60)
  trex.collide(fakeground);
  drawSprites();
  console.log(gamestate)
  ground.velocityX = -5*speed
  
}

function keyReleased(){
  if(keyCode==32){
    abletojump=false
    shouldcount=false;
    
  }
}

function keyPressed(){
  
  //jumping the trex on space key press
  if(keyCode==32 ) {
    jump.play()
    if(counter<10 && abletojump){
      shouldcount=true;
    }
  }
  
}

function cloud(){
  frame+=1
  
  if(frame==60){
    frame=0
    cloud1=createSprite(windowWidth,random(10,100),50,50)
    cloud1.velocityX=random(-10,-5)*speed
    cloud1.addImage("cloud",cloudImage)
    cloud1.lifetime=width/10*speed
    cloud1.depth=trex.depth-1
    clouds.add(cloud1)
  }
}
function coins(){
  frame2+=1
  if(frame2==600){
    frame2=0
    coins1=createSprite(windowWidth,100,50,50)
    coins1.velocityX=-15*speed
    coins1.addImage("coin",coinImage)
    coins1.scale=0.125
    coins1.lifetime=15*speed*windowWidth
    coins2.add(coins1)
  }
  if(coins2.isTouching(trex)){
    bonuspointsound.play()
    coins2.destroyEach()
    coincount+=1
  }
}
function obstacle(){
  if(frameCount%60==0){
  obstacle1=createSprite(windowWidth,160,50,50)
  obstacle1.velocityX=-5*speed
  switch(Math.round(random(1,7))){
    case 1:
      obstacle1.addImage("okobstacle1",obstacles_images1)
    break;
    case 2:
      obstacle1.addImage("okobstacle2",obstacles_images2)
    break;
    case 3:
      obstacle1.addImage("okobstacle3",obstacles_images3)
    break;
    case 4:
     obstacle1.addImage("okobstacle4",obstacles_images4)
    break;
    case 5:
      obstacle1.addImage("okobstacle5",obstacles_images5)
    break;
    case 6:
     obstacle1.addImage("okobstacle6",obstacles_images6)
    break;
    case 7:
      obstacle1.addImage("okobstacle1",obstacles_images1)
  }
  obstacle1.scale=0.5
  obstacle1.lifetime=5*speed*width
  obstacles.add(obstacle1)

}
if (obstacles.isTouching(trex)){
  losesound.play()
  gamestate="death"
}
}


