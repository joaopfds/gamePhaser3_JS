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
    playerPodeAtirar = 1, textTela, tiro = 5, tileset, logo, 
    map, maxVidas = 3, vidas = 1, inimigoVida = 5, et3, ovni1, ovni2, ovni3,ovni4,ovni5, ovni6, ovni7,ovni8,ovni9,ovni10,ovni11,ovni12;
var kabum, inimigos = 10, inicio;
var ataque = true, permitiro = false;
var destruiçao;
var ammo1, ammo2;
var ground2;
function preload() {
  this.load.image("tiles", 'assets/tileset (2).png' );
  this.load.tilemapTiledJSON('map','assets/untitled.json');
  this.load.image("bullet", "assets/shmup-bullet.png");
  this.load.image("fim", "assets/gv.png");
  this.load.spritesheet("ammo", "assets/ammoBox.png",{
    frameWidth: 1000,
    frameHeight: 1000,
  });
  
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
  ground2 = map.createStaticLayer("abjectCollider", tileset, 0, 0);
  const ground3 = map.createStaticLayer("towers", tileset, 0, 0); 
  const ground4 = map.createStaticLayer("towers1", tileset, 0, 0);
  const ground5 = map.createStaticLayer("objectcollider2", tileset, 0, 0);
  inicio = this.physics.add.sprite(600, 300,"inicio").setDepth(10);

  // ----------------------- inimigos e suas movimentaçoes ---------------
  ovni1 = this.physics.add.sprite(600, 600, 'ovni');
  ovni2 = this.physics.add.sprite(1000, 890, 'ovni');
  ovni3 = this.physics.add.sprite(2000, 700, 'ovni');
  ovni4 = this.physics.add.sprite(3600, 500, 'ovni');
  ovni5 = this.physics.add.sprite(4000, 590, 'ovni');
  ovni6 = this.physics.add.sprite(1500, 1000, 'ovni');
  ovni7 = this.physics.add.sprite(2600, 650, 'ovni');
  ovni8 = this.physics.add.sprite(2300, 300, 'ovni');
  ovni9 = this.physics.add.sprite(850, 690, 'ovni');
  ovni10 = this.physics.add.sprite(3000, 550, 'ovni');
  ovni11 = this.physics.add.sprite(1800, 300, 'ovniBoss');
  ovni12 = this.physics.add.sprite(3200, 550, 'ovniBoss');
  bala = this.physics.add.sprite('bullet');
  et3 = [ovni1,ovni6,ovni8,ovni7,ovni10,ovni2,ovni3,ovni4,ovni5,ovni11,ovni12];
  this.tweens.add({
    targets: et3,
    y: 800,
    duration: 4000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });
  
  this.physics.add.collider(bala, ovni2, hitDeath, null, this);
  //---------------------------------------------------------------------------
  
  // --------- player e suas colisoes/ municao -----------------
  ground2.setCollisionByProperty({ collider: true });
  player = this.physics.add.sprite(300,300, "player");
  //logo = this.physics.add.sprite(300,300, "kbum");
  //destruiçao = this.physics.add.sprite("kbum");
  ammo1 = this.physics.add.sprite(3200,1350, 'ammo');
  ammo2 = this.physics.add.sprite(500,800, 'ammo');
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
  ladoTiro = 500;
  if (cursors.space.isDown) {
    inicio.disableBody(true, true);
  }
// -------- player movimentacaes ---------------------
  if (cursors.left.isDown) {
    //permitiro = false;
    ladoTiro = -500;
    player.body.setVelocityX(-250);
    player.setAngle(-180);
  } else if (cursors.right.isDown) {
    //permitiro = false;
    ladoTiro = 500;
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
//------------------------------------------------------------------------------------

// ------------ ---------------------HUD -----------------------------------------------
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

            '     HUD' + '\n' +
            'Tiros: ' + `∞` + tiro
            + '\n' + 'Vida: ' + vidas
            + '\n' + 'inimigos: ' + inimigos,
        ]);
    }
  //-------------------------------------------------------------------------------------  

  if(cursors.space.isDown && playerPodeAtirar == 1 && vidas != 0 && permitiro == true){ 
       
    bala = this.physics.add.sprite(player.x+37, player.y+5, 'bullet');
    bala.setVelocityX(ladoTiro);
    playerPodeAtirar = 0; 
    ataque = true;      
    tiro = tiro -1;
    if (tiro < 1){
        playerPodeAtirar = 0;
    }   
    //this.physics.add.collider(this.et3, bala, hitDeath, null, this);

  
  }
  if(cursors.space.isUp && tiro > 0){
    playerPodeAtirar = 1;
    /*if(ataque == true ) {
      bala = this.physics.add.sprite(ovni1.x, ovni1.y, 'bullet');
      bala.setVelocityX(-500);
      ataque = false
    }*/
  }
  if (vidas== 0) {
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
  this.physics.add.collider(bala, ovni11, kill, null);
  this.physics.add.collider(bala, ovni12, kill, null);
  //this.physics.add.collider(this.bala, et3, hitDeath, null);
  
  this.physics.add.collider(ammo1, player, ganhaBala, null);
  this.physics.add.collider(ammo2, player, ganhaBala, null);
  this.physics.add.collider(bala, ground2, someBala, null);
}
// ----- hit bala nos inimigos ------
function hitDeath (bala, ovni){
  
  ovni.disableBody(true, true);
  bala.disableBody(true, true);
  inimigos -= 1;
  if(inimigos == 0){
    player.disableBody(true, true);
    vidas = 0
  }
  /*kabum.disableBody(true,true);
  player.anims.play('turn');
  gameOver = true;*/

}
function ganhaBala(ammo){
  tiro = tiro += 15;
  ammo.disableBody(true,true);
}

function someBala(ammo){
  ammo.disableBody(true,true);
}

function kill(bala,ovni){
  ovni.body.setVelocity(0);
  ovni.body.acceleration.set(0);
  inimigoVida = inimigoVida - 1; 
  bala.disableBody(true, true); 
  if (inimigoVida == 0){
    ovni.disableBody(true, true);
    inimigoVida = 5 
  }

}