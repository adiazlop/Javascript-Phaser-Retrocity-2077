/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BOOTLOADER O PANTALLA DE CÀRREGA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//La clase Bootloader ens permet carregar arxius o plugin  directaments sense haver-los de cargar a les escenes directament 

class Bootloader extends Phaser.Scene {
    constructor() {
        super ({
            key: 'Bootloader'
        });
    }
    
init (){
    //Debug realitzat per comprobar que funciona bé el Bootloader
    console.log('Bootloader carregat correctament');    
}

preload (){
    console.log('Preload va bé');
  
    ///////////////////////Fons d'escenari/////////////////////
    this.load.image('bg_1', './assets/environment/bg-1.png',)
    this.load.image('bg_4', './assets/environment/bg-4.png',)
    //Fons de victoria i derrota
    this.load.image('victoryBg', './assets/environment/victory-bg.png',)
    this.load.image('defeatBg', './assets/environment/defeat-bg.png',)
    // Text del joc
    this.load.image('titolText', './assets/sprites/title-screen2.png',)
    this.load.image('enterText', './assets/sprites/press-enter-text.png',)
    this.load.image('defeatText', './assets/sprites/defeat-text.png',)
    this.load.image('victoryText', './assets/sprites/victory-text.png',)  
    this.load.image('controls', './assets/sprites/instructions.png')

    //Fons per efecte parallax
    this.load.image('bg_2', './assets/environment/bg-2.png',)
    this.load.image('bg_3', './assets/environment/bg-3.png',)
    
    //Carrega la plataforma temporal per el prototip
    this.load.image('plataforma', './assets/sprites/instructions2.png',)
    
    //Carrega de les plataformes definitives
    this.load.image('plataforma02', './assets/maps/plat02.png',)
    this.load.image('plataforma03', './assets/maps/plat03.png',)
    this.load.image('plataforma04', './assets/sprites/vehicles/v-truck.png')

    //Hotel Inici Nivell
    this.load.image('hotel01', './assets/maps/hotel01.png',)

    //Cotxes 
    this.load.image('cotxe', './assets/sprites/vehicles/v-red.png',)
    this.load.image('cotxePolicia', './assets/sprites/vehicles/v-police.png',)
    this.load.image('moto', './assets/sprites/vehicles/v-yellow.png',)

    //Sprites dels enemics
    this.load.image('drone', './assets/sprites/misc/drone/drone-1.png');

    //Efectes de partícules
    this.load.image('pluja', './assets/sprites/misc/shot-hit/shot-hit-1.png');

    //Tilemaps 
    this.load.image('tileset', './assets/atlas/Scene01/tileset.png');
    this.load.tilemapTiledJSON('tilejson', './assets/atlas/Scene01/map01.tmj');

    //////////////////////Carrega dels spritesheets de les animacions del jugador /////////////////////   
    //Idle Animation
    this.load.spritesheet('idle', './assets/SPRITESHEETS/player/idle.png', {
        frameWidth: 67, //amplada frames
        frameHeight: 67, // alçada frames
        //margin: 1,
        spacing:4 //espaiat entre els frames, sino hi ha valor, hi ha un desplaçament entre ells
    });
    //Run Animation
    this.load.spritesheet('run', './assets/SPRITESHEETS/player/run.png', {
        frameWidth: 67, //amplada frames
        frameHeight: 67, // alçada frames
        //margin: 1,
        spacing:4 //espaiat entre els frames, sino hi ha valor, hi ha un desplaçament entre ells
    })
    // Jump Animation
    this.load.spritesheet('jump','./assets/SPRITESHEETS/player/jump.png',{
        frameWidth: 67, //amplada frames
        frameHeight: 67, // alçada frames
        //margin: 1,
        spacing:4 //espaiat entre els frames, sino hi ha valor, hi ha un desplaçament entre ells
    })

    this.load.spritesheet ('disparar','./assets/SPRITESHEETS/player/shoot.png', {
        frameWidth: 67, //amplada frames
        frameHeight: 67, // alçada frames
    })    
    
    ///////////////////////Carrega dels Audios/////////////////////
    //Musica Menu Principal
    this.load.audio('musicMenu', ['./assets/sounds/cyberpunk city 2.ogg']);

    //Musica Pantalles Victoria i Game Over
    this.load.audio('victoryDefeat', ['./assets/sounds/victory-defeat.ogg']);

    // Musica Nivell01
    this.load.audio('musicLevel01', ['./assets/sounds/sci_fi_platformer02.ogg']);
    
    //Musica Nivell02
    this.load.audio('musicLevel02', ['./assets/sounds/cyber city 2-b.ogg']);

    //Power Ups que recollirá el personatge 
    this.load.image('powerUp', './assets/sprites/powerups/shard_01a.png');

    //Menú de càrrega
    this.load.on('complete', () => {
        this.scene.start('MenuScene');
    });    
}

create(){

    //this.scene.start('Scene01');
}

}
export default Bootloader;