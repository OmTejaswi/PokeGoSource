/*  Note PokeGo Game is the copy
    right of © Dynamic Coders
    please don't copy the codes

    © Dynamic Coders All rights reserved */


//player
let player;

//pokemon and backGround
let pikachu_running, pikachu_jumping, pikachu_standing;
let runningBack1, gymBack, natureBack, pokeballBack, invisibleGround;
let runningBackImg, gymBackImg, natureBackImg, pokeballBackImg;
let runningbacknightlight, runningbacknightdark;

let zubat_flying, enemy_moving, enemy1Group, zubatGroup;
let face_image;
let zubat_stop;

//zubat and enemy1
let zubat, enemy1;

//endless and level game
let endlessGame, endlessgameImg;
let levelGame, levelgameImg;

//sounds
let battleSound;
let selectSound;
let serveStageSound;
let pikaTired, pikaHappy, pikachuSound, pikaa, collect, attackSound;

//gameState
let gameState = "select";

//confirmBox
let confirmBox;

//sound slider
let slider;

//block
let block

//star
let star, showingStar, playingstarImg, showingstarImg;

//score
let score, points;
 let highestScore = 0;
 let starScore = 3;
 let hiddenScore = 0;

let resetGame, resetGameImg;

//attact
let attack, attackImg;

//time
let take = "00:00";
let date;
let datetime;
let timeData;
let jsonCoverter;
let localScore = 0;

let backgroundChanger;

let backgroundReset = 0;

let timeChooser = 0;

let textChooser = 0;
let win;

let alertBox;

function preload() {
//pikachu running, standing and jumping animation
 pikachu_running = loadAnimation("images/pikachu1.png","images/pikachu2.png", "images/pikachu3.png",
 "images/pikachu4.png","images/pikachu5.png",
 "images/pikachu5.png","images/pikachu6.png","images/pikachu7.png","images/pikachu8.png","images/pikachu9.png",
 "images/pikachu10.png","images/pikachu11.png",
 "images/pikachu12.png","images/pikachu13.png","images/pikachu14.png");

 pikachu_jumping = loadAnimation("images/pikachu5.png");
 pikachu_standing = loadAnimation("images/pikachustanding.png");

 face_image = loadImage("images/face1.png");
 playingstarImg = loadImage("images/starmou.png");
 showingstarImg = loadImage("images/starnor.png")

 //animation of enemies
 zubat_flying = loadAnimation("images/zubat1.png","images/zubat2.png","images/zubat3.png",
 "images/zubat4.png","images/zubat5.png"); 

 zubat_stop = loadAnimation("images/zubat3.png")

 enemy_moving = loadImage("images/enemy1.png");

 //background
 runningBackImg = loadImage("backgrounds/runningback.jpeg");
 natureBackImg = loadImage("backgrounds/natureback.jpeg");
 gymBackImg = loadImage("backgrounds/gymback.jpeg");
 pokeballBackImg = loadImage("backgrounds/pokeballback.jpeg");
 runningbacknightlight = loadImage("backgrounds/runningnightlight.jpeg");
 runningbacknightdark = loadImage("backgrounds/runningnightdark.jpeg");

 //endless and level
 endlessgameImg = loadImage("images/endlessgame.png");
 levelgameImg = loadImage("images/levelgame.png");

 //load sounds
 battleSound = loadSound("sound/PokmonGOBattle.mp3");
 selectSound = loadSound("sound/select.mp3");
 serveStageSound = loadSound("sound/serveStage.mp3");
 pikaHappy = loadSound("sound/PikaPikaHappy.mp3");
 pikaTired = loadSound("sound/PikaPikaTired.mp3");
 pikachuSound = loadSound("sound/PikachuSoundEffect.mp3");
 pikaa = loadSound("sound/Pikaaaa.mp3");
 collect = loadSound("sound/collect.mp3");
 attackSound = loadSound("sound/Attack.mp3");

 //reset
 resetGameImg = loadImage("images/restart.png");

 //attack
 attackImg = loadImage("images/electricity.png");
}

function setup() {
    

    //create canvas fit according to screen
    createCanvas(windowWidth,windowHeight+10);

     //create sprite in setup
     //background
    pokeballBack = createSprite(windowWidth/2,windowHeight/2);
    pokeballBack.addImage(pokeballBackImg);

    runningBack1 = createSprite(windowWidth/2,windowHeight/2);
    runningBack1.addImage("day",runningBackImg);
    runningBack1.velocityX = -5;
    runningBack1.addImage("light",runningbacknightlight);
    runningBack1.addImage("dark",runningbacknightdark);


    player = createSprite((windowWidth/6),runningBack1.y+170);
    player.addAnimation("running", pikachu_running);
    player.scale = 0.2;
    player.addAnimation("standing",pikachu_standing);
    player.addAnimation("jumping",pikachu_jumping);

    //Invisible ground 
    invisibleGround = createSprite(player.x,player.y+55,200,2);
    invisibleGround.visible = false;

    //reset the game
    resetGame = createButton("RESTART");
    resetGame.position(windowWidth/2.35,windowHeight/2.5);
    resetGame.style("borderRadius","100px");
    resetGame.size(150,150);
    resetGame.hide();


    // endless and level
    endlessGame = createButton("ENDLESSGAME");
    endlessGame.position(windowWidth/2.5,windowHeight/2.8);
    

    levelGame = createButton("LEVELGAME");
    levelGame.position(windowWidth/2.5,windowHeight/2);
    

    //create slider
    slider = createSlider(0,10,0.5,0.01);
    slider.position(windowWidth/10, windowHeight/1.06);

    //alert for high volume
    alertBox = alert("Please Unplug Headsets and Make sure your volume is loo. Too high volume can harm you ears")

    //change depth

    //starScore
    showingStar = createSprite(windowWidth/1.7,(windowHeight/15.5));
    showingStar.addImage(showingstarImg);
    showingStar.scale = 0.2;


    player.setCollider("rectangle", 0, 0, 300,250);
    player.debug = false;

    enemy1Group = createGroup();
    zubatGroup = createGroup();
    pointsGroup = createGroup();
    blockGroup = createGroup();
    starsGroup = createGroup();
    attackGroup = createGroup();

    score = 0;
    points = 0; 

    if(alertBox) 
    {
        serveStageSound.loop();
    }
    if(gameState === "endlessPlay" || gameState === "levelPlay")
       {
        battleSound.loop();
       }

    serveStageSound.setVolume(1);
    battleSound.setVolume(1);

    if(gameState === "select")
     {
        console.log(serveStageSound.loop());
     }

    timeChooser = Math.round(random(1,2));
    textChooser = Math.round(random(1,10));

}

function draw() {


    //localscore
    localScore = localStorage.getItem("score");

     //score
     if(score > hiddenScore)
      {
        hiddenScore+= Math.round(getFrameRate()/60);
      }

    if(localStorage.getItem("score") <= hiddenScore) 
    {
       localStorage.setItem("score", hiddenScore);
    } 

    //change Background
    backGroundtime();
    

    //Highest score
    highestScore = localScore;
 
           //reset
           if((keyDown(CONTROL) && keyDown(SHIFT) && keyDown(ENTER)) && (gameState == "endlessPlay" 
           || gameState == "levelPlay")) 
           {
            //score
            score = 0;
            points = 0;
            starScore = 3;
            serveStageSound.loop();
            gameState = "select";
            reset();
           }

        zubatGroup.collide(blockGroup);
        pointsGroup.collide(blockGroup);

        blockGroup.velocityX = enemy1Group.velocityX;
        starsGroup.velocityX = blockGroup.velocityX;
    
        


    

    //full screen
    if(keyCode == 70) 
    {
        document.documentElement.requestFullscreen();    
    }
    
     //background
     background("#fff");
    
//volume accoring to slider value
 
 battleSound.setVolume(slider.value());
 serveStageSound.setVolume(slider.value());

 //collide
 player.collide(invisibleGround); 
 //pikachu collide with blocks
 player.isTouching(blockGroup);

 //reset background
 if(runningBack1.x < 0 && backgroundReset == 1) 
 {
    runningBack1.x = runningBack1.width/2;
 } else if(runningBack1.x < 0 && (backgroundReset ==2 || backgroundReset ==3)) 
 {
    runningBack1.x = runningBack1.width/4.5;
 }

//console.log(runningBack1.x)

//Adding Gravity 
player.velocityY = player.velocityY + 0.6;




  //serve stage
   if(gameState === "select") 
   {
       //give visiblity
       player.visible = false;
       //zubat.visible = false;
       runningBack1.visible = false;
       pokeballBack.visible = true;
       resetGame.visible = false;
       endlessGame.show();;
       levelGame.show(); 
       resetGame.hide();

       //score
       score = 0;
   
       //score
       hiddenScore+= 0;

       //sound
       battleSound.stop();

       endlessGame.mousePressed(endlessplay)
       levelGame.mousePressed(levelplay)

       player.changeAnimation("running",pikachu_running);

       //points
       points = 0;

       reset();
            
        

       } else if(gameState === "levelPlay") 
       {
            //give visiblity
            player.visible = true;
            endlessGame.hide();;
            levelGame.hide();
            resetGame.hide();
            pokeballBack.visible = false;
            runningBack1.visible = true;
            resetGame.visible = false;
            
            
 
            
           
            //background velocity
            runningBack1.velocityX = -(5 + score/100);
 
            if(runningBack1.velocityX < -20) 
            {
                runningBack1.velocityX = -20;
            }
 
            
 
 
            //Jump 
            if(( touches.length>0  && player.y >= windowHeight/2+150) ||
             ( keyDown("space") && player.y >= windowHeight/2+150)) 
             {
            player.velocityY = -14.5;
            touches = []
            } else if((touches.length>0 && player.collide(blockGroup)) || player.collide(blockGroup) && keyDown("space")   )
            {
             player.velocityY = -14.5;
             touches = []
            } 
 
            //animation
            if(keyDown("space")) 
            {
                player.changeAnimation("jumping",pikachu_jumping);
            } else if(keyWentUp("space"))
            {
             player.changeAnimation("running",pikachu_running);
            }
 
             //player velocity should no more than 0
             if(player.velocityX < 0 || player.velocityX > 0 || player.x < windowWidth/6 ||
                 player.x > windowWidth/6) 
                 {
                player.velocityX = 0;
                player.x = windowWidth/6;
                 }
   
             //star group
             if(player.isTouching(starsGroup)) 
             {
                 collect.play();
                 collect.setVolume(10);
                 starsGroup.destroyEach();
                 starScore+= 1;
             }
            //Score
            score = score + Math.round(getFrameRate()/60);
 
           
 
       
            
            //attact
             playerAttack(); 
            
 
            //functions
          //Spawnning enemies and face
          spawnEnimies();
          spawnFace();
 
          //call functions
          blocks();
          stars();
 
 
            //background
            background("#fff");
 
 
            if(pointsGroup.isTouching(player)) 
            {
                points = points + 1;
                pointsGroup.destroyEach();
            }
 
            if(enemy1Group.isTouching(player)) 
            {
                starScore -= 1;
                enemy1.destroy();
            } else if(zubatGroup.isTouching(player)) 
            {
             starScore -= 1;
             zubat.destroy();
            } 
            if(starScore> 5)
            {
                starScore = 5;
            } else if(starScore<0) 
            {
                gameState = "levelEnd";
                starScore = 0;
            }
 
            time();
            
 

       }  
       else if(gameState === "endlessPlay") 
       {
           //give visiblity
           player.visible = true;
           endlessGame.hide();;
           levelGame.hide();
           resetGame.hide();
           pokeballBack.visible = false;
           runningBack1.visible = true;
           resetGame.visible = false;
           
           

           
          
           //background velocity
           runningBack1.velocityX = -(5 + score/100);

           if(runningBack1.velocityX < -20) 
           {
               runningBack1.velocityX = -20;
           }

           


           //Jump 
           if(( touches.length>0  && player.y >= windowHeight/2+150) ||
            ( keyDown("space") && player.y >= windowHeight/2+150)) 
            {
           player.velocityY = -14.5;
           touches = []
            } else if((touches.length>0 && player.collide(blockGroup)) || player.collide(blockGroup) && keyDown("space"))
            {
            player.velocityY = -14.5;
            touches = []
            } 

           //animation
           if(keyDown("space")) 
           {
               player.changeAnimation("jumping",pikachu_jumping);
            } else if(keyWentUp("space"))
            {
            player.changeAnimation("running",pikachu_running);
            }

            //player velocity should no more than 0
            if(player.velocityX < 0 || player.velocityX > 0 || player.x < windowWidth/6 ||
                player.x > windowWidth/6) 
                {
                    player.velocityX = 0;
                    player.x = windowWidth/6;
                }
  
            //star group
            if(player.isTouching(starsGroup)) 
            {
                collect.play();
                collect.setVolume(10);
                starsGroup.destroyEach();
                starScore+= 1;
            }
           //Score
           score = score + Math.round(getFrameRate()/60);

          

      
           
           //attact
            playerAttack(); 
           

           //functions
         //Spawnning enemies and face
         spawnEnimies();
         spawnFace();

         //call functions
         blocks();
         stars();


           //background
           background("#fff");


           if(pointsGroup.isTouching(player)) 
           {
               points = points + 1;
               pointsGroup.destroyEach();
           }

           if(enemy1Group.isTouching(player)) 
           {
               starScore -= 1;
               enemy1.destroy();
           }
            else if(zubatGroup.isTouching(player)) 
            {
            starScore -= 1;
            zubat.destroy();
           } 
           if(starScore> 5)
           {
               starScore = 5;

            } else if(starScore<0) 
            {
               gameState = "endlessEnd";
               starScore = 0;
            }


           

       }
        else if(gameState === "endlessEnd") 
        {
           //give visiblity
            endlessGame.hide();
            levelGame.hide();;
            runningBack1.visible = true;
            resetGame.show();

            //console.clear();

           //background
           background("#fff");

           //sounds
           battleSound.stop();
 

           //velocity
           runningBack1.velocityX = 0;

         //group
         blockGroup.setVelocityXEach(0);
         enemy1Group.setVelocityXEach(0);
         zubatGroup.setVelocityXEach(0);
         starsGroup.setVelocityXEach(0);
         pointsGroup.setVelocityXEach(0);

         

         


         zubat.changeAnimation("stop",zubat_stop);
           
          //animation
          player.changeAnimation("standing",pikachu_standing);

          

           //reset
           if(keyDown(ALT) && keyDown("r") || keyDown("R")) 
           {
               //score
               score = 0;
               starScore = 1;
               gameState = "endlessPlay";
               player.changeAnimation("running",pikachu_running);
               battleSound.loop();
              reset();
           }

           //collide player
        player.collide(blockGroup);
        
         resetGame.mousePressed(restart);
           
       
      
       } 
       else if(gameState === "levelEnd") 
       {
            //give visiblity
            endlessGame.hide();
            levelGame.hide();;
            runningBack1.visible = true;
            resetGame.show();


            //console.clear();

           //background
           background("#fff");

           //sounds
           battleSound.stop();
 

           //velocity
           runningBack1.velocityX = 0;

         //group
         blockGroup.setVelocityXEach(0);
         enemy1Group.setVelocityXEach(0);
         zubatGroup.setVelocityXEach(0);
         starsGroup.setVelocityXEach(0);
         pointsGroup.setVelocityXEach(0);

         

         


         zubat.changeAnimation("stop",zubat_stop);
           
          //animation
          player.changeAnimation("standing",pikachu_standing);

          

           //reset
           if(keyDown(ALT) && keyDown("r") || keyDown("R")) 
           {
               //score
               score = 0;
               starScore = 1;
               gameState = "levelPlay";
               player.changeAnimation("running",pikachu_running);
               battleSound.loop();
              reset();
           }

           //collide player
        player.collide(blockGroup);
        
         resetGame.mousePressed(restart);
           
       
       }

       drawSprites();
    
    
    if(gameState == "select" || gameState == "endlessPlay" || gameState == "levelPlay") 
    {
       textAlign(CENTER);
       stroke("red");
       textSize(25);
       fill("yellow");
       text("Score: " + score, windowWidth-180,(windowHeight/10.5));

       stroke("purple");
       textSize(25);
       fill("orange");
       text("Points: " + points, windowWidth-300,(windowHeight/10.5));

       stroke("white");
       textSize(25);
       fill("black");
       text("HI: " + highestScore, windowWidth-440,(windowHeight/10.5));

    } 
    else 
    {
       stroke("red");
       textSize(35);
       fill("yellow");
       text("Score: " + score, windowWidth/2-100,(windowHeight/3));

       stroke("purple");
       textSize(35);
       fill("orange");
       text("Points: " + points, windowWidth/2+200,(windowHeight/3));

       stroke("white");
       textSize(35);
       fill("black");
       text("HI: " + highestScore, windowWidth/2-300,(windowHeight/3));
    }

    if(gameState == "levelEnd") 
    {
        push();
        stroke("black");
       textSize(35);
       fill("black");
       textAlign(CENTER);
       text(win,width/2,height/3.6);
       pop();
    }
        textAlign(CENTER);
        stroke("black");
        textSize(25);
        fill("black");
        text(starScore, showingStar.x+2, showingStar.y+14);

       textAlign(CENTER);
       text("© Dynamic Coders",windowWidth/2,(windowHeight));
       
       
       
       timeZone();
       text("Time: " + take, player.x/2, windowHeight/10.5);
}

 function spawnEnimies() {

    if(frameCount % 300 === 0) 
    {
        zubat = createSprite(windowWidth+100, windowHeight/2+50);
        zubat.y = Math.round(random(350, 550));
        zubat.addAnimation("flying", zubat_flying);
        zubat.addAnimation("stop",zubat_stop);
        zubat.debug = false;
        zubat.scale = 0.25;
        zubat.velocityX = -(7 + score/100);
        zubat.lifetime = windowWidth+10;

        zubatGroup.add(zubat);
        zubatGroup.setVelocityXEach(zubat.velocityX);

        zubat.depth = player.depth;
        player.depth = player.depth + 1;

    }

    if(frameCount % 225 === 0) 
    {
        enemy1 = createSprite(windowWidth+100,invisibleGround.y-30);
        enemy1.addImage("moving", enemy_moving);
        enemy1.scale = 0.80;
        enemy1.velocityX = -(7 + score/100);
        enemy1.lifetime = windowWidth+10;
        enemy1.setCollider("rectangle",0,0,150,150)
        enemy1.debug = false;
        enemy1Group.add(enemy1);

        if(enemy1.velocityX > 20) 
        {
            enemy1.velocityX = 20;
        }

        enemy1Group.setVelocityXEach(-(7 + score/100));

        enemy1.depth = player.depth;
        player.depth = player.depth + 1;


    }
}

function spawnFace() {

    if(frameCount % 500 === 0) 
    {
        let face = createSprite(windowWidth+100, windowHeight/2+50);
        face.y = Math.round(random(350, 550));
        face.addImage(face_image);
        face.scale = 0.1;
        face.velocityX = -(7 + score/100);
        face.lifetime = windowWidth+10;
        pointsGroup.add(face);

        face.depth = player.depth;
        player.depth = player.depth + 1;

    }

}



function blocks() {
    if(frameCount%5000===0) 
    {
        block = createSprite(windowWidth+100,windowHeight/2+100,200,10);
        block.shapeColor = "black";
        block.velocityX = -15;
        block.lifetime = windowWidth+10;
        blockGroup.add(block);
        
      
    }

    
}

function stars() {
    if(frameCount%5000===0) 
    {
        star = createSprite(windowWidth+100,windowHeight/2+75);
        star.addImage(playingstarImg);
        star.depth = player.depth+1;
        star.lifetime = windowWidth+10;
        star.velocityX = -15;
        star.scale = 0.1;
        starsGroup.add(star);


        
    }
}

function reset() 
{
    pointsGroup.destroyEach();
    blockGroup.destroyEach();
    starsGroup.destroyEach();
    enemy1Group.destroyEach();
    zubatGroup.destroyEach();
    starsGroup.destroyEach();
}

function restart() 
{
    pointsGroup.destroyEach();
    blockGroup.destroyEach();
    starsGroup.destroyEach();
    enemy1Group.destroyEach();
    zubatGroup.destroyEach();
    starsGroup.destroyEach();
    starScore = 3;
    gameState = "select";
    serveStageSound.loop();
}


function endlessplay() {
    endlessGame.hide();;
    levelGame.hide();; 
           
           
           
           //SOUND
           selectSound.play();
           selectSound.setVolume(2);

           confirmBox = confirm("Are you sure to start the Endless game? Make sure you are in good environment to start Endless Game");
           if(confirmBox == true) 
           {
               gameState = "endlessPlay";
              
               //sound
               serveStageSound.stop();
               battleSound.loop();
               
               return true;
           } 
           else 
           {
               window.location.reload();
               return false;
           }
}

function levelplay() {
    endlessGame.hide();;
    levelGame.hide();

            
            //SOUNDS
            selectSound.play();
            selectSound.setVolume(2);
           
            confirmBox = confirm("Are you sure to start the level game? Make sure you are in good environment to start Level Game");
            if(confirmBox == true) 
            {
                gameState = "levelPlay";
                 //sound
                 serveStageSound.stop();
                 
                 battleSound.loop();

                return true;
            }
             else 
             {
                window.location.reload();
                return false;
            }
            
}

async function timeZone() {
    timeData = await fetch("https://worldtimeapi.org/api/ip");
    jsonCoverter = await timeData.json();
    date = jsonCoverter.datetime;
    take = date.slice(11,16);
    backgroundChanger = date.slice(11,13);
   // console.log(backgroundChanger);
}


async function backGroundtime() {
    if(backgroundChanger > 23 && backgroundChanger < 2) 
    {
        runningBack1.changeImage("dark",runningbacknightdark);
        runningBack1.scale = 1.5;
        backgroundReset = 3;
    }
     else if(backgroundChanger > 2 && backgroundChanger < 5) 
     {
        runningBack1.changeImage("light",runningbacknightlight);
        runningBack1.scale = 1.5;
        backgroundReset = 2;
     } 
     else if(backgroundChanger > 5 && backgroundChanger < 18) 
     {
        runningBack1.changeImage("day",runningBackImg);
        runningBack1.scale = 1;
        backgroundReset = 1;
     } 
     else 
     {
        runningBack1.changeImage("dark",runningbacknightlight);
        runningBack1.scale = 1.5;
        backgroundReset = 3;
    } 
}