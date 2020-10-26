var game;

window.onload = function()
{
    let gameConfig = 
    {   type: Phaser.AUTO,
        scale:{
            width: 1320,
            height: 630,
            autoCenter:Phaser.Scale.CENTER_BOTH
        },
        physics:{
            default:'arcade',
            arcade: {
                gravity: { y: 0 },
            }
        },
        backgroundColor: '#9FFB98',
        scene:[HomeGame, PlayGame, EndGame]
    };
    game = new Phaser.Game(gameConfig);

    window.focus();
}
