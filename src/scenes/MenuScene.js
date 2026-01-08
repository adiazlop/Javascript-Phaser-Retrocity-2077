/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//MENÚ PRINCIPAL // 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Escena del Menú principal: Es presionarà enter per carregar el primer nivell

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        }

    preload() {

      
    }

    create() {

        //Debug
        console.log('Menu carregat')
        const allFonts = document.fonts;
    console.log([...allFonts.keys()]);

        // Musica del Menu 
        this.music = this.sound.add('musicMenu');
        this.music.play({loop: true});  

        //Creació de la tecla Enter
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
       

        // Elements del menú
        //Assets del escenari
        //Imatge de Fons 
        this.bg_1 = this.add.image(0 , 0, 'bg_1').setOrigin(0);    
        this.bg_1.setScale(3,3);       

        // Text del joc
         this.titolText = this.add.image(50,130, 'titolText').setOrigin(0);
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

        

        //Edificis en segon pla
        this.bg_2 = this.add.image(390,430, 'bg_2');
        this.bg_2.setScale(2,2);
        
        //Edificis en primer pla
        this.bg_3 = this.add.image(340, 490, 'bg_3');
        this.bg_3.setScale(1,1);  
        
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
       
        //Text de les instruccions i controls 
         this.controls = this.add.image(340,500, 'controls').setOrigin(0);
         
       
        //Amb aquest event en el menú anirán passant cotxes en un interval de temps 
        this.time.addEvent({
            delay:4000,
            callback: this.spawnCotxe,
            callbackScope: this,
            loop: true
        });
    }

    update(){

        this.bg_2.x = 390 + this.cameras.main.scrollX * 1; // Ajusta la velocidad del parallax
        this.bg_3.x = 340 + this.cameras.main.scrollX * 1; // Ajusta la velocidad del parallax

          // Botó que inicia el primer nivell
          if (this.enterKey.isDown) {
            console.log('es presiona enter i ho detecta correctament')
            this.carregaNivell();              
                   
            
        }
    };

    //Aquesta és la funció que invocarem per carregar el nivell 1 i aturar la música quan premem enter més adalt
    //Fer-ho directament sense la funció em donava error, donat que carregava el nivell però la música no s'aturaba en carregar la nova escena
    
    carregaNivell(){
        this.scene.start('Scene02');
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

export default MenuScene;
