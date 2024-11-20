//for smaller screen nav
function showSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.add('show'); // Add class to trigger the sliding effect
}

function hideSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.remove('show'); // Remove class to hide the sidebar
}

document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', hideSidebar); 
});


//Stickey navbar
let lastScrollPosition = 0;
const nav = document.querySelector('.nav-container');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > lastScrollPosition) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScrollPosition;
});

//popup contact info

const popup = document.getElementById("popup");

function openPopup(){
    popup.classList.add("open-popup");
}

function closePopup(){
    popup.classList.remove("open-popup");
}

// Add dynamic star rating functionality
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
        const starValue = star.getAttribute("data-value");
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

    // Clear the form fields
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("rating").value = "";
    document.querySelectorAll(".star").forEach((star) => star.classList.remove("active"));
    document.getElementById("review").value = "";

    loadReviews(); // Reload the reviews list after submission
}

function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
        return;
    }

    reviews.forEach((review, index) => {
        const reviewDiv = document.createElement("div");
        reviewDiv.className = "review";

        reviewDiv.innerHTML = `
            <div class="review-checkbox-wrapper">
                <input type="checkbox" class="review-checkbox" data-index="${index}">
            </div>
            <p><strong>${review.name}</strong> (${review.email})</p>
            <p>Rating: ${"⭐".repeat(review.rating)}</p>
            <p>${review.reviewText}</p>
            <small>${review.date}</small>
        `;
        reviewsList.appendChild(reviewDiv);
    });
}

function deleteSelectedReviews() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const selectedCheckboxes = document.querySelectorAll(".review-checkbox:checked");

    if (selectedCheckboxes.length === 0) {
        alert("Please select at least one review to delete.");
        return;
    }

    selectedCheckboxes.forEach((checkbox) => {
        const index = checkbox.getAttribute("data-index");
        reviews.splice(index, 1); // Remove the review at the checked index
    });

    // Save the updated reviews list to localStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Reload the reviews list after deletion
    loadReviews();
}

function toggleCheckboxSelection() {
    const checkboxes = document.querySelectorAll(".review-checkbox-wrapper");
    const deleteBtn = document.querySelector(".delete-selected-btn");

    // Toggle checkboxes visibility
    checkboxes.forEach((checkbox) => {
        checkbox.style.display = checkbox.style.display === "none" ? "inline-block" : "none";
    });

    // Toggle delete button visibility
    deleteBtn.style.display = deleteBtn.style.display === "none" ? "inline-block" : "none";
}

// Load reviews on page load
window.onload = loadReviews;

let isMaximized = false;
let isMinimized = false;

// Function to toggle between maximized and normal state
function toggleWindowSize() {
    const reviewWindow = document.querySelector('.review-window');
    if (isMaximized) {
        reviewWindow.classList.remove('maximized');
        isMaximized = false;
    } else {
        reviewWindow.classList.add('maximized');
        isMaximized = true;
    }
}

// Function to minimize the window
function minimizeWindow() {
    const reviewWindow = document.querySelector('.review-window');
    reviewWindow.classList.add('minimized');
    isMinimized = true;
}

// Function to restore the minimized window (if needed)
function restoreWindow() {
    const reviewWindow = document.querySelector('.review-window');
    reviewWindow.classList.remove('minimized');
    isMinimized = false;
}

// Load reviews on page load
window.onload = loadReviews;

function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = ""; // Clear existing reviews

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        reviewsList.innerHTML = "<p>No reviews yet. Be the first to leave one!</p>";
        return;
    }

    reviews.forEach((review, index) => {
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
