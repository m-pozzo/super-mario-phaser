const INIT_SPRITESHEETS = [
    {
        id: 'mario',
        path: 'assets/entities/mario.png',
        frameWidth: 18,
        frameHeight: 16
    },
    {
        id: 'goomba',
        path: 'assets/entities/overworld/goomba.png',
        frameWidth: 16,
        frameHeight: 16
    },
    {
        id: 'coin',
        path: 'assets/collectibles/coin.png',
        frameWidth: 16,
        frameHeight: 16
    }
]

export const getSpritesheets = ({ load }) => {
    INIT_SPRITESHEETS.forEach(({ id, path, frameHeight, frameWidth }) => {
        load.spritesheet(id, path, { frameWidth, frameHeight });
    })
}