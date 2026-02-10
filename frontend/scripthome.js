// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {

    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      e.preventDefault();

      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }

  });
});
function scrollCourses(amount) {
  document.querySelector('.course-grid').scrollBy({
    left: amount,
    behavior: 'smooth'
  });
}


 
// // Mobile menu toggle
// const menuToggle = document.createElement('div');
// menuToggle.classList.add('menu-toggle');
// menuToggle.innerHTML = '&#9776;';
// document.querySelector('.navbar').appendChild(menuToggle);
 
// menuToggle.addEventListener('click', () => {
//   document.querySelector('.nav-links').classList.toggle('active');
// });
 