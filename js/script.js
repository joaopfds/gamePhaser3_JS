var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1320,
  height: 630,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

const game = new Phaser.Game(config);
let player;
var cursors;
let sprite;
let weapon;
let fireButton;
var textTela;
var bala, graphics, cursors, camera, inimigos, 
    playerPodeAtirar = 1, textTela, tiro = 100, tileset, logo, 
    map, maxVidas = 3, atualVidas = 1, inimigoVida = 2, et3, ovni1, ovni2, ovni3,ovni4,ovni5, ovni6, ovni7,ovni8,ovni9,ovni10;
var kabum, inimigos = 10, inicio;
var ataque = true, permitiro = false;
var destruiçao;
function preload() {
  this.load.image("tiles", 'assets/tileset (2).png' );
  this.load.tilemapTiledJSON('map','assets/untitled.json');
  this.load.image("bullet", "assets/shmup-bullet.png");
  this.load.image("fim", "assets/gv.png");
  this.load.spritesheet("inicio", "assets/inicio.png",{
    frameWidth: 1000,
    frameHeight: 1000,
  });
  this.load.spritesheet("player", 'assets/airfoce1.png', {
    frameWidth: 40,
    frameHeight: 60,
  });
  this.load.image("kbum", 'assets/kbum.png');
  this.load.spritesheet('ovni', 'assets/ovni2.png', {
    frameWidth: 120,
    frameHeight: 90,
  });
  this.load.spritesheet('ovniBoss', 'assets/blue-ufo.png', {
    frameWidth: 600,
    frameHeight: 100,
  });
  
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("tileset (2)", "tiles");
  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const ground2 = map.createStaticLayer("abjectCollider", tileset, 0, 0);
  const ground3 = map.createStaticLayer("towers", tileset, 0, 0); 
  const ground4 = map.createStaticLayer("towers1", tileset, 0, 0);
  const ground5 = map.createStaticLayer("objectcollider2", tileset, 0, 0);
  inicio = this.physics.add.sprite(600, 300,"inicio").setDepth(10);

  ovni1 = this.physics.add.sprite(600, 600, 'ovni');
  ovni2 = this.physics.add.sprite(1000, 890, 'ovni');
  ovni3 = this.physics.add.sprite(2000, 700, 'ovni');
  ovni4 = this.physics.add.sprite(3600, 500, 'ovni');
  ovni5 = this.physics.add.sprite(4000, 590, 'ovni');
  ovni6 = this.physics.add.sprite(1500, 1000, 'ovni');
  ovni7 = this.physics.add.sprite(1600, 650, 'ovni');
  ovni8 = this.physics.add.sprite(700, 300, 'ovni');
  ovni9 = this.physics.add.sprite(850, 690, 'ovni');
  ovni10 = this.physics.add.sprite(580, 550, 'ovni');
  bala = this.physics.add.sprite('bullet');
  et3 = [ovni1,ovni10,ovni2,ovni3,ovni4,ovni5];
  this.tweens.add({
    targets: et3,
    y: 500,
    duration: 3000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
  this.physics.add.collider(bala, ovni2, hitDeath, null, this);
  
  // --------- player e suas colisoes -----------------
  ground2.setCollisionByProperty({ collider: true });
  player = this.physics.add.sprite(300,300, "player");
  //logo = this.physics.add.sprite(300,300, "kbum");
  destruiçao = this.physics.add.sprite("kbum");
  this.physics.add.collider(player, ground2);
  // ---------------------------------------------------------


  //this.physics.add.collider(ovni2, this.bala, hitDeath, null, this);
  /*this.et3 = map.createFromObjects("enemy", "enemy", {});
  this.et3.forEach((enemy) => {
    this.add.sprite(enemy.x, enemy.y - 15, 'ovni');
  });*/
  
  

  //ground5.setDepth(1); 
  // ---------- camera e HUD ----------------------------
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  textTela = this.add.text(20, 510,'HUD', {
    fontFamily: 'Arial, Gadget, sans-serif',
    fontSize: '22px',
    fontStyle: 'bolder',
    backgroundColor: "#black",
    color: 'orange',
    fill: '#FDFFB5',
  }).setScrollFactor(0).setDepth(1);

  if (this.cameras.main.deadzone){
      graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
  }
  // ----------------------------------------------------------------------------------------------------
  
}


function update() {
  permitiro = true;
  player.body.setVelocity(0);
  player.body.acceleration.set(0);
  player.setAngle(0);
  cursors = this.input.keyboard.createCursorKeys();
  
  if (cursors.space.isDown) {
    inicio.disableBody(true, true);
  }

  if (cursors.left.isDown) {
    permitiro = false;
    player.body.setVelocityX(-250);
    player.setAngle(-180);
  } else if (cursors.right.isDown) {
    permitiro = false;
    player.body.setVelocityX(250);
  } else if (cursors.up.isDown) {
    permitiro = false;
    player.body.setVelocityY(-250);
    player.setAngle(-90);
  } else if (cursors.down.isDown) {
    permitiro = false;
    player.body.setVelocityY(250);
    player.setAngle(90);
  } 
  if (cursors.left.isDown && cursors.up.isDown ) {
    player.body.setVelocityX(-250);
    player.body.setVelocityY(-250);
    player.setAngle(-150);
  } else if (cursors.right.isDown && cursors.up.isDown) {
    player.body.setVelocityX(250);
    player.body.setVelocityY(-250);
    player.setAngle(-20);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    player.body.setVelocityY(250);
    player.body.setVelocityX(-250);
    player.setAngle(-230);
  } else if (cursors.down.isDown && cursors.right.isDown ) {
    player.body.setVelocityY(250);
    player.body.setVelocityX(250);
    player.setAngle(20);
  } else if (cursors.down.isDown && cursors.up.isDown ) {
    player.body.setVelocity(0);
  } else if (cursors.left.isDown && cursors.right.isDown ) {
    player.body.setVelocity(0);
  }

  var cam = this.cameras.main;

    if (cam.deadzone){

        textTela.setText([
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y,
        'deadzone left: ' + cam.deadzone.left,
        'deadzone right: ' + cam.deadzone.right,
        'deadzone top: ' + cam.deadzone.top,
        'deadzone bottom: ' + cam.deadzone.botto

        ]); 
    } 
    else
    {
        textTela.setText([

            '     HUD' + logo + '\n' +
            'Tiros: ' + `∞` + tiro
            + '\n' + 'Vida: ' + atualVidas
            + '\n' + 'inimigos: ' + inimigos,
        ]);
    }

  if(cursors.space.isDown && playerPodeAtirar == 1 && atualVidas != 0 && permitiro == true){ 
       
    bala = this.physics.add.sprite(player.x+37, player.y+5, 'bullet');
    bala.setVelocityX(500);
    playerPodeAtirar = 0; 
    ataque = true;      
    tiro = tiro -5;
    if (tiro < 0){
        playerPodeAtirar = 0;
    }   
    //this.physics.add.collider(this.et3, bala, hitDeath, null, this);

  
  }
  if(cursors.space.isUp /*&& tiro > 0*/){
    playerPodeAtirar = 1;
    /*if(ataque == true ) {
      bala = this.physics.add.sprite(ovni1.x, ovni1.y, 'bullet');
      bala.setVelocityX(-500);
      ataque = false
    }*/
  }
  if (atualVidas== 0) {
    this.add.image(player.x, player.y, "fim").setDepth(10);
  }
  // ------ colisao do tiro com os inimigos ------
  this.physics.add.collider(bala, ovni1, hitDeath, null);  
  this.physics.add.collider(bala, ovni2, hitDeath, null);
  this.physics.add.collider(bala, ovni3, hitDeath, null); 
  this.physics.add.collider(bala, ovni4, hitDeath, null);
  this.physics.add.collider(bala, ovni5, hitDeath, null); 
  this.physics.add.collider(bala, ovni6, hitDeath, null);
  this.physics.add.collider(bala, ovni7, hitDeath, null); 
  this.physics.add.collider(bala, ovni8, hitDeath, null);
  this.physics.add.collider(bala, ovni9, hitDeath, null);
  this.physics.add.collider(bala, ovni10, hitDeath, null);
  //this.physics.add.collider(this.bala, et3, hitDeath, null);
  
  
}
// ----- hit bala nos inimigos ------
function hitDeath (bala, ovni){
  
  ovni.disableBody(true, true);
  bala.disableBody(true, true);
  inimigos -= 1;
  if(inimigos == 0){
    player.disableBody(true, true);
    atualVidas = 0
  }
  /*kabum.disableBody(true,true);
  player.anims.play('turn');
  gameOver = true;*/

}


function kill(bala,ovni){
  ovni.body.acceleration.set(0);
  inimigoVida = inimigoVida - 1;  
  if (inimigoVida == 0){
    ovni.disableBody(true, true);
    bala.disableBody(true, true);
    inimigoVida = 2 
  }

}

/*var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1320,
  height: 630,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  },
};

const game = new Phaser.Game(config);
let player;
var cursors;
let sprite;
let weapon;
let fireButton;
var textTela;
var bala, graphics, cursors, camera, inimigos, 
    playerPodeAtirar = 1, textTela, tiro = 100, tileset, logo, 
    map, maxVidas = 3, atualVidas = 1, inimigoVida = 2, et3, ovni1, ovni2, ovni3,ovni4,ovni5, ovni6, ovni7,ovni8,ovni9,ovni10;
var kabum, inimigos = 10, inicio;
var ataque = true
function preload() {
  this.load.image("tiles", 'assets/tileset (2).png' );
  this.load.tilemapTiledJSON('map','assets/untitled.json');
  this.load.image("bullet", "assets/shmup-bullet.png");
  this.load.image("fim", "assets/gv.png");
  this.load.spritesheet("inicio", "assets/inicio.png",{
    frameWidth: 1000,
    frameHeight: 1000,
  });
  this.load.spritesheet("player", 'assets/airfoce1.png', {
    frameWidth: 40,
    frameHeight: 60,
  });
  this.load.spritesheet("kabum", 'assets/burn.png', {
    frameWidth: 40,
    frameHeight: 60,
  });
  this.load.spritesheet('ovni', 'assets/ovni2.png', {
    frameWidth: 600,
    frameHeight: 100,
  });

  
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("tileset (2)", "tiles");
  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const ground2 = map.createStaticLayer("abjectCollider", tileset, 0, 0);
  const ground3 = map.createStaticLayer("towers", tileset, 0, 0); 
  const ground4 = map.createStaticLayer("towers1", tileset, 0, 0);
  const ground5 = map.createStaticLayer("objectcollider2", tileset, 0, 0);
  inicio = this.physics.add.sprite(600, 300,"inicio").setDepth(10);

  ovni1 = this.physics.add.sprite(600, 600, 'ovni');
  ovni2 = this.physics.add.sprite(1000, 890, 'ovni');
  ovni3 = this.physics.add.sprite(2000, 700, 'ovni');
  ovni4 = this.physics.add.sprite(3600, 500, 'ovni');
  ovni5 = this.physics.add.sprite(4000, 590, 'ovni');
  ovni6 = this.physics.add.sprite(1500, 1000, 'ovni');
  ovni7 = this.physics.add.sprite(1600, 650, 'ovni');
  ovni8 = this.physics.add.sprite(700, 300, 'ovni');
  ovni9 = this.physics.add.sprite(850, 690, 'ovni');
  ovni10 = this.physics.add.sprite(580, 550, 'ovni');
  bala = this.physics.add.sprite('bullet');
  kabum = this.physics.add.sprite(300,300, 'kabum');
  et3 = [ovni1,ovni10,ovni2,ovni3,ovni4,ovni5];
  this.tweens.add({
    targets: et3,
    y: 500,
    duration: 3000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
  this.physics.add.collider(bala, ovni2, hitDeath, null, this);
  
  ground2.setCollisionByProperty({ collider: true });
  player = this.physics.add.sprite(300,300, "player");
  logo = this.physics.add.sprite("player");

  //this.physics.add.collider(ovni2, this.bala, hitDeath, null, this);
  /*this.et3 = map.createFromObjects("enemy", "enemy", {});
  this.et3.forEach((enemy) => {
    this.add.sprite(enemy.x, enemy.y, 'ovni');
  });
  //this.physics.add.collider( this.bala, et3, hitDeath, null, this);
  //this.physics.add.collider(this.et3, bala, hitDeath, null, this);
  this.physics.add.collider(player, ground2);

  ground5.setDepth(1); 
  //this.physics.add.collider(player, ovni1, hitDeath, null, this);
  //this.physics.add.collider(player, ovni2, hitDeath, null, this);
  //ovni = map.createFromObjects("emeny", "emeny", {});
  //this.ovniGroup = new Enemies(this.physics.world, this, [], this.ovni);
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  textTela = this.add.text(20, 510,'HUD', {
    fontFamily: 'Arial, Gadget, sans-serif',
    fontSize: '22px',
    fontStyle: 'bolder',
    backgroundColor: "#black",
    color: 'orange',
    fill: '#FDFFB5',
  }).setScrollFactor(0).setDepth(2);

  if (this.cameras.main.deadzone){
      graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
  }

  
}


function update() {
  
  player.body.setVelocity(0);
  player.body.acceleration.set(0);
  player.setAngle(0);
  cursors = this.input.keyboard.createCursorKeys();
  
  if (cursors.space.isDown) {
    inicio.disableBody(true, true);
  }

  if (cursors.left.isDown) {
    player.body.setVelocityX(-250);
    player.setAngle(-180);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(250);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-250);
    player.setAngle(-90);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(250);
    player.setAngle(90);
  } 
  if (cursors.left.isDown && cursors.up.isDown ) {
    player.body.setVelocityX(-250);
    player.body.setVelocityY(-250);
    player.setAngle(-150);
  } else if (cursors.right.isDown && cursors.up.isDown) {
    player.body.setVelocityX(250);
    player.body.setVelocityY(-250);
    player.setAngle(-20);
  } else if (cursors.down.isDown && cursors.left.isDown) {
    player.body.setVelocityY(250);
    player.body.setVelocityX(-250);
    player.setAngle(-230);
  } else if (cursors.down.isDown && cursors.right.isDown ) {
    player.body.setVelocityY(250);
    player.body.setVelocityX(250);
    player.setAngle(20);
  } else if (cursors.down.isDown && cursors.up.isDown ) {
    player.body.setVelocity(0);
  } else if (cursors.left.isDown && cursors.right.isDown ) {
    player.body.setVelocity(0);
  }

  var cam = this.cameras.main;

    if (cam.deadzone){

        textTela.setText([
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y,
        'deadzone left: ' + cam.deadzone.left,
        'deadzone right: ' + cam.deadzone.right,
        'deadzone top: ' + cam.deadzone.top,
        'deadzone bottom: ' + cam.deadzone.botto

        ]); 
    } 
    else
    {
        textTela.setText([

            '     HUD' + logo + '\n' +
            'Tiros: ' + `∞` + tiro
            + '\n' + 'Vida: ' + atualVidas
            + '\n' + 'inimigos: ' + inimigos,
        ]);
    }

  if(cursors.space.isDown && playerPodeAtirar == 1){ 
       
    bala = this.physics.add.sprite(player.x+37, player.y+5, 'bullet');
    bala.setVelocityX(500);
    playerPodeAtirar = 0; 
    ataque = true;      
    tiro = tiro -5;
    if (tiro < 0){
        playerPodeAtirar = 0;
    }   
    //this.physics.add.collider(this.et3, bala, hitDeath, null, this);

  
  }
  if(cursors.space.isUp /*&& tiro > 0){
    playerPodeAtirar = 1;
    /*if(ataque == true ) {
      bala = this.physics.add.sprite(ovni1.x, ovni1.y, 'bullet');
      bala.setVelocityX(-500);
      ataque = false
    }
  }
  if (atualVidas== 0) {
    this.add.image(player.x, player.y, "fim").setDepth(10);
  }
  // colisao do tiro com os inimigos
  this.physics.add.collider(bala, ovni1, hitDeath, null);  
  this.physics.add.collider(bala, ovni2, hitDeath, null);
  this.physics.add.collider(bala, ovni3, hitDeath, null); 
  this.physics.add.collider(bala, ovni4, hitDeath, null);
  this.physics.add.collider(bala, ovni5, hitDeath, null); 
  this.physics.add.collider(bala, ovni6, hitDeath, null);
  this.physics.add.collider(bala, ovni7, hitDeath, null); 
  this.physics.add.collider(bala, ovni8, hitDeath, null);
  this.physics.add.collider(bala, ovni9, hitDeath, null);
  this.physics.add.collider(bala, ovni10, hitDeath, null); 

  
  
}

function hitDeath (bala, ovni){
  //this.physics.pause();
 // kabum = this.physics.add.sprite(ovni.x, ovni.y, 'kabum');
  
  ovni.disableBody(true, true);
  bala.disableBody(true, true);
  inimigos -= 1;
  if(inimigos == 0){
    player.disableBody(true, true);
    atualVidas = 0
  }
  //kabum.disableBody(true,true);
  //player.anims.play('turn');
 // gameOver = true;

}
function kill(bala,ovni){
  ovni.body.acceleration.set(0);
  inimigoVida = inimigoVida - 1;  
  if (inimigoVida == 0){
    ovni.disableBody(true, true);
    bala.disableBody(true, true);
    inimigoVida = 2 
  }

}*/

/*
function tiro(ovni2){
  bala = his.physics.add.sprite(player.x+37, player.y+5, 'bullet');
  bala.setVelocityX(500);
  if (this.physics.add.overlap(bala, ovni2)){
    ovni2.disableBody(true, true);
  }
}*/











/*let player;
var ship;
var cursors;
let bullets;
var speed;
var stats;
var lastFired = 0;
var txtScore;
var camera;
var et;
var et3;
var textTela;
var bala, shoot, graphics, cursors, collider, camera, inimigos, 
    playerPodeAtirar = 1, textTela, tiro = "infinity", tileset, groud, groud2, 
    map, vidaGroup, maxVidas = 10, atualVidas = 1, nerudoVida = 2;
function preload() {
  this.load.image('tiles', 'assets/tileset (2).png');
  this.load.image('ovni', 'assets/ovni2.png');
  this.load.tilemapTiledJSON('map', 'assets/untitled.json');
  this.load.image('bullet', 'assets/shmup-bullet.png');
  this.load.spritesheet('hawk', 'assets/airfoce1.png', {
    frameWidth: 40,
    frameHeight: 60, 'assets/tileset (2).png' 'assets/untitled.json'
  });
}

function create() {

  var map = this.make.tilemap({ key: 'map' });
  var tileset = map.addTilesetImage('tileset (2)', 'tiles');

  var ground = map.createStaticLayer("ground", tileset, 0, 0);
  var ground2 = map.createDynamicLayer("abjectCollider", tileset, 0, 0);
  var ground3 = map.createStaticLayer("towers", tileset, 0, 0);
  var ground4 = map.createStaticLayer("towers1", tileset, 0, 0);
  var ground5 = map.createStaticLayer("objectcollider2", tileset, 0, 0);


  //player = this.physics.add.sprite(300,300, "hawk");




  var Bullet = new Phaser.Class({

    Extends: Phaser.GameObjects.Image,

    initialize:

      function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

        this.speed = Phaser.Math.GetSpeed(600, 1);
      },

    fire: function (x, y) {
      this.setPosition(x + 50, y);

      this.setActive(true);
      this.setVisible(true);
    },

    update: function (time, delta) {
      this.x += this.speed * delta;

      if (this.y < -10) {
        this.setActive(false);
        this.setVisible(false);
      }
    }

  });

  bullets = this.add.group({
    classType: Bullet,
    maxSize: Infinity,
    runChildUpdate: true
  });

  ship = this.add.sprite(400, 500, 'hawk').setDepth(1);

  et = this.add.image(1400, 300, "ovni");
  et2 = this.add.image(1900, 600, "ovni");

  cursors = this.input.keyboard.createCursorKeys();

  speed = Phaser.Math.GetSpeed(400, 1);
 
  this.cameras.main.setBounds();
  this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  this.cameras.main.startFollow(ship, true);

  camera = this.cameras.main;
  camera.startFollow(ship);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


  //txtScore = this.add.text(50, 50, 'SCORE: 0', { fontSize: '50px', fill: '##d60606' });

  et3 = this.physics.add.group({
    key: 'ovni',
    repeat: 10,
    setXY: { x: 1200, y: 600, stepX: 700 }
  });

  et3.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  this.physics.add.collider(et3, ground2);

  //this.physics.add.overlap(this.bullets, et3, kill, null, this);

  textTela = this.add.text(20, 500,'0', {
    fontFamily: 'Impact, Charcoal, sans-serif',
    fontSize: '22px',
    fill: 'black'
    
  }).setScrollFactor(0);

  if (this.cameras.main.deadzone){
      graphics = this.add.graphics().setScrollFactor(0);
      graphics.lineStyle(2, 0x00ff00, 1);
      graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);      
  }
}

function update(time, delta) {

  if (cursors.left.isDown) {
    ship.x -= 6;
  } else if (cursors.right.isDown) {
    ship.x += 6;
  } else if (cursors.down.isDown) {
    ship.y += 6;
  } else if (cursors.up.isDown) {
    ship.y -= 6;
  }
  if (cursors.left.isDown && cursors.up.isDown ) {
    ship.y -= 2;
    ship.x -= 2;
  } else if (cursors.right.isDown && cursors.up.isDown) {
    ship.y -= 2;
    ship.x += 2;
  } else if (cursors.down.isDown && cursors.left.isDown) {
    ship.y += 2;
    ship.x -= 2;
  } else if (cursors.down.isDown && cursors.right.isDown ) {
    ship.y += 2;
    ship.x += 2;
  } else if (cursors.down.isDown && cursors.up.isDown ) {
    ship.y += 2;
    ship.x += 2;
    ship.y -= 2;
    ship.x -= 2;
  } else if (cursors.left.isDown && cursors.right.isDown ) {
    ship.y += 0;
    ship.x += 0;
  }

  if (cursors.space.isDown && time > lastFired) {
    var bullet = bullets.get();

    if (bullet) {
      bullet.fire(ship.x, ship.y);

      lastFired = time + 250;
    }
  }

  var cam = this.cameras.main;

    if (cam.deadzone){

        textTela.setText([
        'ScrollX: ' + cam.scrollX,
        'ScrollY: ' + cam.scrollY,
        'MidX: ' + cam.midPoint.x,
        'MidY: ' + cam.midPoint.y,
        'deadzone left: ' + cam.deadzone.left,
        'deadzone right: ' + cam.deadzone.right,
        'deadzone top: ' + cam.deadzone.top,
        'deadzone bottom: ' + cam.deadzone.botto

        ]); 
    } 
    else
    {
        textTela.setText([
          'vidas: ' + atualVidas  + '\n' + 'Munição: ' + tiro  ,
        ]);
    }

}*/

