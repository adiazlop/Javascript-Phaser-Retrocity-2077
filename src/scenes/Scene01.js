/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SCENE01 - LA ESCENA DE L'EAF 3, QUE SERVIA PER PROTOTIPAR I GENERAR LES MECÀNMIQUES DEL JUGADOR//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Scene01 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene01' });
    }

    init(){
        console.log('Carregant escena 1');
    }

    preload() {        
    }

    create(){

        //Debug per verificar que es realitza correctament el create
        console.log('Create va bé');
        
        //Assets del escenari
        //Fons
        this.bg_1 = this.add.image(0 , 0, 'bg_1').setOrigin(0);    
        this.bg_1.setScale(3,3);       

        //Plataformes temporals per el prototip 
        //amb this.physics.add afegim físiques a l'objecte i amb set.Immovable(true) fem que les interaccions no el fagin moure
        this.plataforma = this.physics.add.staticGroup();
        this.plataforma.create(600, 500, 'plataforma').setScale(1);
        this.plataforma.create(400, 450, 'plataforma').setScale(1);        
        this.plataforma.create(200, 480, 'plataforma').setScale(1);        
       
        //Assets del personatge
        //Jugador 
        var player = this.player = this.physics.add.sprite(200, 300, 'idle').setScale(2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(700);
        this.physics.add.collider(this.player,this.plataforma,);
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

     
        //Reproducció de la música - Treure comentaris per que es reprodueixi
        const musicLevel01 = this.sound.add('musicLevel01');
        musicLevel01.play();

        this.player.anims.play('idlePersonatge', this.player);        
        
        //Atles 
        //this.atles = this.add.sprite(100,100, 'atles', )
    
        //Sprites del personatge
        //Com que el pack d'assets ja em portaba els assets retallats, els vaig importar directament
        
        // Codi de control, amb teclat
        this.cursors = this.input.keyboard.createCursorKeys();

        //Creació dels recolectables 
        this.powerUp = this.physics.add.group({
            key: 'powerUp', 
            repeat: 2, 
            setXY: {x:150, y: 350, stepX: 200} //On apareix
        });

        //Recolecció de Power Ups
         this.physics.add.collider(this.player, this.powerUp, this.collectPowerUp, null, this);

              
    }

    update(){

    // Moviment del jugador
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
    if (this.cursors.space.isDown && this.player.body.touching.down) 
    {this.player.setVelocityY(-400);
    console.log('Saltant');
    this.player.anims.play('jumpPersonatge', true);
    }

    //Overlap per verificar si el jugador i el collider estan collisionant

    if (this.physics.overlap(this.player, this.plataforma)) {
        // Código a ejecutar si los objetos están tocándose
        console.log('El jugador i la plataforma estan en contacte');
    }


    //Disparar
    if (/*this.cursors.shift.isDown*/this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),)) {
        console.log('Disparant: Pium Pium');
        this.player.anims.play('disparar', true);
        }   
        
    }
    // Funció per la recolecció de Power Ups
    collectPowerUp(player, powerUp){

    powerUp.disableBody(true, true);
    console.log('has aconseguit un power up!')
    //puntuació
    //punts +=10;
    //setPunts.setText('Puntuacio' + punts);
    //if (powerUp.countActive(true) == 0)-    

    }

}

export default Scene01;
