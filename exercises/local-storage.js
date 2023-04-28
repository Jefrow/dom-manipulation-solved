/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container by ID that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...

const cardContainer = document.querySelector('.cardsContainer'); 
let storageArr = localStorage.getItem('Favorites');
let favArr; 
 
const clicked = (e) => {
  const item = e.target; 
  if(Array.from (item.classList).includes('card')) {
    if(favArr.includes(item.id)) {
      rmFav(item.id)
      updateCard(item.id)
    } else {
      addFav(item.id)
      updateCard(item.id)
    }
  }
}

const addFav = (id) => {
  favArr.push(id)
  let Favorites = favArr.toString()
    .replace('[', '')
    .replace(']', '')
  localStorage.setItem('Favorites', Favorites); 
}

const rmFav = (id) => {
  favArr.splice(favArr.indexOf(id),1).join(','); 
  let Favorites = favArr.toString()
    .replace('[', '')
    .replace(']', '')
  localStorage.setItem('Favorites', Favorites);
}

const updateCard = (id) => {
  storageArr = localStorage.getItem('Favorites').split(',');
  let card = document.getElementById(id) 
  const params = storageArr.includes(id) 
    ? ['red', 'true']
    : ['white', 'false']
  card.style.backgroundColor = params[0]
  card.setAttribute('data-fav', params[1])
}

window.onload = () => {
  if(storageArr) {
    favArr = storageArr.split(',')
    favArr.map((id) => updateCard(id))
  } else {
    favArr = [];
  }
}
cardContainer.addEventListener('click', clicked);