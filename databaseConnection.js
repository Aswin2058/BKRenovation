document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("mouseover", () => {
        const value = star.getAttribute("data-value");
        highlightStars(value, "hover");
    });

    star.addEventListener("mouseout", () => {
        highlightStars(0, "hover");
    });

    star.addEventListener("click", () => {
        const value = star.getAttribute("data-value");
        document.getElementById("rating").value = value; // Save the rating value
        highlightStars(value, "active");
    });
});

function highlightStars(value, className) {
    document.querySelectorAll(".star").forEach((star) => {
        const starValue = parseInt(star.getAttribute("data-value"), 10);
        if (starValue <= value) {
            star.classList.add(className);
        } else {
            star.classList.remove(className);
        }
    });
}

function submitReview() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = document.getElementById("rating").value;
    const reviewText = document.getElementById("review").value.trim();

    if (!name || !email || !rating || !reviewText) {
        alert("All fields are required!");
        return;
    }

    const review = {
        name,
        email,
        rating: parseInt(rating, 10),
        reviewText,
        date: new Date().toLocaleString(),
    };

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("rating").value = "";
    document.querySelectorAll(".star").forEach((star) => star.classList.remove("active"));
    document.getElementById("review").value = "";

    loadReviews();
}

function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
        return;
    }

    reviews.forEach((review) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review";

        reviewDiv.innerHTML = `
            <p><strong>${review.name}</strong> (${review.email})</p>
            <p>Rating: ${"⭐".repeat(review.rating)}</p>
            <p>${review.reviewText}</p>
            <small>${review.date}</small>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}

window.onload = loadReviews;


//popup for reviews
// Open the modal
function toggleWindowSize() {
    const modal = document.getElementById("reviews-modal");
    const allReviewsList = document.getElementById("all-reviews-list");

    // Clear the modal content
    allReviewsList.innerHTML = "";

    // Load reviews
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        allReviewsList.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
    } else {
        reviews.forEach((review) => {
            const reviewDiv = document.createElement("div");
            reviewDiv.className = "review";

            reviewDiv.innerHTML = `
                <p><strong>${review.name}</strong> (${review.email})</p>
                <p>Rating: ${"⭐".repeat(review.rating)}</p>
                <p>${review.reviewText}</p>
                <small>${review.date}</small>
            `;
            allReviewsList.appendChild(reviewDiv);
        });
    }

    // Show the modal
    modal.style.display = "block";
}

// Close the modal
function closeModal() {
    const modal = document.getElementById("reviews-modal");
    modal.style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function (event) {
    const modal = document.getElementById("reviews-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
