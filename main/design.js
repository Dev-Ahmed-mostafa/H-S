const stars = document.querySelectorAll(".stars button");

let selectedRating = 0;

stars.forEach((star) => {
    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.rating);

        stars.forEach((item, itemn) => {
            const icon = item.querySelector("i");
            const rating = Number(item.dataset.rating);

            icon.classList.toggle("fa-solid", rating <= selectedRating);
            icon.classList.toggle("fa-regular", rating > selectedRating);
        });
    });
});

const submitButton = document.querySelector(".feedback-submit");

submitButton.addEventListener("click", () => {
    if (!selectedRating) return;

    console.log("Rating:", selectedRating);

    const message = document.getElementById("feedback-message");
    message.classList.toggle("show-m")
    setTimeout(() => {
        message.classList.toggle("show-m");
    }, 3000);
});