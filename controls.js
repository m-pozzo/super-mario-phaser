export const checkControls = ({ mario, keys }) => {
    const isTouchingDown = mario.body.touching.down;

    const isKeyRightDown = keys.right.isDown;
    const isKeyLeftDown = keys.left.isDown;
    const isKeyUpDown = keys.up.isDown;

    if (isKeyRightDown) {
        isTouchingDown && mario.anims.play('mario-run', true);
        mario.flipX = false;
        mario.x += 1.7;
    }
    else if (isKeyLeftDown) {
        isTouchingDown && mario.anims.play('mario-run', true);
        mario.flipX = true;
        mario.x -= 1.7;
    }
    else if (isTouchingDown) {
        mario.anims.play('mario-idle', true);
    }

    if (isKeyUpDown) {
        isTouchingDown && mario.setVelocityY(-250);
        mario.anims.play('mario-jump', true);
    }
}