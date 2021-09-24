class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
        
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}