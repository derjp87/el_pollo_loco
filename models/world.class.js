class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    lifeBar = new StatusBar(20, 0, 100, 1);
    bottleBar = new StatusBar(500, 0, 1, 2);
    bossBar = new StatusBar(3750, 50, 100, 3);
    throwableObjects = [];
    collectedBottles = [];
    collect_bottle_sound = new Audio('audio/bottle_collect.mp3');
    throw_bottle_sound = new Audio('audio/bottle_throw.mp3');
    won_sound = new Audio('audio/won.mp3');
    lost_sound = new Audio('audio/lost.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollisions();    
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 25);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if(this.keyboard.D && this.collectedBottles.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles.pop();
            this.bottleBar.setPercentage(this.collectedBottles.length * 5);
            this.throw_bottle_sound.play();
        }
    }

    checkCollisions() {
        this.checkCollisionsEnemy();
        this.checkCollisionsBottles();
        this.checkCollisionsEndboss();
    }

    checkCollisionsEnemy() {
        this.level.enemies.forEach((enemy) => {
            if( this.character.isColliding(enemy) ) {
                this.character.hit();
                this.lifeBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsBottles() {
        this.level.bottles.forEach((bottle) => {
            if( this.character.isColliding(bottle) ){
                this.collectedBottles.push(bottle);
                this.bottleBar.setPercentage(this.collectedBottles.length * 5);
                this.level.bottles.splice(bottle, 1);
                this.collect_bottle_sound.play();
            }
        })
    }

    checkCollisionsEndboss() {
        this.throwableObjects.forEach((to) => {
            this.level.enemies.forEach((enemy) => {
                if (to.isColliding(enemy) && (enemy instanceof Endboss)) {
                    enemy.hit();
                    if (enemy.isDead()) {
                        this.displayEnemyIsDead();
                    } else {
                        enemy.isHurt();
                        this.bossBar.setPercentage(enemy.energy);
                    }
                };
            });
        });
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.drawObjects();
        this.drawMoveableStatusbars();
        this.ctx.translate(-this.camera_x, 0);
        //Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    drawObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.bossBar);
    }

    drawMoveableStatusbars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.lifeBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        /*  this.ctx.beginPath();
            this.ctx.lineWidth = '5';
            this.ctx.strokeStyle = 'blue';
            this.ctx.rect(mo.x, mo.y, mo.width, mo.height);
            this.ctx.stroke(); */

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}