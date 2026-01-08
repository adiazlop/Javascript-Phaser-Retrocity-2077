//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SCENE02 - CORRESPONENT AL NIVELL 01 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Scene02 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene02' });
        //Puntuació - clase
        this.punts = 0;
    }

    init(){
        console.log('Carregant correctament el Nivell 1');
    }

    preload() {   
    }

    create(){

        //Debug per verificar que es realitza correctament el create
        console.log('Create va bé');

        //Tamany del món i del Nivell
        this.physics.world.setBounds(0, 0, 1600, 600);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ASSETS I PROPS DEL ESCENARI//
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //Fons 1
        this.bg_1 = this.add.image(0 , 0, 'bg_1').setOrigin(0);    
        this.bg_1.setScale(3,3);       
        //Fons 2
        this.bg_2 = this.add.image(0, 0, 'bg_2').setOrigin(0);
        this.bg_2.setScale(3,3); 
        //Fons 3
        this.bg_3 = this.add.image(0, 0, 'bg_3').setOrigin(0);
        this.bg_3.setScale(3,3); 
        //Hotel decoratiu al principi del nivell
        this.hotel01 = this.add.image(-180,320, 'hotel01');
        this.hotel01.setScale(2,2);        

        //Event perque els cotxes vagin passant per el escenari
        //Amb aquest event en el menú anirán passant cotxes en un interval de temps 
        this.time.addEvent({
            delay:4000,
            callback: this.spawnCotxe,
            callbackScope: this,
            loop: true
        });

        const emitter = this.add.particles(0, 0, 'pluja', {
            radial: false, // En indicar false, l'emitter deixa de emetre en forma circular
            x: { min: -400, max: 1800 }, // Aquesta es la zona que abarca l'emisió de partícules 
            y: -200, // la posició en l'eix Y de l'emitter
            lifespan: 6000, // La vida de les partícules 
            speed: 200, // velocitat de les partícules 
            scale: { start: 0.5, end: 0.1 }, // Tamany de les partícules 
            quantity:5, //Escala de la quantitat de partícules que s'emeten (no s'emeten només 5...)
            accelerationY:500,// Acceleració en l'eix Y de les partícules 
            angle: {min:90, max:180}, //Angle de les emisions, el vaig modificar per simular l'orientació del vent
            blendMode: "ADD", // Modalitat de Blend
            gravityY: 100 // Gravetat en l'eix Y en la simulació de les partícules 
          });

          //Text de la puntuació
          this.puntsText = this.add.text(-250, 50, 'Punts: ' + this.punts, { fontSize: '50px', fill: '#add8e6',});
          this.puntsText.setScrollFactor(1);           

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //PLATAFORMES// 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        /*Per aclarir, he tingut problemes per exportar el mapa de tiled, per tant vaig decidir crear les plataformes de manera individual per muntar el nivell. 
        A tiled creava la plataforma, la exportava com png i amb codi definia el tamany del collider i del seu offset
        per finalment a create crear la plataforma on volgués*/ 

        //PLATAFORMA02//
        
        this.plataforma02 = this.physics.add.staticGroup(); //Fent-lo estatic no es pot moure i amb this.physics.add afegim físiques a l'objecte 
        this.plataforma02.create(200, 500, 'plataforma02').setScale(2);
        this.plataforma02.create(600, 550, 'plataforma02').setScale(2);        
        //Tamany del collider de la Plataforma02 i la seva configuració
        var plataforma02ColliderWidth = 265;
        var plataforma02ColliderHeight = 100;
        const plataforma02ColliderOffsetX = -50;
        const plataforma02ColliderOffsetY = 15;
        //Aquest codi aplica el tamany dels colliders a totes les plataformes02
        this.plataforma02.children.iterate(plataforma => 
            {
            plataforma.setSize(plataforma02ColliderWidth, plataforma02ColliderHeight);
            plataforma.setOffset(plataforma02ColliderOffsetX, plataforma02ColliderOffsetY);
            plataforma.body.debugShowBody = false
            });

        //PLATAFORMA03// 
        this.plataforma03 = this.physics.add.staticGroup();
        this.plataforma03.create(1400, 500, 'plataforma03').setScale(2);
        this.plataforma03.create(1000, 550, 'plataforma03').setScale(2); 

        //Tamany del collider de la Plataforma02 i la seva configuració
        var plataforma03ColliderWidth = 265;
        var plataforma03ColliderHeight = 100;
        const plataforma03ColliderOffsetX = -50;
        const plataforma03ColliderOffsetY = 15;

        //Aquest codi aplica el tamany dels colliders a totes les plataformes02
        this.plataforma03.children.iterate(plataforma => {
            plataforma.setSize(plataforma03ColliderWidth, plataforma03ColliderHeight);
            plataforma.setOffset(plataforma03ColliderOffsetX, plataforma03ColliderOffsetY);
            plataforma.body.debugShowBody = false
        });
              
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ASSETS DEL PERSONATGE// 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //Jugador 
        var player = this.player = this.physics.add.sprite(100, 325, 'idle').setScale(2);
        //Codi de seguiment de la càmera al jugador
        this.cameras.main.startFollow(this.player);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(700);
        this.physics.add.collider(this.player,this.plataforma02,);
        this.physics.add.collider(this.player, this.plataforma03,);
        this.physics.add.collider(this.player, this.moto);
        this.physics.add.collider(this.player, this.finalNivell);       
        
        //Codi perque no es mostri la hitbox del jugador
        this.player.setDebug(false);
        // Tamany del collider
        var colliderWidth = 15;
        var colliderHeight = 55; 
        this.player.setSize(colliderWidth, colliderHeight);
        // Offset del collider
        var colliderOffsetX = 30; 
        var colliderOffsetY = 13; 
        this.player.setOffset(colliderOffsetX, colliderOffsetY);
        
        //Animació del sprite - IDLE
        this.anims.create({
            key:'idlePersonatge',
            frames: this.anims.generateFrameNumbers('idle',{
            start: 0, 
            end: 3}),
            repeat: -1,
            frameRate:7
        })
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ANIMACIONS// 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        this.player.anims.play('idlePersonatge', this.player); 
        
        //Animació del sprite - WALK
        this.anims.create({
            key:'runPersonatge',
            frames: this.anims.generateFrameNumbers('run',{
            start: 0, 
            end: 7}),
            repeat: -1,
            frameRate:7
        })            

        //Animació de disparar
        this.anims.create({
            key: 'disparar',
            frames: this.anims.generateFrameNumbers('disparar',{
                start: 0, 
                end: 0}),
                repeat: -4,
                frameRate:7
        })    
       
        //Animació de salt
        this.anims.create({
            key:'jumpPersonatge',
            frames: this.anims.generateFrameNumbers('jump',{
            start: 0, 
            end: 4}),
            repeat: -4,
            frameRate:7
        })           

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //MUSICA// 
        //Reproducció de la música - Treure comentaris per que es reprodueixi
        const musicLevel02 = this.sound.add('musicLevel02');
        musicLevel02.play();        
        musicLevel02.play({loop: true}); 
        
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //CONTROL
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Codi de control, amb teclat
        this.cursors = this.input.keyboard.createCursorKeys();

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //ENEMICS
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        var drone = this.drone = this.physics.add.image(800, 175, 'drone').setScale(1.3);
        this.rangPatrulla = { minX: -800, maxX: -800 }; // Aqui inserim un codi perque el dron segueixi una patrulla 
        this.velocitatPatrulla = 50;
        this.physics.add.collider(this.drone, this.player);
        this.drone.body.debugShowBody = false; // Això fa invisible els colliders
        this.drone.iniciX = this.drone.x;

        setInterval(() => {
            this.velocitatPatrulla *= -1; // Invertir la dirección del dron
            //this.drone.setAngle(this.drone.angle + 180);
            this.drone.setFlipX(!this.drone.flipX);
        }, 3000);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //POWER UPS// 
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        //Creació dels recolectables 
        this.powerUp = this.physics.add.group();

        //PowerUps col·locats al llarg del nivell
        this.powerUp.create(200, 350, 'powerUp');//1
        this.powerUp.create(600, 400, 'powerUp');//2
        this.powerUp.create(1000, 400, 'powerUp');//3
        this.powerUp.create(1400, 350, 'powerUp');//4

        //Recolecció de Power Ups
         this.physics.add.collider(this.player, this.powerUp, this.collectPowerUp, null, this); 
         this.powerUp.children.iterate(powerUp => {
            powerUp.body.debugShowBody = false; // Això fa invisible els colliders 
        });    

        //Zona de Final de Nivell
        this.finalNivell = this.physics.add.group();//La posisició final es 1600,290
        let zonaFinal = this.finalNivell.create(1600,290, 'moto').setScale(2,2);        
        this.physics.add.collider(this.player, this.finalNivell, this.carregaNivell, null, this);
        zonaFinal.body.debugShowBody = false;//visibilitat del collider

        //Zona de Game Over 
        this.gameOverZone = this.physics.add.group();//La posisició final es 1600,290
        let gameOverZone = this.gameOverZone.create(0,600, 'plataforma').setScale(300,1);        
        this.physics.add.collider(this.player, this.gameOverZone, this.gameOver, null, this);
        gameOverZone.body.debugShowBody = false; //visibilitat del collider
        this.gameOverZone.setAlpha(0); //Fa invisible el sprite de plataforma utilitzat per fer el numeret
    }

    update(){

    //Codi de seguiment de la càmera 
    this.cameras.main.scrollX = this.player.x - this.cameras.main.width * 0.5;
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height * 0.5;
    this.bg_1.x = this.cameras.main.scrollX + this.cameras.main.width * 0;
    this.bg_1.y = this.cameras.main.scrollY + this.cameras.main.height * 0;
    //Amb aquest codi la puntuació segueix la camera
    this.puntsText.x = this.cameras.main.scrollX + 20;
    this.puntsText.y = this.cameras.main.scrollY + 20;

     // Velocitat de moviment en parallaz
     const parallaxSpeed = 0.5; 
     const bg2ScrollX = this.cameras.main.scrollX * parallaxSpeed;
     const bg2ScrollY = this.cameras.main.scrollY * parallaxSpeed;
 
    //Posició fons 2
     this.bg_2.x = bg2ScrollX;
     this.bg_2.y = bg2ScrollY;

    // EPosició fons 3
    this.bg_3.x = bg2ScrollX;
    this.bg_3.y = bg2ScrollY;

    // Enemic Drone i Patrulla 
    if (this.drone.x <= this.rangPatrulla.minX) {
        this.drone.setVelocityX(this.velocitatPatrulla);
    } else if (this.drone.x >= this.rangPatrulla.maxX) {
        this.drone.setVelocityX(-this.velocitatPatrulla);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Moviment del jugador i lógica 
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160);
    console.log('es prem esquerra');
    this.player.anims.play('runPersonatge', true);
    this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(160);
    console.log('es prem dreta');
    this.player.anims.play('runPersonatge', true);
    this.player.setFlipX(false);
    } else {
    this.player.setVelocityX(0);
    this.player.anims.play('idlePersonatge', true);
    }

    // Salt
    if (this.cursors.space.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-400);
    console.log('Saltant');
    this.player.anims.play('jumpPersonatge', true);
    }

    //Overlap per verificar si el jugador i el collider estan collisionant
    if (this.physics.overlap(this.player, this.plataforma02)) {
        //Codi que determina si player i l'altre objecte estan solapant-se
        console.log('El jugador i la plataforma2 estan en contacte');this.plataforma02
    }

    //Disparar
    if (/*this.cursors.shift.isDown*/this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),)) {
        console.log('Disparant: Pium Pium');
        this.player.anims.play('disparar', true);
        }    
   }
   
    // Funció per la recolecció de Power Ups
    collectPowerUp(player, powerUp)
    {
    powerUp.disableBody(true, true);
    console.log('has aconseguit un power up!')
    //puntuació
    this.punts +=10;
    this.puntsText.setText('Punts: ' + parseFloat(this.punts));
    }

    spawnCotxe(){

        this.cotxePolicia = this.add.image(1000,50, 'cotxePolicia');
        this.tweens.add({
            targets:this.cotxePolicia,
            x: -90,
            duration:2000,
            ease: 'Linear',
            onComplete: () => {
                this.cotxePolicia.destroy();
            }
        });

        this.cotxe = this.add.image(1000,100, 'cotxe');
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

    carregaNivell(){
        console.log('Has arribat al final del nivell');
        this.scene.start('Scene03', { punts: this.punts });
        this.game.sound.stopAll();
    }

    gameOver(){
        console.log('Has mort');
        this.scene.start('DefeatScene');
        this.game.sound.stopAll();
    }
}
export default Scene02;