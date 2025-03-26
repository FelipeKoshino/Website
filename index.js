const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const menu = document.querySelector(".n-menu")
const goToTop = document.getElementById("a1");

document.addEventListener("scroll", () => {
    if(document.documentElement.scrollTop > 0){
        menu.classList.add("menu--alt")

    } else {
        menu.classList.remove("menu--alt")
    }
})

goToTop.addEventListener("click", () => {
    window.scroll(0,0)
    //goToBottom.scrollIntoView({ behavior: "instant", block: "start" });
});