class Poop {
    constructor(x, y, direction) {
        this.element = document.createElement("div");
        this.element.classList.add("poop");
        this.frameWidth = 48;
        this.frameHeight = 48;
        this.currentFrame = 0;
        this.animationInterval= null;
        
        this.animations = {
            top: { frames: 2, sheet: "assets/poop-top.png" },
            bottom: { frames: 2, sheet: "assets/poop-bottom.png" },
            left: { frames: 2, sheet: "assets/poop-right.png" },
            right: { frames: 2, sheet: "assets/poop-right.png" }
        };

        this.currentAnimation = this.animations[direction] || this.animations.bottom;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.backgroundImage = `url(${this.currentAnimation.sheet})`;
        this.element.style.width = `${this.frameWidth}px`;
        this.element.style.height = `${this.frameHeight}px`;

        document.body.appendChild(this.element);
        this.startAnimation();

        setTimeout(() => this.element.classList.add("fade-out"), 6000);
        setTimeout(() => this.element.remove(), 8000);
    }

    animate() {
        const offsetX = -this.currentFrame * this.frameWidth;
        this.element.style.backgroundPosition = `${offsetX}px 0`;
        this.currentFrame = (this.currentFrame + 1) % this.currentAnimation.frames;
    }

    startAnimation() {
        this.stopAnimation();
        this.currentFrame = 0;
        this.animationInterval = setInterval(() => this.animate(), 350);
    }

    stopAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
        }
    }

    remove() {
        this.stopAnimation();
        this.element.remove();
    }

    
}
