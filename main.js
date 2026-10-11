import {Player} from "./player.js";

const canvas = document.getElementById("myCanvas");
canvas.height = 500;
canvas.width = 500;
const ctx = canvas.getContext("2d");
const keys = new Set();

window.addEventListener("keydown", (event) => {
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
        keys.add(event.key);
    }
});

window.addEventListener("keyup", (event) => {
    keys.delete(event.key);
});

window.addEventListener("blur", () => {
    keys.clear();
});

const sprite = new Image();
sprite.onload = () => {
    const player = new Player(250, 250, 50, 50, sprite);
    const speed = 200; // Pixels per second
    let previousTime;

    function animate(time) {
        const deltaTime = previousTime === undefined
            ? 0
            : Math.min((time - previousTime) / 1000, 0.05);
        previousTime = time;

        const horizontal = Number(keys.has("ArrowRight")) - Number(keys.has("ArrowLeft"));
        const vertical = Number(keys.has("ArrowDown")) - Number(keys.has("ArrowUp"));

        // Move on one axis at a time; horizontal movement takes priority.
        if (horizontal !== 0) {
            player.x += horizontal * speed * deltaTime;
        } else {
            player.y += vertical * speed * deltaTime;
        }

        // Keep the entire sprite inside the canvas.
        player.x = Math.max(0, Math.min(player.x, canvas.width - player.width));
        player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
};
sprite.src = "./assets/WuSprite.png";
