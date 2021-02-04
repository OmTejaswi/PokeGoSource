
function playerAttackTimer() {
        for(var i = 0; i<enemy1Group.length; i++) {
            if((enemy1Group.get(i).x < player.x+400 && enemy1Group.get(i).x > player.x-100) && (keyDown("a") ||
            keyDown("A"))) {
                if(frameCount%10===0) {
                    //attack
                    attack = createSprite(player.x,player.y);
                    attack.addImage(attackImg);
                    attack.velocityX = 5;
                    attack.scale = 0.2;
                    attack.lifetime = windowWidth+10;
                    //attack.depth = player.depth + 1;
                    attackGroup.add(attack);
                }
            }
        }

        for(var i = 0; i<zubatGroup.length; i++) {
            if((zubatGroup.get(i).x < player.x+400 && zubatGroup.get(i).x > player.x-100) && (keyDown("a") ||
            keyDown("A"))) {
                if(frameCount%10===0) {
                    //attack
                    attack = createSprite(player.x,player.y);
                    attack.addImage(attackImg);
                    attack.velocityX = 5;
                    attack.scale = 0.2;
                    attack.lifetime = windowWidth+10;
                    //attack.depth = player.depth + 1;
                    attackGroup.add(attack);
                }
            }
        }

        if(enemy1Group.isTouching(attackGroup)) {
            attackGroup.destroyEach();
            enemy1Group.destroyEach();
        } else if(zubatGroup.isTouching(attackGroup)) {
            attackGroup.destroyEach();
            zubatGroup.destroyEach();
        }

        
    
}

function playerAttack() {
    setTimeout(()=>{
        playerAttackTimer();
    },500);
}

function time() {

    if(timeChooser == 2) {
        setTimeout(() => {
            gameState = "levelEnd";
        },3600000*4);
    } else if(timeChooser == 3) {
        setTimeout(() => {
            gameState = "levelEnd";
        },3600000*4);
    } else if(timeChooser == 4) {
        setTimeout(() => {
            gameState = "levelEnd";
        },3600000*4);
    }
    //console.log(timeChooser);
}

function choose() {
    
    if(textChooser == 1) {

    }else if(textChooser == 1) {
        win = "Hurray!"
    } else if(textChooser == 2) {
        win = "Booyah!"
    } else if(textChooser == 3) {
        win = "awesome!"
    } else if(textChooser == 4) {
        win = "cool!"
    } else if(textChooser == 5) {
        win = "wonderful!"
    } else if(textChooser == 6) {
        win = "Winner!"
    } else if(textChooser == 7) {
        win = "Super-Duper"
    } else if(textChooser == 8) {
        win = "Yah!"
    } else if(textChooser == 9) {
        win = "Wow!"
    } else if(textChooser == 10){
        win = "Whoa!"
    }

       
}
