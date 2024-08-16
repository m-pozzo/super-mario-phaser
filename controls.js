export const checkControls = ({ mario, keys }) => {
    const isTouchingDown = mario.body.touching.down;

    const isKeyRightDown = keys.right.isDown;
    const isKeyLeftDown = keys.left.isDown;
    const isKeyUpDown = keys.up.isDown;

    mario.setVelocityX(0);

    if (isKeyRightDown) {
        mario.setVelocityX(125);
        isTouchingDown && mario.anims.play('mario-run', true);
        mario.flipX = false;
    }
    else if (isKeyLeftDown) {
        isTouchingDown && mario.anims.play('mario-run', true);
        mario.flipX = true;
        mario.setVelocityX(-125);
    }
    else if (isTouchingDown) {
        mario.anims.play('mario-idle', true);
    }

    if (isKeyUpDown) {
        isTouchingDown && mario.setVelocityY(-270);
        mario.anims.play('mario-jump', true);
    }
}