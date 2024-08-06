const config = {
    type: Phaser.AUTO, //1ro intenta webgl, 2do canvas ...
    width: 256,
    height: 244,
    backgorundColor: 'white',
    parent: 'game',
    scene: {
        preload, // se ejecuta para precargar recursos
        create, // se ejecuta cuando el juego comienza
        update // se ejecuta en cada frame
    }
}

function preload(){} // ejecuta 1ro
function create(){} // ejecuta 2do
function update(){} // 3ro y continuamente
