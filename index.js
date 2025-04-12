window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) { // Ajuste este valor conforme necessário (a distância para ativar a transparência)
        nav.classList.add('nav-scrolled');

    } else {
        nav.classList.remove('nav-scrolled');
    }
});
