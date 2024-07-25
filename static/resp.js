burger=document.querySelector('.burger');
navbar=document.querySelector('.navbar');
rightnav=document.querySelector('.rightnav');
navlist=document.querySelector('.nav-list');
burger.addEventListener('click',()=>{
    rightnav.classList.toggle('v-bar');
    navlist.classList.toggle('v-bar');
    navbar.classList.toggle('h-nav');
})

submit=document.querySelector('#submit');

submit.addEventListener('click',()=>{
    alert("Thank You For Contacting  Us");
})






