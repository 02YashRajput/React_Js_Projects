const navbar = document.querySelector('[data-navbar]')
const hero = document.querySelector('[data-hero]')
const skills = document.querySelector('[data-skills]')
const work = document.querySelector('[data-work]')
const contact = document.querySelector('[data-contact]')
const homeNav = document.querySelector('.Home-nav')
const skillsNav = document.querySelector('.Skills-nav')
const workNav = document.querySelector('.Work-nav')
const contactNav = document.querySelector('.Contact-nav')
const arr = document.querySelectorAll('.toggle-div')
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

function scrol(divid){
    let myDiv = document.querySelector(divid);
    myDiv.scrollIntoView({behavior:'smooth'});
} 

function toogleDiv(divclass){
    let myDiv = document.querySelector(divclass);
    myDiv.style.display = (myDiv.style.display === 'none' || myDiv.style.display === '') ? 'flex' : 'none';
}

document.addEventListener('click',(event)=>{
    let clickedButton = event.target.closest('.toggle-button');
    if(!clickedButton){
        arr.forEach((myDiv)=>{
            myDiv.style.display = 'none';
        })
    }
    else{
        let divclass = clickedButton.getAttribute('data-target');
        let targetDiv = document.querySelector(divclass);
        arr.forEach((myDiv)=>{
            if(!(myDiv.id === targetDiv.id) ){
                myDiv.style.display = 'none';
            }
        })
    }
} )
function submitHandler(event){
    Event.stop(event); 

}