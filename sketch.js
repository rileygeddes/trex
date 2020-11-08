var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudimage, cloudgroup
var obstical, obsticalimage1, obsticalimage2, obsticalimage3, obsticalimage4, obsticalimage5, obsticalimage6,obsticalgroup
var score

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  obsticalimage1 = loadImage("obstacle1.png")
  obsticalimage2 = loadImage("obstacle2.png")
  obsticalimage3 = loadImage("obstacle3.png")
  obsticalimage4 = loadImage("obstacle4.png")
  obsticalimage5 = loadImage("obstacle5.png")
  obsticalimage6 = loadImage("obstacle6.png")
  cloudimage= loadImage("cloud.png")
  
  groundImage = loadImage("ground2.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  score = 0
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudgroup = new Group()
  obsticalgroup = new Group()
}

function draw() {
  background("red");
  
  if(keyDown("space") && trex.y>160) {
    trex.velocityY = -12;
  }
  
  score = score+Math.round(getFrameRate()/60)
  fill("white")
  text("score"+score,500,50)
  
  
  spawnclouds()
  spawnobstical()
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnclouds(){
  if(frameCount %60 === 0){
    cloud=createSprite(600,120,10,10)
    cloud.y=Math.round(random(80,120))
    cloud.velocityX=-1
    cloud.addImage(cloudimage)
    cloud.scale=0.5
    cloud.lifeTime = 600
    cloudgroup.add(cloud)
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
  }
  
}

function spawnobstical(){
  if(frameCount %80 === 0){
    obstical=createSprite(600,165,10,10)
    obstical.velocityX=-2
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1 : obstical.addImage(obsticalimage1);
        break;
        
        case 2 : obstical.addImage(obsticalimage2);
        break;
        
        case 3 : obstical.addImage(obsticalimage3);
        break;
        
        case 4 : obstical.addImage(obsticalimage4);
        break;
        
        case 5 : obstical.addImage(obsticalimage5);
        break;
        
        case 6 : obstical.addImage(obsticalimage6);
        break;
        
        default:break;
    }
    obstical.scale=0.4
    obstical.lifeTime = 300
    obsticalgroup.add(obstical)
  }
  
}
