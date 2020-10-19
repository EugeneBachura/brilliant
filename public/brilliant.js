var game = new Phaser.Game(800, 600, Phaser.AUTO, "", {
  preload: preload,
  create: create,
  update: update,
});

var sprite_start, sprite_middle, sprite_finish;
var time = 0;

function preload() {
  game.load.spritesheet("bri_start", "./sprites/bri_big_anim_start.png", 392, 372, 4);
  game.load.spritesheet( "bri_middle", "./sprites/bri_big_anim_middle.png", 449, 432, 4);
  game.load.spritesheet( "bri_finish", "./sprites/bri_big_anim_finish.png", 326, 337, 4);
}

function create() {
    sprite_start = game.add.sprite(game.world.centerX, game.world.centerY, "bri_start");
    sprite_start.animations.add("walk");
    sprite_start.animations.play("walk", 5, true);
    sprite_start.anchor.setTo(0.5, 0.5);
    sprite_start.width = 0; sprite_start.height = 0;
  game.time.events.loop(1000, updateTime, this);
  game.add.tween(sprite_start.scale).to({ x: 0.8, y: 0.8 }, 1000, Phaser.Easing.Linear.None, true, 1000, 0);
}

function updateTime() {
  time++;
}

function update() {
  game.debug.text("Time: " + time, 32, 40);
  if (time == 2) if (sprite_middle == null) bri_middle();
  if (time == 3) if (sprite_finish == null) bri_finish();
  if (time == 4) {
      sprite_finish.loadTexture('bri_middle');
      sprite_finish.animations.paused = true; 
    }

}

function bri_finish() {
  sprite_finish = game.add.sprite(game.world.centerX, game.world.centerY, "bri_finish");
  sprite_finish.width = sprite_middle.width;
  sprite_finish.height = sprite_middle.height;
  sprite_finish.anchor.setTo(0.5, 0.5);
  sprite_finish.animations.add("walk");
  sprite_finish.animations.play("walk", 5, true);
  sprite_middle.destroy();
  game.add.tween(sprite_finish).to({ x: 150, y: 100, width: sprite_finish.width*0.15 , height: sprite_finish.height*0.15 }, 1000, Phaser.Easing.Linear.None, true, 0, 0);
}

function bri_middle() {
  sprite_middle = game.add.sprite( game.world.centerX, game.world.centerY, "bri_middle");
  sprite_middle.width = sprite_start.width;
  sprite_middle.height = sprite_start.height;
  sprite_middle.anchor.setTo(0.5, 0.5);
  sprite_middle.animations.add("walk");
  sprite_middle.animations.play("walk", 5, true);
  sprite_start.destroy();
}