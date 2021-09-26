class MoveableObject extends DrawableObject {
        speed = 0.15;
        otherDirection = false;
        speedY = 0;
        acceleration = 2.5;
        energy = 100;
        lastHit = 0;
        bottleValue = 0;
        lastCollect = 0;

        applyGravity() {
            setInterval(() => {
                if(this.isAboveGround() || this.speedY > 0)
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }, 1000 / 25 );
        }

        isAboveGround() {
            if(this instanceof ThrowableObject) { // Throwable object should always fall
                return true;
            } else {
            return this.y < 145;
            }
        }

        // character.isColliding(chicken);
        isColliding(mo) {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }

        hit() {
            this.energy -= 5;
            if(this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }

        isHurt() {
            let timepassed = new Date().getTime() - this.lastHit; // difference in ms
            timepassed = timepassed / 1000; // difference in s
            return timepassed < 1;
        }

        isDead() {
            return this.energy == 0;
        }

        // character.isCollecting(bottles);
        isCollecting(b) {
            return this.x + this.width > b.x &&
            this.y + this.height > b.y &&
            this.x < b.x &&
            this.y < b.y + b.height;
        }

        collect() {
            this.bottleValue += 20;
            if (this.bottleValue > 100) {
                this.bottleValue = 100;
            } else {
                this.lastCollect = new Date().getTime();
            }
        }

        /**
         * 
         * @param {Array} arr ['img/image1.png', 'img/image2.png', ...]
         */


        playAnimation(images) {
            let i = this.currentImage % images.length;
                let path = images[i];
                this.img = this.imageCache[path];
                this.currentImage++;
        }

        moveRight() {
            this.x += this.speed;
            
        }
        
        moveLeft() {
                this.x -= this.speed;
                
        }

        jump() {
            this.speedY = 30;
        }
}