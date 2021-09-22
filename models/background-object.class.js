class BackgroundObject extends MoveableObject {

<<<<<<< HEAD
    constructor(imagePath) {
        super().loadImage(imagePath);
=======
    width = 720;
    height = 400;
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
>>>>>>> 226f97eae2b8239079b80add9f6001b823f03d4a
    }
}