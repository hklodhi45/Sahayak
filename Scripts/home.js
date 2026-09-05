let guestBtn = document.querySelector('.pop-up button');
let popUp = document.querySelector('.pop-up-container');

guestBtn.addEventListener('click', () => {
  popUp.classList.add('clean');
});