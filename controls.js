const MARIO_ANIMATIONS = {
    grown: {
        idle: "mario-grown-idle",
        jump: "mario-grown-jump",
        run: "mario-grown-run",
        down: "mario-grown-down"
    },
    normal: {
        idle: "mario-idle",
        jump: "mario-jump",
        run: "mario-run"
    }
}

export const checkControls = ({ mario, keys }) => {
    const isTouchingDown = mario.body.touching.down;

    const isKeyRightDown = keys.right.isDown;
    const isKeyLeftDown = keys.left.isDown;
    const isKeyUpDown = keys.up.isDown;
    const isKeyDownDown = keys.down.isDown;

    mario.setVelocityX(0);

    if (mario.isDead) return
    if (mario.isBlocked) return

    const marioAnimations = mario.isGrown ? MARIO_ANIMATIONS.grown : MARIO_ANIMATIONS.normal

    if (isKeyRightDown) {
        mario.setVelocityX(125);
        isTouchingDown && mario.anims.play(marioAnimations.run, true);
        mario.flipX = false;
    }
    else if (isKeyLeftDown) {
        isTouchingDown && mario.anims.play(marioAnimations.run, true);
        mario.flipX = true;
        mario.setVelocityX(-125);
    }
    else if (isTouchingDown) {
        mario.anims.play(marioAnimations.idle, true);
    }

    if (isKeyUpDown) {
        isTouchingDown && mario.setVelocityY(-270);
        mario.anims.play(marioAnimations.jump, true);
    }else if(isKeyDownDown && mario.isGrown){
        mario.anims.play(marioAnimations.down, true);
    }
}