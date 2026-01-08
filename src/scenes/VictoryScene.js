/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ESCENA DE VICTORIA// 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Escena de la pantalla de victoria: Es presionarà enter per carregar el primer nivell

class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
        }

    preload() {

      
    }

    create() {
        //Debug
        console.log('Menu carregat')

        // Musica del Menu 
        this.music = this.sound.add('victoryDefeat');
        this.music.play({loop: true});  

        //Creació de la tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);       

        // Elements del menú
        //Assets del escenari
        //Edificis en primer pla
        this.bg_3 = this.add.image(600,300, 'victoryBg');
        this.bg_3.setScale(2.2,2.2);     

        // Text del joc
        this.titolText = this.add.image(50,130, 'victoryText').setOrigin(0);
        this.titolText.setScale(2,2); 
         //Animació amb tweens
        this.tweens.add({
            targets: this.titolText,
            alpha:0, 
            duration: 2000,
            ease: 'Linear', //Easing
            yoyo: true, 
            repeat: -1
        });      

         //Prem Enter Text
         this.enterText = this.add.image(250,430, 'enterText').setOrigin(0);
         this.enterText.setScale(3,3);
         //Animació del text
         this.tweens.add({
            targets: this.enterText,
            y: 400, 
            duration: 1000,
            ease: 'Power2', //Easing
            yoyo: true, 
            repeat: -1
        });        
    }


    update(){

          // Botó que inicia el primer nivell
          if (this.enterKey.isDown) {
            console.log('es presiona enter i ho detecta correctament')
            this.carregaNivell();              
        }
    };

    //Aquesta és la funció que invocarem per carregar el nivell 1 i aturar la música quan premem enter més adalt
    //Fer-ho directament sense la funció em donava error, donat que carregava el nivell però la música no s'aturaba en carregar la nova escena
    
    carregaNivell(){
        this.scene.start('MenuScene');
        this.game.sound.stopAll();
    }

    // Amb aquesta funció s'anirán generant cotxes a la part de sota del nivell en un interval de temps 
    spawnCotxe(){

        this.cotxePolicia = this.add.image(900,550, 'cotxePolicia');
        this.tweens.add({
            targets:this.cotxePolicia,
            x: -90,
            duration:2000,
            ease: 'Linear',
            onComplete: () => {
                this.cotxePolicia.destroy();
            }

        });

        this.cotxe = this.add.image(1000,500, 'cotxe');
        this.tweens.add({
            targets:this.cotxe,
            x: -90,
            duration:3000,
            ease: 'Linear',
            onComplete: () => {
                this.cotxe.destroy();
            }

        });
        


    };
       

}

export default VictoryScene;
