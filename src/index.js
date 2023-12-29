
let currentAlbum;
// let albums = [];

const albumList = document.querySelector("#album-list");
const albumDetailImage = document.querySelector("#detail-image");
const albumDetailTitle = document.querySelector("#title");
const albumDetailYear = document.querySelector("#year");
const albumDetailArtist = document.querySelector("#artist");

const reviewsList = document.querySelector('#reviews-list');

// const searchInput = document.getElementById('search-input')

fetch("http://localhost:3000/albums")
    .then(response => response.json())
    .then(albumData => {
        albumData.map(eachAlbum => {
            createImageMenu(eachAlbum);
        });

        displayAlbumDetail(albumData[0]);

        makeNewReview();
    });

// rendering functions
function createImageMenu(album) {
    const image = document.createElement("img");
    image.src = album.image;
    albumList.appendChild(image);

    image.addEventListener("click", () => {
        displayAlbumDetail(album);
    });
}

const displayAlbumDetail = (album) => {
    currentAlbum = album;

    albumDetailImage.src = album.image;
    albumDetailTitle.textContent = album.title;
    albumDetailYear.textContent = album.year;
    albumDetailArtist.textContent = album.artist;

    if (album.reviews && album.reviews.length > 0) {
        displayReviews(album.reviews);
    } else {
        reviewsList.innerHTML = '';
    }
}

function displayReviews(reviews) {
    reviewsList.innerHTML = '';
    reviews.forEach(getReview);
}

function getReview(review) {
    const list = document.createElement('ul');
    list.textContent = review.content;
    reviewsList.appendChild(list);
}

function makeNewReview() {
    document.querySelector('#review-form').addEventListener("submit", (event) => {
        event.preventDefault();
        const reviewForm = event.target;

        const newReviewDescription = document.querySelector('#review');
        const newReview = document.createElement('ul');
        newReview.textContent = newReviewDescription.value;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button'); 
        deleteButton.addEventListener('click', () => {
           newReview.remove();
        });
        
        newReview.appendChild(deleteButton);

        newReview.appendChild(deleteButton);
        addNewReview(newReview);

        reviewForm.reset();
    });
}

function addNewReview(newReview) {
    reviewsList.appendChild(newReview);
}



// searchInput.addEventListener('input', function () {
//     const searchTerm = searchInput.value.toLowerCase();
//     const filteredAlbums = albums.filter(album => album.title.toLowerCase().includes(searchTerm));

    
//     albumList.innerHTML = '';

  
//     filteredAlbums.forEach(eachAlbum => {
//         createImageMenu(eachAlbum);
//     });

    
//     if (filteredAlbums.length > 0) {
//         displayAlbumDetail(filteredAlbums[0]);
//     } else {
      
//         albumDetailImage.src = '';
//         albumDetailTitle.textContent = 'No matching albums';
//         albumDetailYear.textContent = '';
//         albumDetailArtist.textContent = '';
//         reviewsList.innerHTML = '';
//     }
// });