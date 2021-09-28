class Bottle extends MoveableObject {
    
    BOTTLES = [
        'img/6.botella/2.Botella_enterrada1.png',
        'img/6.botella/2.Botella_enterrada2.png'
    ];

    constructor(x, y, image) {
        super();
        this.loadImage(image);
        this.loadImages(this.BOTTLES)
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
    }
}