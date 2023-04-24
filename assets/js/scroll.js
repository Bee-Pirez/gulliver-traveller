window.addEventListener('scroll', () => {
    const navBar = document.querySelector('navigation');
    // console.log(window.scrollY);
    navBar.classList.toggle('active-scroll', window.scrollY >100);
});