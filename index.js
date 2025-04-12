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
const m1 = document.querySelector(".menu-1")

window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) { // Ajuste este valor conforme necessário (a distância para ativar a transparência)
        nav.classList.add('nav-scrolled');
        m1.classList.add('sumir-m1');

    } else {
        nav.classList.remove('nav-scrolled');
        m1.classList.remove('sumir-m1');
    }
});
