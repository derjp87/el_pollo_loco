class StatusBar extends DrawableObject {

    IMAGES_LIFE = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png',
    ];

    IMAGES_BOTTLE = [
        'img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png',
        'img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png',
    ];

    IMAGES_BOSS = [
        'img/7.Marcadores/Barra/Marcador vida/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador vida/azul/100_.png',
    ];

    percentage;
    image = [];

    constructor(x, y, percent, i) {
        super();
        this.image = this.barImages(i);
        this.loadImages(this.image);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 40;
        this.setPercentage(percent);
    }

    barImages(i) {
        if (i == 1) {
            return this.IMAGES_LIFE
        } else if (i == 2) {
            return this.IMAGES_BOTTLE
        } else if (i == 3) {
            return this.IMAGES_BOSS
        }
    };

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.image[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

        resolveImageIndex() {
            if (this.percentage == 100) {
                return 5;
            } else if (this.percentage > 80) {
                return 4;
            } else if (this.percentage > 60) {
                return 3;
            } else if (this.percentage > 40) {
                return 2;
            } else if (this.percentage > 20) {
                return 1;
            } else {
                return 0;
            }
        }
    }
