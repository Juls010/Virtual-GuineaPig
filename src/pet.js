class Pet {
    constructor(element) {
        this.pet = element;
        this.frameWidth = 48;
        this.frameHeight = 48;
        this.widthPet = this.pet.offsetWidth;
        this.heightPet = this.pet.offsetHeight;

        this.animations = {
            walk: {
                right: { frames: 4, sheet: "assets/walk-right.png" },
                left: { frames: 4, sheet: "assets/walk-left.png" },
                top: { frames: 4, sheet: "assets/walk-top.png" },
                bottom: { frames: 4, sheet: "assets/walk-bottom.png" }
            },
            idle: {
                right: { frames: 2, sheet: "assets/idle-right.png" },
                left: { frames: 2, sheet: "assets/idle-left.png" },
                top: { frames: 2, sheet: "assets/idle-top.png" },
                bottom: { frames: 2, sheet: "assets/idle-bottom.png" }
            }
        };

        this.currentAnimation = this.animations.walk.right;
        this.currentFrame = 0;
        this.animationInterval = null;
        this.x = 0;
        this.y = 0;
        this.speed = 1;
        this.direction = "right";
        this.position = 0; 
    }

    animate() {
        const offsetX = -this.currentFrame * this.frameWidth;
        this.pet.style.backgroundPosition = `${offsetX}px 0`;
        this.currentFrame = (this.currentFrame + 1) % this.currentAnimation.frames;
    }

    startAnimation(type = "walk", direction = this.direction) {
        this.stopAnimation();
        this.currentAnimation = this.animations[type][direction];
        this.currentFrame = 0;
        this.pet.style.backgroundImage = `url(${this.currentAnimation.sheet})`;
        this.animationInterval = setInterval(() => this.animate(), 150);
    }

    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
        this.currentFrame = 0;
        this.pet.style.backgroundPosition = "0px 0";
    }

    move() {
    const previousDirection = this.direction;

    switch(this.direction) {
        case "right": 
            this.x += this.speed; 
            if (this.x >= window.innerWidth - this.widthPet) 
                this.direction = "bottom"; 
            break;
        case "bottom": 
            this.y += this.speed; 
            if (this.y >= window.innerHeight - this.heightPet) 
                this.direction = "left"; 
            break;
        case "left": 
            this.x -= this.speed; 
            if (this.x <= this.position) 
                this.direction = "top"; 
            break;
        case "top": 
            this.y -= this.speed; 
            if (this.y <= this.position) 
                this.direction = "right"; 
            break;
    }

    this.pet.style.left = `${this.x}px`;
    this.pet.style.top = `${this.y}px`;

        if (previousDirection !== this.direction) {
            this.updateAnimationDirection();
        }
    }

    updateAnimationDirection() {
    this.pet.style.backgroundImage = `url(${this.animations.walk[this.direction].sheet})`;
    this.currentAnimation = this.animations.walk[this.direction];
    this.currentFrame = 0; 
    }

    poop() {
        const { x, y } = this;
        new Poop(x, y, this.direction);
    }

    startPoop() {
    const randomTime = Math.floor(Math.random() * 8000) + 3000;
        setTimeout(() => {
            this.poop();          
            this.startPoop();     
        }, randomTime);
    }

    startWalking() {
        this.startAnimation("walk", this.direction);
        const max = 5000, min = 3000;
        this.walkTime = Math.random() * max + min;
        this.startTime = performance.now();

        const walkLoop = (now) => {
            const elapsed = now - this.startTime;
            if (elapsed < this.walkTime) {
                this.move();
                requestAnimationFrame(walkLoop);
            } else {
                this.startIdle();
            }
        };
        requestAnimationFrame(walkLoop);
    }

    startIdle() {
        this.startAnimation("idle", this.direction);
        const max = 3000, min = 2000;
        const idleTime = Math.random() * max + min;
        setTimeout(() => {
            this.startWalking();
        }, idleTime);
    }
}
