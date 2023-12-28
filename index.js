




// let currentMovie

//HTML DOM Node elements
const albumList = document.querySelector("#album-list")
const albumDetailImage = document.querySelector("div#album-info img#detail-image")
const albumDetailTitle = document.querySelector("div#album-info h1#title")
const albumDetailYear = document.querySelector("div#album-info h3#year-released")
const albumDetailDescription = document.querySelector("div#album-info p#description")




// FETCH //GET 
function getAlbums() {
    fetch("http://localhost:3000/")
        .then(response => response.json())
        .then( albumArr => {
        
            albumArr.map( eachAlbum => {
                createImageMenu(eachAlbum)
            })

            renderAlbumDetail(albumArr[0])
            
        })
}


// //rendering functions
function createImageMenu(album){
    const image = document.createElement("img")
    image.src = album.image
    albumList.appendChild(image)

    image.addEventListener("click", () => {
       renderAlbumDetail(album)
    })
}

const renderAlbumDetail = (album) => {
    currentAlbum = album

    albumDetailImage.src = album.image 
    albumDetailTitle.innerText = album.title
    albumDetailYear.innerText = album.release_year
    albumDetailDescription.innerText = album.description
}

// //function invocation
getAlbums()