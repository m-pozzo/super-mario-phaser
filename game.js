import { createAnimations } from "./animations.js"
import { getAudios, playAudio } from "./audios.js"
import { checkControls } from "./controls.js"
import { getSpritesheets } from "./spritesheets.js"

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

    this.load.image(
        'supermushroom',
        'assets/collectibles/super-mushroom.png'
    )

    getSpritesheets(this);
    getAudios(this);
} // ejecuta 1ro

function create() {
    createAnimations(this);

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
        .setVelocityX(0)
        .setCollideWorldBounds(true)

    //agregar goomba
    this.enemy = this.physics.add.sprite(230, config.height - 30, "goomba")
        .setOrigin(0, 1)
        .setGravityY(350)
        .setVelocityX(-50)

    // agregar al mundo colisiones
    this.physics.world.setBounds(0, 0, 2000, config.height);
    this.physics.add.collider(this.mario, this.floor);
    this.physics.add.collider(this.enemy, this.floor);
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);

    //agregar moneda
    this.collectibles = this.physics.add.staticGroup()
    this.collectibles.create(100, 145, 'coin').anims.play('coin-idle', true)
    this.collectibles.create(244, 140, 'coin').anims.play('coin-idle', true)
    this.collectibles.create(200, config.height - 40, 'supermushroom')
    this.physics.add.overlap(this.mario, this.collectibles, collectItem, null, this)

    // camaras
    this.cameras.main.setBounds(0, 0, 2000, config.height);
    this.cameras.main.startFollow(this.mario);

    // teclas
    this.keys = this.input.keyboard.createCursorKeys();

    this.enemy.anims.play('goomba-walk')
} // ejecuta 2do

function addToScore(score, origin, game) {
    const scoreText = game.add.text(
        origin.x,
        origin.y,
        score,
        {
            fontFamily: 'pixel',
            fontSize: config.width / 30
        }
    )
    game.tweens.add({
        targets: scoreText,
        duration: 350,
        y: scoreText.y - 14,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 77,
                alpha: 0,
                onComplete: () => {
                    scoreText.destroy()
                }
            })
        }
    })
}

function collectItem(mario, item) {
    const { texture: { key } } = item

    if (key === 'coin') {
        // otra opcion, disableBody() para que desaparezca
        item.destroy()
        playAudio('coin-pickup', this, { volume: 0.2 })
        addToScore(100, item, this)
    } else if (key === "supermushroom") {
        console.log(mario)
        this.physics.world.pause()
        this.anims.pauseAll()

        mario.isBlocked = true;

        playAudio('powerup', this, { volume: 0.1 })
        addToScore(1000, item, this)
        item.destroy()

        let i = 0;
        const interval = setInterval(() => {
            mario.anims.play(i % 2 == 0 ? 'mario-idle' : 'mario-grown-idle');
            i++;
        }, 100)

        setTimeout(() => {
            mario.setDisplaySize(18, 32)
            mario.body.setSize(18, 32)
            clearInterval(interval)
            mario.isBlocked = false;
            mario.isGrown = true;
            this.physics.world.resume()
            this.anims.resumeAll()
        }, 1000)
    }

}

function onHitEnemy(mario, enemy) {
    if (mario.body.touching.down && enemy.body.touching.up) {
        enemy.anims.play("goomba-dead");

        playAudio('goomba-stomp', this);
        addToScore(200, enemy, this)

        enemy.setVelocityX(0);
        mario.setVelocityY(-200);

        setTimeout(() => {
            enemy.destroy()
        }, 500);
    } else {
        chauMario(this)
    }
}

function update() {
    const { mario } = this;

    if (mario.isDead) return //si esta muerto, dejan de funcionar los controles

    checkControls(this);


    // verifica si mario esta muerto
    if (mario.y >= config.height) {
        chauMario(this);
    }
} // 3ro y continuamente

function chauMario(game) {
    const { mario, scene } = game;


    mario.isDead = true;
    mario.anims.play('mario-dead');
    mario.setCollideWorldBounds(false);

    playAudio('gameover', game, { volume: 0.2 });

    mario.body.checkCollision.none = true;
    mario.setVelocityX(0);

    setTimeout(() => {
        mario.setVelocityY(-350);
    }, 77);
    setTimeout(() => {
        scene.restart();
    }, 2000);
}