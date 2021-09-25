var bg, b;
var boy , boyrunning ,boystanding
var obstacles,ob1image, ob2image, ob3image , ob4image ,ob5image, ob6image;
var ground;
var GameState = "PLAY"
var coin, coinimage, coinsgroup
var score = 0;
var gameoverimage , gameover , reset , resetimage 


function preload()
{
 bg = loadImage("bg8.png");
 ob1image = loadImage("ob1.png")

 ob2image = loadImage("ob2.png")

 ob5image = loadImage("ob5.png")

 ob6image = loadImage("ob6.png")

 gameoverimage = loadImage("gameover.jpg")

 resetimage = loadImage("reset.png")

boystanding = loadAnimation("run7.png")

 boyrunning = loadAnimation("run1.png", "run2.png" ,"run3.png" , "run5.png" , "run6.png" , "run7.png", "run8.png" )
 coinimage = loadImage("coin.png")
}
function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  b = createSprite(windowWidth/2, windowHeight/2)
  b.addImage(bg)
  b.scale = 1.2;
 
b.velocityX = -5

boy = createSprite(100,windowHeight - 100)
//boy.debug = true
boy.addAnimation("running", boyrunning)
boy.addAnimation("standing", boystanding)
ground = createSprite(100,windowHeight - 10, 400, 10);
ground.visible = false;

gameover = createSprite(windowWidth/2 , windowHeight/2)
gameover.addImage(gameoverimage)
gameover.scale = 0.4

reset = createSprite(windowWidth/2 , windowHeight/2 + 200)
reset.addImage(resetimage)
reset.scale = 0.5

obstacles = new Group();
coinsgroup = new Group();
}
function draw()
{

  background(0)
  //console.log(b.x)
  if(GameState === "PLAY"){
      gameover.visible = false;
      reset.visible = false;
    if(keyDown("space")&& boy.y > windowHeight - 300){

      boy.velocityY = -10
  
     }
      
  boy.velocityY = boy.velocityY + 0.5
  
    if(b.x < 0 ){
  
    b.x  = windowWidth
  

    }



    if(boy.isTouching(obstacles)){
      console.log("hi")
    
      GameState = "END"
    }
    if(boy.isTouching(coinsgroup)){

      score = score + 5
      for(var i=0;i<coinsgroup.length; i++){
      if(coinsgroup.get(i).isTouching(boy))
        coinsgroup.get(i).destroy();
      }
    }
    boy.collide(ground)

    spawncoins();
    spawnobstacles();
  

  }
  else if (GameState === "END"){

    boy.changeAnimation("standing" , boystanding)
    obstacles.setVelocityXEach(0)
    obstacles.destroyEach()
    boy.velocityY  = 0;
    boy.collide(ground)
    b.velocityX = 0
    coinsgroup.setVelocityXEach(0);
    coinsgroup.destroyEach();
    gameover.visible = true;
    reset.visible = true;
   if(mousePressedOver(reset)){
    
      restart()
   

   }

  }
  

  
 
 
  drawSprites();
fill("Black")
textSize(30)
  text("SCORE: " + score , 50 ,  70)

}


function spawnobstacles(){

if(frameCount%150 === 0 ){

 var ob = createSprite(windowWidth, windowHeight - 40 , 50,50)
 //ob.debug = true
 ob.velocityX = -(5 + score/10)
 //ob.scale = 0.9
 var r = Math.round(random(1,4))
 switch(r){
case 1 : ob.addImage(ob1image);
ob.scale = 1.1
break

case 2 : ob.addImage(ob2image);
ob.scale = 0.9
break

case 3 : ob.addImage(ob5image);
ob.scale = 0.9
break

case 4 : ob.addImage(ob6image);
ob.scale = 0.9
break

  

 }

 obstacles.add(ob)
}
 

}
function spawncoins (){
 
  if(frameCount%100 === 0 ){

    coin = createSprite(windowWidth, Math.round(random(250,windowHeight - 300)))
    coin.addImage(coinimage)
    coin.scale= 0.2
    coin.velocityX = -6
    coinsgroup.add(coin)
  }


}
 
function restart(){


score = 0
GameState = "PLAY"
boy.changeAnimation("running", boyrunning)
b.velocityX = -5

}