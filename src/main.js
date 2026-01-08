/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MAIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Bootloader from './scenes/Bootloader.js';
import Scene01 from './scenes/Scene01.js';
import Scene02 from './scenes/Scene02.js';
import MenuScene from './scenes/MenuScene.js'
import DefeatScene from './scenes/DefeatScene.js';
import VictoryScene from './scenes/VictoryScene.js';
import Scene03 from './scenes/Scene03.js';


const config = {
    title: "Retro City 2077", 
    url: "http://itch.io.es",
    version: "0.0.1",

    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "contenedor",
    pixelArt: true,
    backgroundColor: "#5e3f71",
    physics: {
        default: 'arcade', 
        arcade: {
            debug:true,
         },
        
    },
    

    scene: [Bootloader, MenuScene, DefeatScene, VictoryScene, Scene02, Scene03,Scene01] //Llista d'escenes
};

const game = new Phaser.Game(config);
