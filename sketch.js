//Game States
var PLAY=1;
var END=0;
var WIN = 2;
var START = 3
var gameState=3;

var knife,fruit ,monster,fruitGroup,monsterGroup, score,r,randomFruit, position;
var knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;
var appleG, bananaG, pearG, orangeG, apple, banana, orange, pear;
var knifeSwoosh, gameOver, checkpoint;

function preload(){
  
  knifeImage = loadImage("knife.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")

  //load sound here
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
  checkpointSound = loadSound("checkpoint.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  fruitGroup=createGroup();
  monsterGroup=createGroup();
  appleG=createGroup();
  orangeG=createGroup();
  pearG=createGroup();
  bananaG=createGroup();

}

function draw() {
  background("lightblue");
  
  if(gameState === START){
   
    textSize(18);
    fill("black");
    text("Press space to start, get 30 points to win!", 120, 250);
    text("How to Play: Cut fruits and gain points, but avoid the little monster!", 30, 300);
    text("Apples give 4 points, oranges give 3, pears give 2 and bananas give 1", 10, 350)

  }

  if(keyWentDown("space") && gameState == START){
    gameState = PLAY;
  }
  if(gameState===PLAY){
    
    textSize(18);
    fill("black");

    //Call fruits and Monster function
    fruits();
    Monster();
    
    // Move sword with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(appleG.isTouching(knife)){
      appleG.destroyEach();
      score += 4;
     // the sound doesnt work, it says some ScriptProcessorNode error in the console, im not sure how to fix it
      knifeSwooshSound.play();

    }
    else if(bananaG.isTouching(knife)){
      bananaG.destroyEach();
      score += 1;
     
      knifeSwooshSound.play();

    }
    else if(pearG.isTouching(knife)){
      pearG.destroyEach();
      score += 2;
     
      knifeSwooshSound.play();

    }
    else if(orangeG.isTouching(knife)){
      orangeG.destroyEach();
      score += 3;
      
      knifeSwooshSound.play();

    }
    else
    {
      // Go to end state if sword touching enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        //add gameover sound here
        gameOverSound.play();

        appleG.destroyEach();
        orangeG.destroyEach();
        pearG.destroyEach();
        bananaG.destroyEach();
        monsterGroup.destroyEach();

        appleG.setVelocityXEach(0);
        orangeG.setVelocityXEach(0);
        pearG.setVelocityXEach(0);
        bananaG.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        knife.addImage(gameOverImage);
        knife.scale=2;
        knife.x=300;
        knife.y=300;
      }
    }
  } 

  if(score >= 30){
    gameState = WIN;
  }

  if(gameState == WIN){
    
    appleG.destroyEach();
    orangeG.destroyEach();
    pearG.destroyEach();
    bananaG.destroyEach();
    monsterGroup.destroyEach();
   
    appleG.setVelocityXEach(0);
    orangeG.setVelocityXEach(0);
    pearG.setVelocityXEach(0);
    bananaG.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);

    textSize(25);
    fill('black');
    text("You Win!", 260, 300);

  }
  
  drawSprites();

  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function spawnApples(){
if(World.frameCount%60 === 0){
  
  apple = createSprite(400, 200, 20, 20);
  apple.addAnimation("fruits", fruit2);
  
  apple.y = Math.round(random(100, 550));
 
  apple.velocityX = -7;

  if(score % 4 === 0){
    apple.velocityX -= 10;
  } else {
    apple.velocityX -= 9;
  }
 
  apple.setLifetime = 50;
  
  appleG.add(apple);
  
  apple.scale = 0.3;

  appleG.setVelocityXEach(-10);


}
}

function spawnOranges(){
  
  if(World.frameCount%60 === 0){
    
    orange = createSprite(400, 200, 20, 20);
    orange.addAnimation("fruits", fruit1);
    
    orange.y = Math.round(random(100, 550));
    
    orange.velocityX = -6;
    
    if(score % 4 === 0){
      orange.velocityX -= 9;

    } else {
      orange.velocityX -= 8;
    }

    orange.setLifetime = 50;
    
    orangeG.add(orange);
    
    orange.scale = 0.3;
   
    orangeG.setVelocityXEach(-8);
  
  }
  }

  function spawnPear(){
  
    if(World.frameCount%60 === 0){
      
      pear = createSprite(400, 200, 20, 20);
      pear.addAnimation("fruits", fruit3);
      
      pear.y = Math.round(random(100, 550));
      
      pear.velocityX = -5;
     
      if(score % 4 === 0){
        pear.velocityX -= 8;
      } else {
        pear.velocityX -= 7;
      }
      pear.setLifetime = 50;
      
      pearG.add(pear);
      
      pear.scale = 0.3;

      pearG.setVelocityXEach(-9);
    
    }
    }

  function spawnBanana(){
  
     if(World.frameCount%60 === 0){
       
      banana = createSprite(400, 200, 20, 20);
      banana.addAnimation("fruits",fruit4);
     
      banana.y = Math.round(random(100, 550));
     
      banana.velocityX = -5;
     
      if(score % 4 === 0){
        banana.velocityX -= 7;
    
      } else {
        banana.velocityX -= 6;
      }
      
      banana.setLifetime = 50;
     
      bananaG.add(banana);
     
      banana.scale = 0.3;

    }
    }

function Monster(){
  
  if(World.frameCount%200===0){
    
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,550));
   
    //update below give line of code for increase monsterGroup speed by 10
    monster.velocityX = -(8+(score/10));
    monster.setLifetime=50;
    
    monsterGroup.add(monster);

  }
}

function fruits(){
    
     //fruit.debug=true;

     r=Math.round(random(1,4));

    switch(r){
      case 1 : spawnBanana();
               break;
      case 2 : spawnApples();
               break;
      case 3 : spawnOranges();
               break
      case 4 : spawnPear();
               break;
      default : break;
      
    }
       
  }
