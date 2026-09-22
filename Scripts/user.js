import { services } from "../Data/services.js";
import { serviceCategories } from "../Data/serviceCategories.js";

// -----------------------
// Search suggestions 
// -----------------------

let body = document.querySelector('body');
let search = document.querySelector('#search');
let dropdown = document.querySelector('.dropdown');

body.addEventListener('click', (event)=>{
  dropdown.style.display = (event.target == search) ? 'block' : 'none';
});

search.addEventListener("input", async () => {
  const query = search.value.trim().toLowerCase();

  if (!query) {
    dropdown.replaceChildren();
    dropdown.style.border = 'none';
    return;
  }

  let suggestions = services.filter(service => {
    return (service.name.toLowerCase().includes(query) || 
    service.aliases.some(s => s.includes(query)));
  });
  // let suggestions = services;

  if(suggestions.length != 0){
    dropdown.style.border = '1px solid rgba(255, 255, 255, 0.645)';
  } else{
    dropdown.style.border = 'none';
  }
  
  // sorting array on the basis of index matched
  suggestions.sort((a, b) => {
    let aIndex = a.name.toLowerCase().indexOf(query);
    let bIndex = b.name.toLowerCase().indexOf(query);

    if(aIndex == -1) aIndex = suggestions.length;
    if(bIndex == -1) bIndex = suggestions.length;

    return aIndex - bIndex;
  });

  dropdown.innerHTML = '';

  for(let i=0; i<7; i++){
    const {name, ctg} = suggestions[i];
    const item = document.createElement("a");
    item.setAttribute('href',`./booking.html?service=${ctg}`)
    if(name === ctg){
      item.innerHTML = `
        <h6> <b>${name}</b> </h6>
      `;
    } else{
      item.innerHTML = `
        <h6> ${name} </h6>
        <p> ${ctg} </p>
      `;
    }
    dropdown.append(item);
  }
});

// -----------------------
// service cards 
// -----------------------

const serviceCards = document.querySelector('.second-services');
serviceCards.innerHTML = '';

serviceCategories.forEach(ctg => {
  const categoryId = ctg.name
    .toLowerCase()
    .replace("&", 'and')
    .replaceAll(" ", '-');

  serviceCards.innerHTML += `
    <a class="service-cards" href="./booking.html?service=${ctg.name}">
      <i class="${ctg.icon}" id="${categoryId}"></i>
      <h4>${ctg.name}</h4>
    </a>
  `;
});

let serviceContainer = document.querySelector('.second-div');
let viewAllServices = document.querySelector('.view-all-services');
let isservContainerOpen = false;
viewAllServices.addEventListener('click', () => {
  serviceContainer.classList.toggle('inc-sec-div-height');
  if(isservContainerOpen){
    setTimeout(()=>{
      viewAllServices.innerHTML = `View all services &ThickSpace;<i class="fa-solid fa-arrow-right"></i>`;
    },700);
  } else{
    setTimeout(()=>{
      viewAllServices.innerHTML = `View less services &ThickSpace;<i class="fa-solid fa-arrow-left"></i>`;
    },700);
  }
  isservContainerOpen = !isservContainerOpen;
})
