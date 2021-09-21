class Cloud extends MoveableObject {
    y = 20;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
    
        this.x = Math.random() * 500; //Zahl zwischen 200 und 700

    }
}