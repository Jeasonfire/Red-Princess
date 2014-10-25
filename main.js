var WIDTH = 960;//240;
var HEIGHT = 540;//135;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'gameDiv', {preload: 
    preload, create: create, update: update});

function preload() {
    game.load.tilemap("level", "assets/levels/map.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image("sheet", "assets/gfx/sheet.png", 64, 64);
    game.load.spritesheet("player", "assets/gfx/player.png", 128, 128);
    game.load.image("background", "assets/gfx/background.png");
};

// Map
var map;
var layerBackground;
var layerPlayer;
var layerForeground;

// Player
var player;
var playerJumpTime = 0;
var playerDir = "right";

// Constants
var PLAYER_SPEED = 400;
var PLAYER_SPEED_RUN = 750;
var PLAYER_MAX_FALLING_SPEED = 800;
var PLAYER_JUMP_SPEED = -900;
var PLAYER_JUMP_HOLD_TIME = 200;
var GRAVITY = 2600;

// Controls var leftButton; var rightButton; var jumpButton;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = "#000000";

    // Map
    map = game.add.tilemap("level");
    map.addTilesetImage("sheet");
    map.setCollisionByExclusion([], true, "Player");
    // Background layer
    layerBackground = map.createLayer("Background", map.widthInPixels, map.heightInPixels);
    layerBackground.fixedToCamera = false;
    // Collide layer
    layerPlayer = map.createLayer("Player", map.widthInPixels, map.heightInPixels);
    layerPlayer.fixedToCamera = false;
    layerPlayer.resizeWorld();
    // Foreground layer
    layerForeground = map.createLayer("Foreground", map.widthInPixels, map.heightInPixels);
    layerForeground.fixedToCamera = false;

    // Player
    player = game.add.sprite(0, 0, "player");
    game.physics.enable(player, Phaser.Physics.ARCADE);
    //player.body.collideWorldBounds = true;
    player.animations.add("moveRight", [0, 1, 2, 1], 6, true);
    player.animations.add("moveLeft", [5, 4, 3, 4], 6, true);
    player.animations.add("standStill", [6], 10, true);
    player.animations.add("jumpRight", [7, 8, 9, 8], 9, true);
    player.animations.add("jumpLeft", [12, 11, 10, 11], 9, true);
    player.animations.add("jumpStill", [13, 14, 15], 9, true);
    player.animations.add("runRight", [16, 17, 18, 17], 11, true);
    player.animations.add("runLeft", [21, 20, 19, 20], 11, true);
    player.animations.add("flyRight", [22, 23, 24, 23], 11, true);
    player.animations.add("flyLeft", [27, 26, 25, 26], 11, true);
    player.body.setSize(48, 116, 40, 12);
    player.body.maxVelocity.y = PLAYER_MAX_FALLING_SPEED;
    player.frame = 6;

    // Gravity
    game.physics.arcade.gravity.y = GRAVITY;
}

function update() {
    // Physics
    game.physics.arcade.collide(player, layerPlayer);

    // Controls
    // Running
    var playerVel = PLAYER_SPEED;
    if (isRunKeyDown()) {
        playerVel = PLAYER_SPEED_RUN;
    }
    // Left/right movement
    if (isLeftKeyDown() && !isRightKeyDown()) {
        player.body.velocity.x = -playerVel;
    } else if (isRightKeyDown() && !isLeftKeyDown()) {
        player.body.velocity.x = playerVel;
    } else {
        player.body.velocity.x = 0;
    }
    // Jumping
    if (isUpKeyDown() && player.body.onFloor()) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
        playerJumpTime = game.time.now + PLAYER_JUMP_HOLD_TIME;
    }
    if (isUpKeyDown() && !player.body.onFloor() && game.time.now < playerJumpTime) {
        player.body.velocity.y = PLAYER_JUMP_SPEED;
    }

    // Animations
    var velX = player.body.velocity.x;
    var velY = player.body.velocity.y;
    var inAir = !player.body.onFloor();
    var lastPlayerDir = playerDir;

    if (velX < 0) {
        // Moving left
        if (playerDir != "moveLeft" && velX == -PLAYER_SPEED && !inAir) {
            playerDir = "moveLeft";
        } else if (playerDir != "runLeft" && velX == -PLAYER_SPEED_RUN && !inAir) {
            playerDir = "runLeft";
        } else if (playerDir != "jumpLeft" && velX == -PLAYER_SPEED && inAir) {
            playerDir = "jumpLeft";
        } else if (playerDir != "flyLeft" && velX == -PLAYER_SPEED_RUN && inAir) {
            playerDir = "flyLeft";
        }
    } else if (velX > 0) {
        // Moving right
        if (playerDir != "moveRight" && velX == PLAYER_SPEED && !inAir) {
            playerDir = "moveRight";
        } else if (playerDir != "runRight" && velX == PLAYER_SPEED_RUN && !inAir) {
            playerDir = "runRight";
        } else if (playerDir != "jumpRight" && velX == PLAYER_SPEED && inAir) {
            playerDir = "jumpRight";
        } else if (playerDir != "flyRight" && velX == PLAYER_SPEED_RUN && inAir) {
            playerDir = "flyRight";
        }
    } else {
        // Standing still
        if (playerDir != "standStill" && !inAir) {
            playerDir = "standStill";
        } else if (playerDir != "jumpStill" && inAir) {
            playerDir = "jumpStill";
        }
    }
    // If animation changed, play it
    if (lastPlayerDir != playerDir) {
        player.animations.play(playerDir);
    }

    // Focus camera on player
    game.camera.focusOnXY(player.body.x + 32, player.body.y + 32);
}

// Controls

function isLeftKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.A);
    return isDown;
}

function isRightKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.D);
    return isDown;
}

function isUpKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    return isDown;
}

function isRunKeyDown() {
    var isDown = false;
    isDown = game.input.keyboard.isDown(Phaser.Keyboard.SHIFT);
    return isDown;
}