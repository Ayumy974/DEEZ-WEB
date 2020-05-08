// DISPLAY FAVORITES ON HOME PAGE:
// function deleteFavorite(send) {
//     console.log(send)
//     let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
//         const musicId = parseInt($(sender).parent().attr('id'));
//         let found = false;
//         favoritesArray.forEach(function (item, index, object) {
//             if (item.id === musicId) {
//                 object.splice(index, 1);
//                 found = true;
//             }
//     })
// }
jQuery(document).ready(function () {
    const music_data = JSON.parse(localStorage.getItem('favorites'));

    console.log(music_data);
    let favoritesIds = [];
    if (music_data !== null) {
        favoritesIds = music_data.map(el => {
                    return el.id;
        });
        
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
                            'Supprimer des favoris'</button>
                        </ul>
                    `
                )
            }
        });
    }

    // if (music_data !== null) {
    //     let favoritesId;
    //     favoritesIds = music_data.map(el => {
    //         return el.id;
    //     });
    //     music_data.forEach( element => {
    //         $("#fav_music_cards").append(
    //             `
    //                 <ul class='card'>
    //                     <li id='mini_bg' style="background-image: url('${element.cover}');"></li>
    //                     <li><audio preload="auto" controls src=${element.audio}></audio></li>
    //                     <li id='title_music'><span>Titre :</span> ${element.titleshort}</li>
    //                     <li class='artist-name'><span>Artiste :</span> ${element.artist}</li>
    //                     <li class='album-title'><span>Album :</span> ${element.title}</li>
    //                     <button onclick="addToFavorite(this)" class='btn_favorites' type='button' >
    //                     // ${favoritesIds.includes(element.id) ? 'Supprimer des favoris' : 'Ajouter aux favoris'}</button> 
    //                 </ul>
    //             `
    //         )}
    //     );
    // } 
    // Fonction pour le player audio venant d'un plugin:
    $(function () {
        $('audio').audioPlayer();
    });
});