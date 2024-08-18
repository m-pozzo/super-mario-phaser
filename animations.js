export const createAnimations = (game) => {
    game.anims.create({
        key: "mario-run",
        frames: game.anims.generateFrameNumbers(
            'mario',
            { start: 3, end: 1 }
        ),
        frameRate: 12, //cuanto dura cada frame
        repeat: -1
    })
    game.anims.create({
        key: "mario-idle",
        frames: [
            { key: "mario", frame: 0 }
        ]
    })
    game.anims.create({
        key: "mario-jump",
        frames: [
            { key: "mario", frame: 5 }
        ]
    })
    game.anims.create({
        key: "mario-dead",
        frames: [
            { key: "mario", frame: 4 }
        ]
    })
    game.anims.create({
        key: "mario-grown-idle",
        frames: [
            { key: "mario-grown", frame: 0 }
        ]
    })
    game.anims.create({
        key: "mario-grown-run",
        frames: game.anims.generateFrameNumbers(
            'mario-grown',
            { start: 1, end: 3 }
        )
    })
    game.anims.create({
        key: 'mario-grown-jump',
        frames: [
            { key: 'mario-grown', frame: 5 }
        ]
    })
    game.anims.create({
        key: 'mario-grown-down',
        frames: [
            { key: 'mario-grown', frame: 4 }
        ] 
    })
    game.anims.create({
        key: "goomba-walk",
        frames: game.anims.generateFrameNumbers(
            'goomba',
            { start: 0, end: 1 }
        ),
        frameRate: 8,
        repeat: -1
    })
    game.anims.create({
        key: "goomba-dead",
        frames: [
            { key: 'goomba', frame: 2 }
        ],
    })
    game.anims.create({
        key: 'coin-idle',
        frames: game.anims.generateFrameNumbers(
            'coin',
            { start: 0, end: 3 }
        ),
        frameRate: 10,
        repeat: -1
    })
}