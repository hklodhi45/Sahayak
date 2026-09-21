import { services } from "../Data/services.js";
import { serviceCategories } from "../Data/serviceCategories.js";

let search = document.querySelector('#search');
let dropdown = document.querySelector('.dropdown');


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
    item.setAttribute('href',`./booking.html/?service=${ctg}`)
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