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
    link.addEventListener('click', hideSidebar); // Trigger hideSidebar when any link is clicked
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
