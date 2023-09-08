 // Menu hamburguer
 export function setupMobileMenu() {
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const mobileMenu = document.querySelector('.mobile-menu');

  mobileMenuIcon.addEventListener('click', () => {
    mobileMenu.classList.toggle('open'); // Alterna a classe 'open' para exibir/ocultar o menu
    mobileMenuIcon.querySelector('.fas').classList.toggle('fa-bars'); 
    mobileMenuIcon.querySelector('.fas').classList.toggle('fa-times'); 
  });
 }