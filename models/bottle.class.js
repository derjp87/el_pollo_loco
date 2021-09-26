class Bottle extends MoveableObject {
    y = 370; 
    height = 70;
    width = 60;

    constructor() {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.x = 300 + Math.random() * 2000; //Zahl zwischen 200 und 700
    }
}