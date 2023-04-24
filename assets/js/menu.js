const navMenu = document.querySelector('.menu_navigation');
document.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.classList.contains('menu_button') ||
        e.target.classList.contains('mavigation_item')) {
        navMenu.classList.toggle('mobile_menu');
    }
})