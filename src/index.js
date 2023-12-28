




let currentAlbum

//HTML DOM Node elements
const albumList = document.querySelector("#album-list")
const albumDetailImage = document.querySelector("#detail-image")
const albumDetailTitle = document.querySelector("#title")
const albumDetailYear = document.querySelector("#year")
const albumDetailArtist = document.querySelector("#artist")




// FETCH //GET 
function getAlbums() {
    fetch("http://localhost:3000/albums")
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
    albumDetailTitle.textContent = album.title
    albumDetailYear.textContent = album.year
    albumDetailArtist.textContent = album.artist
}

// //function invocation
getAlbums()