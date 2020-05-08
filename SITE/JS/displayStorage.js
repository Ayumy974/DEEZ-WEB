// display favourites on the home page and on the favourites page:

jQuery(document).ready(function () {
    const music_data = JSON.parse(localStorage.getItem('favorites'));

    console.log(music_data);
    let favoritesIds = [];
    if (music_data !== null) {
        favoritesIds = music_data.map(el => {
                    return el.id;
        });
        
        music_data.forEach( (element, index) => {
            if (index <= 2) { 
                $(".home_favorites").append(
                        `
                    <ul class='card' id =${element.id}>
                        <li id='mini_bg' style="background-image: url('${element.cover}');"></li>
                        <li><audio preload="auto" controls src=${element.audio}></audio></li>
                        <li id='title_music'><span>Titre :</span> ${element.titleshort}</li>
                        <li class='artist-name'><span>Artiste :</span> ${element.artist}</li>
                        <li class='album-title'><span>Album :</span> ${element.title}</li>
                        <button onclick="removeFavorite(this)" class='btn_favorites' type='button'>
                            Supprimer des favoris</button>
                    </ul>
                    `
                )
            }
            if (index >= 0) {
                $("#fav_music_cards").append(
                    `
                        <ul class='card' id =${element.id} >
                            <li id='mini_bg' style="background-image: url('${element.cover}');"></li>
                            <li><audio preload="auto" controls src=${element.audio}></audio></li>
                            <li id='title_music'><span>Titre :</span> ${element.titleshort}</li>
                            <li class='artist-name'><span>Artiste :</span> ${element.artist}</li>
                            <li class='album-title'><span>Album :</span> ${element.title}</li>
                            <button onclick="removeFavorite(this)" class='btn_favorites' type='button'>
                            Supprimer des favoris</button>
                        </ul>
                    `
                )
            }
        });
    }

    // Fonction pour le player audio venant d'un plugin:
    $(function () {
        $('audio').audioPlayer();
    });
});