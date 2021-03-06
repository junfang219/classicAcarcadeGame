// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    this.x += this.speed * dt;

    // if bugs run out of the right edge, reset to the left
    if (this.x > 510) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 500);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-pink-girl.png';
    }

    update() {
       
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPress) {
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        } 
        else if (keyPress == 'right' && this.x < 405) {
            this.x += 102;
        }
        else if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        }
        else if (keyPress =='down' && this.y < 505) {
            this.y += 83;
        }

        if (this.y < 0) {
            setTimeout(function() {
                player.x = 202;
                player.y = 405;
            }, 600);
        }

        if (this.y > 405) {
            this.y = 405;
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemyPosition = [50, 140, 230];

enemyPosition.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});


var player = new Player(202, 405)

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
