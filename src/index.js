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


document.querySelectorAll(".album-info").forEach(album => {
	const albumId = album.dataset.albumId;
	const ratings = album.querySelectorAll(".like-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".like-countU-button material-icons" , ".like-countD-button material-icons");
		const count = rating.querySelector(".like-rating-count");
        
        button.addEventListener("click", async () => {
                if (rating.albumList.contains("like-rating-selected")) {
                    const count = rating.querySelector(".like-rating-count")
                    rating.albumList.remove("like-rating-selected")
                return;
                }
                count.textContent = Number(count.textContent) + 1;
                
                ratings.forEach(rating => {
                    if (rating.albumList.contains("like-rating-selected")) {
                        const countD = rating.querySelector(".like-rating-count");
                        const countU = rating.querySelector(",like-rating-count")

                        count.textContent = Math.max(0, Number(count.textContent) - 1);
                        rating.albumList.remove("like-rating-selected");
                }
            });
            rating.albumList.add("like-rating-selected"); 

            const likeOrDislike = likeRating === rating ? "like" : "dislike";
            const response = await fetch(`/.album-info/${albumId}/${likeOrDislike}`);
            const body = await response.json();
        });
    });
 });