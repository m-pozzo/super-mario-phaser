const config = {
    type: Phaser.AUTO, //1ro intenta webgl, 2do canvas ...
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
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
} // ejecuta 1ro

function create() {
    this.add.image(190, 20, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)

    this.floor = this.physics.add.staticGroup();
    this.floor.create(-32, config.height - 16, "floorbricks").
        setOrigin(0, 0.5)
        .refreshBody()
    this.floor.create(128, config.height - 16, "floorbricks").
        setOrigin(0, 0.5)
        .refreshBody()

    // this.add.tileSprite(0, config.height - 32, config.width, 32, "floorbricks").setOrigin(0, 0)

    // this.mario = this.add.sprite(50, 200, "mario")
    //     .setOrigin(0, 1)
    this.mario = this.physics.add.sprite(50, 10, "mario")
        .setOrigin(0, 1)
        .setGravityY(400)
        .setCollideWorldBounds()

    // agregar al mundo colisiones
    this.physics.add.collider(this.mario, this.floor)

    this.anims.create({
        key: "mario-run",
        frames: this.anims.generateFrameNumbers(
            'mario',
            { start: 3, end: 1 }
        ),
        frameRate: 12, //cuanto dura cada frame
        repeat: -1
    })
    this.anims.create({
        key: "mario-idle",
        frames: [
            { key: "mario", frame: 0 }
        ]
    })
    this.anims.create({
        key: "mario-jump",
        frames: [
            { key: "mario", frame: 5 }
        ]
    })

    this.keys = this.input.keyboard.createCursorKeys();
} // ejecuta 2do

function update() {
    if (this.keys.right.isDown) {
        this.mario.anims.play('mario-run', true);
        this.mario.flipX = false;
        this.mario.x += 1.7;
    }
    else if (this.keys.left.isDown) {
        this.mario.anims.play('mario-run', true);
        this.mario.flipX = true;
        this.mario.x -= 1.7;
    }
    else if (this.keys.space.isDown ) {
        this.mario.setVelocityY(-200)
        this.mario.anims.play('mario-jump', true);
    }
    else if (this.keys.down.isDown) {
        this.mario.y += 5;
    }
    else {
        this.mario.anims.play('mario-idle', true);
    }
} // 3ro y continuamente
