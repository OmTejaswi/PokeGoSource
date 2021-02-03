
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

