 // Création de mon tableau de favoris du local storage:

function addToFavorite(sender) {
    let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    const musicId = parseInt($(sender).parent().attr('id'));
    let found = false;
    favoritesArray.forEach(function (item, index, object) {
        if (item.id === musicId) {
            object.splice(index, 1);
            found = true;
            }
        }
    )
    if (found === false) {
        favoritesArray.push({
            id: musicId,
            cover: $(sender).parent().data('cover'),
            audio: $(sender).parent().data('audio'),
            titleshort: $(sender).parent().data('titleshort'),
            author: $(sender).parent().data('author'),
            title: $(sender).parent().data('title'),
        });
    }

    localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    console.log(favoritesArray);
}

jQuery(document).ready(function () {
    // remettre l'input de recherche à zéro.
    $('.input_research').focus(function () {
        // console.log('changed');
        $(this).val('');
    });

    // Effacer les anciennes rechercher au submit qui sont remplacées par les nouvelles:
    $('.research_area').submit((e) => {
        e.preventDefault();
        $('#music-cards').empty();
    });
    
    
    // SOUMISSION du formulaire de recherche
        // TODO 1: Récupérer la valeur du champ de recherche.
        // TODO 2: Détecter le changement sur l'input select etrécupérer la valeur.
        // TODO 3: En fonction du critère choisi, requête ajax pour récupérer les données et les afficher.

    $('.research_area').submit((e) => {
        e.preventDefault();

        // 1- Valeur de mon input de recherche queje passe à l'url de l'API.
        const TITLE = $('.input_research').val();

        // 2 -CHAMP SELECT pour le tri, que je passe à l'url de l'API.
        let selectedCriteria = "";
        $('#criteria').change(function () {
            $("select option:selected").each(function () {
                selectedCriteria += $(this).val() + " ";
            });
        }).change();
    
        console.log(selectedCriteria);

        const selectedValue = $("select option:selected").val();

        // 3- En fonction de la sélection et de la valeur de mon champ, je fais une requête AJAX et j'affiche les résultats.

        // Récupérer le local storage: construire un array simple contenant uniquement les id des favoris
        const music_data = JSON.parse(localStorage.getItem('favorites'));
        let favoritesIds = [];
        if (music_data !== null) {
            favoritesIds = music_data.map(el => {
                return el.id;
            });   
        }
        console.log(favoritesIds);
        // FIRST CONDITION: CASE album ou CASE artist ou CASE Music
        if (selectedValue === 'album' || selectedValue === 'artist' || selectedValue === 'track') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
                .then(result => {
                    console.log(result);

                    result.data.forEach( element => {
                        $('#music-cards').append(
                            `
                        <ul
                            class='card'
                            id = ${element.id}  
                            data-cover = "${element.album.cover}"
                            data-audio = "${element.preview}"
                            data-titleshort = "${element.title_short}" 
                            data-artist = "${element.artist.name}" 
                            data-title = "${element.album.title}" 
                        >
                            <li id='mini_bg' style="background-image: url('${element.album.cover}');">
                            </li>
                            <li><audio preload="auto" controls src=${element.preview}></audio></li>
                            <li id='title_music'><span>Titre: </span>"${element.title_short}"</li>
                            <li class='artist-name'><span>Artiste: </span>"${element.artist.name}"</li>
                            <li class='album-title'><span>Album: </span>"${element.album.title}"</li> 
                            <button onclick="addToFavorite(this)" class='btn_favorites' type='button' >${favoritesIds.includes(element.id) ? 'Supprimer' : 'Ajouter'}</button>
                        </ul>
                    `)
                    })

                    // Fonction pour le player audio venant d'un plugin:
                    $(function () {
                        $('audio').audioPlayer();
                    });
                }) 
            // .catch( error => console.log(error))
        }
        
        // SECOND CONDITION: the most popular (fan)
        // else if (selectedValue === 'top') {
        //     $.ajax({
        //         url: `https://api.deezer.com/search?q=${TITLE}/top&order=${selectedCriteria}&output=jsonp`,
        //         method: 'GET',
        //         dataType: 'jsonp'
        //     })
        //     console.log(result);
        //     result.data.forEach(element => {
        //         $('#music-cards').append(
        //             `
        //             <ul class='card'>
        //                 <div class='mini_bg' style="background-image: url('${element.album.cover}');"></div>
        //                 <li><audio controls src=${element.preview}></audio></li>
        //                 <li>Titre:${element.title_short}</li>
        //                 <li>Artiste: ${element.artist.name}</li>
        //                 <li>Album:${element.album.title}</li>    
        //             </ul>
        //         `)
        //     })
        // }

        // THIRD CONDITION: rank order
        else if (selectedValue === 'rank') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
            .then(result => {
                const popularMusic = result.data.map(music => music.rank);
                console.log(popularMusic);
                const sortArr = popularMusic.sort(function (a, b) { return a - b }); // tri par ordre croissant
                console.log(sortArr);
                result.data.forEach( (element, i) => {
                    console.log(element.rank = sortArr[i]);
                    console.log(result.data);
                    if (element.rank = sortArr[i]) {
                        $('#music-cards').append(
                            `
                            <ul class='card'>
                                <div class='mini_bg' style="background-image: url('${element.album.cover}');"></div>
                                <li><audio controls src=${element.preview}></audio></li>
                                <li>Titre:${element.title_short}</li>
                                <li>Artiste: ${element.artist.name}</li>
                                <li>Album:${element.album.title}</li>    
                            </ul>
                        `)
                    }
                })
            })
        }
    })   
})

