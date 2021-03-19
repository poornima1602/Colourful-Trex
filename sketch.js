var trex,trexAnim,trexColl;
var backg,backgAnim;
var ground,groundImage;
var score;
var cloud,cloudImage;
var obstacle,obstacle1Img,obstacle2Img,obstacle3Img;
var sun,sunImage;
var gameOver,gameOverImage,restart,restartImage;
var score;
var PLAY=1;
var END=0;
var gameState=PLAY;
var cloudsGroup,obstaclesGroup;
var invisibleGround;
var collideSound,jumpSound;





function preload(){
  
  trexAnim=loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  backgAnim=loadImage("backgroundImg.png");
  groundImage=loadImage("ground.png");
  cloudImage=loadImage("cloud.png");
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  sunImage=loadImage("sun.png");
  obstacle1Img=loadImage("obstacle1.png");
  obstacle2Img=loadImage("obstacle2.png");
  obstacle3Img=loadImage("obstacle3.png");
  trexColl=loadImage("trex_collided.png");
  collideSound=loadSound("collided.wav");
  jumpSound=loadSound("jump.wav");
  
}





function setup(){
  createCanvas(windowWidth,windowHeight);
  
  ground=createSprite(width/2,height+25,width,10);
  ground.addImage(groundImage);
  ground.scale=1;
  ground.x=width/2
  ground.velocityX=-10 ;
  
  
  trex=createSprite(50,height-90,20,20);
  trex.addAnimation("running",trexAnim);
  trex.addImage("collided",trexColl);
  trex.scale=0.15;
  trex.setCollider("circle", 50, 0, 200);
 
  
  invisibleGround=createSprite(0,height-40,width,15);
  invisibleGround.collide(trex);  
  invisibleGround.visible=false;
  
  sun=createSprite(width-100,50);
  sun.addImage(sunImage);
  sun.scale=0.2;
  
  gameOver=createSprite(width/2,height/2);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart=createSprite(width/2,height/2+50);
  restart.addImage(restartImage);
  restart.scale=0.09;
  restart.visible=false; 
  
  score=0;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  
  
}




function draw(){
  background("lightblue");
  fill("black");
  textSize(20);
  textFont("waltograph");
  text("SCORE - "+score,10,30);
  
  
  console.log(trex.y)
  
 
  if(gameState === PLAY){
    
    ground.velocityX=-(10 + 3 *score/100);
       
    if(ground.x<0){
      ground.x=width/2;
    }
    
    score=score+Math.round(frameCount%3===0);
  
  
    spawnClouds();
    spawnObstacles();
    
     if(trex.isTouching(obstaclesGroup)){
    trex.changeAnimation("collided",trexColl);
    gameState=END;
    collideSound.play();
       trex.velocityY=0;
     } 
    
    
   if((touches.length>0 || keyDown("space") && trex.y>=height-180)){
     trex.velocityY=-5;
     touches;
   }    
    trex.velocityY=trex.velocityY+0.5;
  }
    
  else if(gameState === END){
    gameOver.visible=true;
    restart.visible=true;
    ground.velocityX=0;
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
  }
  
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
}


function spawnClouds(){
  if(frameCount % 100 === 0){
  cloud=createSprite(width,Math.round(random(height-600,130)));
  cloud.addImage(cloudImage);
   cloud.scale=0.5;
   cloud.velocityX=-(2 + 2 *score/100);
   cloud.lifeTime=300;
    cloudsGroup.add(cloud);
    cloudsGroup.setLifeTimeEach=300;
 }
}


function spawnObstacles(){
  if(frameCount % 60 === 0){
    obstacle=createSprite(width-10,height-80);
    obstacle.addImage(obstacle1Img);
    obstacle.velocityX=-(5+3*score/100);
    
    var rand=Math.round(random(1,2));
    switch(rand){
      case 1:obstacle.addImage(obstacle1Img);
        obstacle.scale=0.5;
        break;
        case 2: obstacle.addImage(obstacle2Img);
        obstacle.scale=0.5;
        break;
        case 3:obstacle.addImage(obstacle3Img);
        obstacle.scale=0.5 ;
      default:break;
    }
    obstaclesGroup.add(obstacle);
    obstaclesGroup.setLifeTimeEach=300;
    }
}
    
   function reset(){
     gameState=PLAY;
     obstaclesGroup.destroyEach();
     cloudsGroup.destroyEach();
     gameOver.visible=false;
     restart.visible=false;
     score=0;
     trex.changeAnimation("running",trexAnim)
     
   } 
 