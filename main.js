//for smaller screen nav
function showSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = 'none';
}

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
