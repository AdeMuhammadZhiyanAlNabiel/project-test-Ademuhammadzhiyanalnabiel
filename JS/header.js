const header = document.getElementById("header-main");
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add("scroll-up");
        } else {
            header.classList.remove("scroll-up");
        }
        if (scrollTop != 0) {
            header.classList.add("headscrolld");
        } else {
            header.classList.remove("headscrolld");
        }
        lastScrollTop = scrollTop;
});