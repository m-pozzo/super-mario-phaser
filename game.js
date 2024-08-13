import { createAnimations } from "./animations.js"
import { getAudios } from "./audios.js"
import { checkControls } from "./controls.js"

const config = {
    type: Phaser.AUTO, //1ro intenta webgl, 2do canvas ...
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload, // se ejecuta para precargar recursos
        create, // se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}

new Phaser.Game(config)

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.spritesheet(
        'mario',
        'assets/entities/mario.png',
        {
            frameWidth: 18,
            frameHeight: 16
        }
    )

    this.load.spritesheet(
        'goomba',
        'assets/entities/overworld/goomba.png',
        {
            frameWidth: 16,
            frameHeight: 16
        }
    )

    getAudios(this)
} // ejecuta 1ro

function create() {
    this.add.image(190, 20, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)

    this.floor = this.physics.add.staticGroup();
    this.floor.create(-32, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .refreshBody()
    this.floor.create(128, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .refreshBody()

    // this.add.tileSprite(0, config.height - 32, config.width, 32, "floorbricks").setOrigin(0, 0)

    // this.mario = this.add.sprite(50, 200, "mario")
    //     .setOrigin(0, 1)

    this.mario = this.physics.add.sprite(20, 10, "mario")
        .setOrigin(0, 1)
        .setGravityY(350)
        .setCollideWorldBounds(true)
    //agregar goomba
    this.enemy = this.physics.add.sprite(80, config.height - 30, "goomba")
        .setOrigin(0, 1)
        .setGravityY(350)
        .setVelocityX(-50)
    // agregar al mundo colisiones
    this.physics.world.setBounds(0, 0, 2000, config.height);
    this.physics.add.collider(this.mario, this.floor);
    this.physics.add.collider(this.enemy, this.floor);
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);

    // camaras
    this.cameras.main.setBounds(0, 0, 2000, config.height);
    this.cameras.main.startFollow(this.mario);

    // teclas
    this.keys = this.input.keyboard.createCursorKeys();

    createAnimations(this);

    this.enemy.anims.play('goomba-walk')
} // ejecuta 2do

function onHitEnemy(mario, enemy) {
    if (mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play("goomba-dead");
        this.sound.add('goomba-stomp').play();
        enemy.setVelocityX(0);
        mario.setVelocityY(-200);
        setTimeout(() => {
            enemy.destroy()
        }, 500);
    }else {
        // mario muerto

    }
}

function update() {
    const { mario, scene, sound } = this;

    if (mario.isDead) return //si esta muerto, dejan de funcionar los controles

    checkControls(this);


    // verifica si mario esta muerto
    if (mario.y >= config.height) {
        mario.isDead = true;
        mario.anims.play('mario-dead');
        mario.setCollideWorldBounds(false);

        sound.add('gameover', { volume: 0.2 }).play();

        setTimeout(() => {
            mario.setVelocityY(-350);
        }, 77);
        setTimeout(() => {
            scene.restart();
        }, 7000);
    }
} // 3ro y continuamente
