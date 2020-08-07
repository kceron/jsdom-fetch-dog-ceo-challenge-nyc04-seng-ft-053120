console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const dogContainer = document.querySelector('#dog-image-container')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const dogBreedUl = document.getElementById("dog-breeds")
const dropDown = document.getElementById("breed-dropdown")
let allBreeds = []

// //  CHALLENGE 1
fetch(imgUrl) //returns a promise of a response
.then(response => response.json()) //that response gets inserted in the 1st argument of then. //this line returns another promise: response.json
.then(dogObj => {  // 2nd .then parses the object. All that goes inside .then is a callback function. The argument is the json object/nestedURLs
    dogObj.message.forEach((individualDogImg) => addDogImg(individualDogImg))
})

function addDogImg(dogImg) {
const newImgElem = document.createElement("img")
newImgElem.src = dogImg
    newImgElem.className = "dogphoto"
    dogContainer.append(newImgElem)   
}

// CHALLENGE 2
fetch(breedUrl)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    let nestedArr = data.message
// helper function to iterate over nestedArr 
for (const dogBreed in nestedArr) {
    if (nestedArr[dogBreed].length > 0 ) {
        nestedArr[dogBreed].forEach((elem) => {
            allBreeds.push(`${elem} ${dogBreed}`)
            addBreeds(`${elem} ${dogBreed}`)
        })
    } else {
        allBreeds.push(dogBreed)
        addBreeds(dogBreed)
    }
}
});

function addBreeds(singleDogBreed){
    const liElem = document.createElement("li")
    liElem.innerHTML = `<li data-info = "breed">${singleDogBreed}</li>`
    dogBreedUl.append(liElem)
}

// CHALLENGE 3
dogBreedUl.addEventListener("click", function(event) {
    if(event.target.dataset.info === "breed") {
    event.target.style.color = "pink" 
    event.target.style.backgroundColor = "green"
    }
})

// CHALLENGE 4
dropDown.addEventListener("change", (event)=> {
    let userInput = event.target.value
    dogBreedUl.innerHTML = ""
    const filteredBreeds = allBreeds.filter((breed) => breed.startsWith(userInput)) 
    filteredBreeds.forEach((breed) => addBreeds(breed))
})