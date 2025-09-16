document.addEventListener("DOMContentLoaded", () => {
    const petElement = document.getElementById("pet");
    const guineaPig = new Pet(petElement);
    

    guineaPig.startWalking();
    guineaPig.startPoop();
});