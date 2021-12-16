var PLAY=1, END=0;
var gameState=PLAY;
var bground, backgroundImg, bgMusic;
var spaceCraft, spaceCraftImg;
var bullets, bulletsImg, bulletsGroup, specialBullets, specialBulletsImg;
var alien, alienImg, enemyGroup;
var gameOverImg, gameOverSound; 
var Bshoot,SBshoot,shootSound, SpecialbulletGroup;
var score=0, specialBulletsCount=0;
var resetButton;
function preload(){
  backgroundImg=loadImage("Images/spacebg.png");
  spaceCraftImg=loadImage("Images/spacecraft.png");
  bulletsImg=loadImage("Images/Pinkbullet.png");
  specialBulletsImg=loadImage("Images/Specialbullet.png");
  alienImg=loadImage("Images/alien.png");
  gameOverImg=loadImage("Images/GameOver.png");
  gameOverSound=loadSound("Images/gameover.mp3");
  shootSound=loadSound("Images/BulletSound.mp3");
  bgMusic=loadSound("Images/bgmusic.mp3");

}
function setup() {
  createCanvas(1400,600);
  bground=createSprite(1400,300,0,0);
  bground.addImage(backgroundImg);
  bground.scale=2;
  bground.velocityX= -4;
  bground.x=bground.width/100;
  

  spaceCraft=createSprite(100, 300, 50, 50);
  spaceCraft.addImage(spaceCraftImg);
  spaceCraft.scale= 0.5;

  //score=0;
  //specialBulletsCount=0;
  enemyGroup=createGroup();
  bulletsGroup=createGroup();
  SpecialbulletGroup=createGroup();

  
}

function draw() {
  background("white");

   


  if(bground.x<510){
    bground.x=bground.width/2;
  }
 
  if(gameState===PLAY){

    //bgMusic.play();

    spawnObstracles();
    Bshoot=createImg("Images/shootButton.png");
  Bshoot.size(50,50);
  Bshoot.position(1300,100);
  Bshoot.mousePressed(BulletShoot);

  SBshoot=createImg("Images/Target2.png");
  SBshoot.size(50,50);
  SBshoot.position(1300,200);
  SBshoot.mousePressed(SpecialbulletShoot);

  resetButton=createImg("Images/restart.png");
  resetButton.size(50,50);
  resetButton.position(1300,300);
  resetButton.mousePressed(reset);   

  if(keyDown(UP_ARROW)){
    spaceCraft.y=spaceCraft.y-10;
  }
  if(keyDown(DOWN_ARROW)){
    spaceCraft.y=spaceCraft.y+10;
  }

  if(enemyGroup.isTouching(bulletsGroup)){
    enemyGroup.destroyEach();
    bulletsGroup.destroyEach();
    score=score+2;
  }
  if(enemyGroup.isTouching(SpecialbulletGroup)){
    enemyGroup.destroyEach();
    SpecialbulletGroup.destroyEach();
    score=score+4;
    specialBulletsCount=specialBulletsCount-1;
  }
  /*if(specialBulletsCount<=0){
    SpecialbulletGroup.velocityX=0;
    
    stroke("yellow");
    fill("red");
    text("YOU HAVE USED ALL YOUR SPECIAL BULLETS!",700,150);
  }*/
  //console.log("BEFORE"+score);
  if(score%10===0){
    //console.log("AFTER"+score);
    ///specialBulletsCount=specialBulletsCount+1;
    
  }
  
    if(spaceCraft.isTouching(enemyGroup)){
      gameState=END;
      gameOverSound.play();
      
    }

  }
  else if(gameState===END){
    enemyGroup.destroyEach();
    spaceCraft.x=width/2;
    spaceCraft.y=height/2;
    spaceCraft.addImage(gameOverImg);
    spaceCraft.scale=1.5;
      stroke("yellow");
      fill("red");
      textSize(20)
      text("To Play Again Press the RESTART button on the right side",600,500);
  }
  drawSprites();
  stroke("yellow");
  fill("red");
  textSize(20);
  text("SCORE:"+score,1000,20);
  //text("SPECIALL BULLET COUNT:"+specialBulletsCount, 900, 40);
  
}

function spawnObstracles(){
  if(frameCount%80===0){
  var x= random(500,1200);
  var y= random(50, 550);
  alien=createSprite(x, y, 50, 50);
  alien.addImage(alienImg);
  alien.scale=0.4;
  alien.velocityX= -11;
  enemyGroup.add(alien);
  }
}

function BulletShoot(){
  var bullets;
  bullets=createSprite(spaceCraft.x, spaceCraft.y,10,10);
  bullets.addImage(bulletsImg);
  bullets.velocityX=8;
  bulletsGroup.add(bullets);
  shootSound.play();
}

function SpecialbulletShoot(){
  var Sbullets;
  Sbullets=createSprite(spaceCraft.x, spaceCraft.y, 10,10);
  Sbullets.addImage(specialBulletsImg);
  Sbullets.velocityX=8;
  SpecialbulletGroup.add(Sbullets);
  shootSound.play();
}

function reset(){
  gameState=PLAY;
  spaceCraft.x=100;
  spaceCraft.y=300;
  spaceCraft.addImage(spaceCraftImg);
  spaceCraft.scale= 0.5;
  score=0;
  specialBulletsCount=0;
}