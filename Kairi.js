//kairi.js


let currentAlbum

const albumList = document.querySelector("#album-list")
const albumImage = document.querySelector("#detail-image")
const albumTitle = document.querySelector("#title")
const albumYear = document.querySelector("#year")
const albumArtist = document.querySelector("#artist")

const reviewsList = document.querySelector('#reviews-list')

fetch("http://localhost:3000/albums")
    .then(response => response.json())
    .then(albumData => {
        albumData.map(eachAlbum => {
            createImageMenu(eachAlbum)
        })

        displayAlbumDetail(albumData[0])

        makeNewReview()

    })


function createImageMenu(album) {
    const image = document.createElement("img")
    image.src = album.image
    albumList.appendChild(image)

    image.addEventListener("click", () => {
        displayAlbumDetail(album)
    });
}

const displayAlbumDetail = (album) => {
    currentAlbum = album

    albumImage.src = album.image
    albumTitle.textContent = album.title
    albumYear.textContent = album.year
    albumArtist.textContent = album.artist

    if (album.reviews && album.reviews.length > 0) {
        displayReviews(album.reviews)
    } else {
        reviewsList.innerHTML = ''
    }
}

function displayReviews(reviews) {
    reviews.forEach(getReview)
}

function getReview(review) {
    const list = document.createElement('ul')
    list.textContent = review.content
    reviewsList.appendChild(list)
}

function makeNewReview() {
    document.querySelector('#review-form').addEventListener("submit", (event) => {
        event.preventDefault()
        const reviewForm = event.target

        const newReviewDescription = document.querySelector('#review')
        const newReview = document.createElement('ul')
        newReview.textContent = newReviewDescription.value

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.classList.add('delete-button')
        deleteButton.addEventListener('click', () => {
           newReview.remove()
        });
        
        newReview.appendChild(deleteButton)

        newReview.appendChild(deleteButton)
        addNewReview(newReview)

        reviewForm.reset()
    });
}

function addNewReview(newReview) {
    reviewsList.appendChild(newReview)
}

function handleLikeButtonClick() {
      alert ('Happy you liked it!');
}
let likeButton = document.createElement('button');
likeButton.innerHTML = 'like';
likeButton.addEventListener('click', handleLike)

const likeSection = document.getElementById('like-section');
 // update the like count on the webpage

 document.getElementById("likeCount").innerHTML = likeCount;
        
 let likeCount = 0;

 likeCount++;

 // display a message in the console to indicate that the button was clicked
  console.log("Like button clicked!");
        