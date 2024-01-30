const navbar = document.querySelector('[data-navbar]')
const hero = document.querySelector('[data-hero]')
const skills = document.querySelector('[data-skills]')
const work = document.querySelector('[data-work]')
const contact = document.querySelector('[data-contact]')
const homeNav = document.querySelector('.Home-nav')
const skillsNav = document.querySelector('.Skills-nav')
const workNav = document.querySelector('.Work-nav')
const contactNav = document.querySelector('.Contact-nav')
window.addEventListener('scroll',()=>{
    const scrollPosition = window.scrollY;
    if (scrollPosition < skills.offsetTop) {
        homeNav.classList.add('active');
        skillsNav.classList.remove('active');
    } else if (scrollPosition < work.offsetTop) {
        homeNav.classList.remove('active');
        skillsNav.classList.add('active');
        workNav.classList.remove('active');
    } else if (scrollPosition < contact.offsetTop) {
        skillsNav.classList.remove('active');
        workNav.classList.add('active');
        contactNav.classList.remove('active');
    } else {
        workNav.classList.remove('active');
        contactNav.classList.add('active');
    }
})

const scrollToHome = ()=>{
    hero.scrollIntoView({behavior:'smooth'})
}
const scrollToSkills = ()=>{
    skills.scrollIntoView({behavior:'smooth'})
}
const scrollToWork = ()=>{
    work.scrollIntoView({behavior:'smooth'})
}
const scrollToContact = ()=>{
    contact.scrollIntoView({behavior:'smooth'})
}


