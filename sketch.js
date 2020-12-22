var PLAY = 1;

var END = 0;

var gameState = PLAY;

var jungle, jungleimage;

var monkey, running_monkey;

var banana, bananaimage;

var obstacle, obstacleimage;

var invisibleGround;

var obstacleGroup;

var Bananagroup;

var survivalTime;

var Score;

var restart, restartimage;

var gameover, gameoverimage;

var gunshotSound;

var synthradiotuning;

function preload(){
  
  jungleimage = loadImage("jungle.PNG");
  
  moving_monkey = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png");
  
  bananaimage = loadImage("banana.png");
  
  obstacleimage = loadImage("obstacle.png");
  
  restartimage = loadImage("restart.png");
  
  gameoverimage = loadImage("gameover.PNG");
  
  gunshotSound = loadSound("gunshot.mp3");
  
  synthradiotuningSound = loadSound("synthradiotuning.mp3");
 
}

function setup() {
  
   createCanvas(680,315);
  
    jungle = createSprite(100,9);
    jungle.addImage("jungleimage",jungleimage);
    jungle.scale = 2;
    jungle.velocityX = -8;
  
    monkey = createSprite(125, 270);
    monkey.addAnimation("moving_monkey", moving_monkey); 
    monkey.scale = 0.1; 
    monkey.velocityY = -9;
  
    invisibleGround = createSprite(170,304,300,10);
    invisibleGround.visible = false;
  
    restart = createSprite(340, 160);
    restart.addImage("restartimage",restartimage);
    restart.scale = 0.1;
  
    gameover = createSprite(340, 100);
    gameover.addImage("gameoverimage", gameoverimage);
    gameover.scale = 0.1;
  
    obstacleGroup = createGroup();
  
    bananaGroup = createGroup();
  
   survivalTime = 0;
  
   Score = 0;
  
}


function draw() {
  
  Obstaclegroup();
  
  Bananagroup();

    background(rgb(900,500,700));
  
    if(gameState === PLAY){
    
      gameover.visible = false;
      
      restart.visible = false;
      
    jungle.velocityX = -9;
      
    jungle.velocityX = -(2 + 3* survivalTime/500)
    
  //scoring
   survivalTime=survivalTime+Math.round(frameCount / 50);
  
    if (jungle.x < 0){
      jungle.x = jungle.width/4.5;
    }
    
    if(keyDown("space") && monkey.y >= 250){
     monkey.velocityY = -12;
     gunshotSound.play();
   } 
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      Score = Score + 1;
   }
      
  }
  
   //add gravity 
    monkey.velocityY = monkey.velocityY + 0.5;
    
  //stop monkey from falling
     monkey.collide(invisibleGround);
  
    if(obstacleGroup.isTouching(monkey)){
       gameState = END;
      synthradiotuningSound.play();
    }
  
  else if(gameState === END){
    
    gameover.visible = true;
    
    restart.visible = true;
    
    jungle.velocityX = 0;
    
    monkey.velocityY = 0;
    
     obstacleGroup.setLifetimeEach(0);
     bananaGroup.setLifetimeEach(0);
       
       obstacleGroup.setVelocityEach(0);
       
       bananaGroup.setVelocityEach(0);
    
     if(mousePressedOver(restart)){
       reset();
     }

  }
  

  drawSprites();
  
  textSize(22);
  fill("orange");
  text("Score : " + Score, 300, 50);
  
  textSize(22);
  fill("red");
  text("Survival Time : " + survivalTime, 450, 50);
  
}

function Obstaclegroup(){
  
  if(frameCount % 70 === 0){
    var obstacle = createSprite(340, 280, 10, 10);
    obstacle.x = Math.round(random(600,400));
obstacle.addImage("obstacleimage", obstacleimage);
    obstacle.velocityX = -6;
  
  //assign scale and lifetime to the obstacle
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
  
  //add each obstacle to the group
    obstacleGroup.add(obstacle);
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function Bananagroup(){
  
  if(frameCount % 60 === 0){
    var banana = createSprite(10, 95, 10, 10);
    banana.x = Math.round(random(600,100));
    banana.addImage("bananaimage",bananaimage);
    banana.velocityX = -6;
    
    //assign scale and lifetime to the banana
    banana.scale = 0.1;
    banana.lifetime = 100;
    
    //add each obstacle to the group
      bananaGroup.add(banana);
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
  }
}

function reset(){
    gameState = PLAY;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survivalTime = 0;
    Score = 0;
    jungle.velocityX = 0;
}
