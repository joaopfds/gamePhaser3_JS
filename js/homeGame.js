class HomeGame extends Phaser.Scene
{

    constructor()
    {
        super("HomeGame");
    }

    preload()
    {
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
        this.load.image("btnPlay", "assets/jogar.png");
        /*this.load.image("btnPlay", "assets/jogar.png");
        this.load.image("fundo", "assets/fundo.png");
        this.load.image("dudecapa", "assets/dudecapa.png");

        //PlayGame
        this.load.image("star", "assets/star.png");
        this.load.image("starVermelha", "assets/starVermelha.png");
        this.load.image("starCinza", "assets/starCinza.png");
        this.load.image("chao", "assets/chao2.png");
        this.load.image("rock", "assets/rocha.png");
        this.load.image("et1", "assets/inimigo.png");
        this.load.image("et2", "assets/inimigoCobra.png");

        this.load.spritesheet("personagem", "assets/dude.png", {frameWidth:32, frameHeight:48})

        this.load.audio("musica", "assets/music.mp3");
        this.load.audio("som", "assets/coin.mp3");
        
        //EndGame
        this.load.image("btnVoltar", "assets/voltar.png");*/
    }

    create()
    {
        this.add.image(0,0,"fundo").setOrigin(0,0);
        let btnPlay = this.add.image(135,200,"btnPlay").setOrigin(0,0);
        btnPlay.setInteractive();

        this.add.image(320,230,"dudecapa").setOrigin(0,0);
        

        //Adicionar o clique do botao
        btnPlay.on("pointerdown", () => this.scene.start("PlayGame"));
    }
}