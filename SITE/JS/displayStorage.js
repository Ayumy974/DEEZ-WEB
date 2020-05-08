jQuery(document).ready(function () {
    const music_data = JSON.parse(localStorage.getItem('favorites'));
    console.log(music_data);
    if( music_data !== null ) {
        music_data.forEach( (element, index) => {
            if (index <= 2) { // pour afficher seulement les 3 premiers favoris sur la home
                    $(".home_favorites").append(
                        `
                        <ul class='card'>
                            <li id='mini_bg' style="background-image: url('${element.cover}');"></li>
                            <li><audio preload="auto" controls src=${element.audio}></audio></li>
                            <li id='title_music'><span>Titre :</span> ${element.titleshort}</li>
                            <li class='artist-name'><span>Artiste :</span> ${element.artist}</li>
                            <li class='album-title'><span>Album :</span> ${element.title}</li> 
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