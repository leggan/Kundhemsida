const profileLogo = document.getElementById('profileLogo');

profileLogo.addEventListener('click', () => {
    // Hitta alla element med klassen 'account-session'
    const buttonDivs = document.querySelectorAll('.account-session, #account-hide');

    buttonDivs.forEach(div => {
        // Växla mellan klasserna
        if (div.classList.contains('account-session')) {
            div.classList.remove('account-session');
            div.setAttribute('id', 'account-hide')
        } else {
            div.classList.add('account-session');
            div.removeAttribute('id'); 
        }
    });
});



// Array.from(buttonDiv).forEach((div) => {
//     console.log(div.style.display)
//     if(div.style.display == 'flex') {
//         div.classList.remove('account-session')
//         div.id = 'account-hide'
//     } else {
//         console.log('None')
//     }
// })