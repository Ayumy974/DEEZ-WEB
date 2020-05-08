
    // La fonction se répète dans favorite.js: dans l'idée exporter avec les modules.
    function addToFavorite(sender) {
        let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
        const musicId = parseInt($(sender).parent().attr('id'));
        let found = false;
        favoritesArray.forEach(function (item, index, object) {
            if (item.id === musicId) {
                object.splice(index, 1);
                found = true;
            }
        })
        if (found === false) {
            favoritesArray.push({
                id: musicId,
                cover: $(sender).parent().data('cover'),
                audio: $(sender).parent().data('audio'),
                artist: $(sender).parent().data('artist'),
                titleshort: $(sender).parent().data('titleshort'),
                title: $(sender).parent().data('title'),
            }); 
            $(sender).text('Supprimer des favoris');
                
        } else { $(sender).text('Ajouter aux favoris'); }
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
        console.log(favoritesArray);
    }

    // Utilisation de jQuery pour la requête AJAX vers l'API Deezer.
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
        
            console.log('Le critère sélectionné: ' + selectedCriteria);

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
            console.log('Mon array d\'id de favoris: ' + favoritesIds);

            // FIRST CONDITION: CASE album ou CASE artist ou CASE Music
            if (selectedValue === 'album' || selectedValue === 'artist' || selectedValue === 'track') {
                $.ajax({
                    url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                    method: 'GET',
                    dataType: 'jsonp'
                })
                    .done(result => {
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
                                <button onclick="addToFavorite(this)" class='btn_favorites' type='button' >${favoritesIds.includes(element.id) ? 'Supprimer des favoris' : 'Ajouter aux favoris'}</button>
                            </ul>
                        `)
                        })

                        // Fonction pour le player audio venant d'un plugin:
                        $(function () {
                            $('audio').audioPlayer();
                        });
                    }) 
                    .fail(function(xhr, status, error) {
                        //Ajax request failed.
                        var errorMessage = xhr.status + ': ' + xhr.statusText
                        alert('Error - ' + errorMessage);
                })
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

            // THIRD CONDITION: rank order: ne fonctionne pas
            else if (selectedValue === 'rank') {
                $.ajax({
                    url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                    method: 'GET',
                    dataType: 'jsonp'
                })
                .done(result => {
                    result.data.sort( (a, b) => {
                        return a.rank - b.rank
                    })

                    result.data.forEach( (element, i) => {
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
                                <li>Rang: ${element.rank}</li>
                                <button onclick="addToFavorite(this)" class='btn_favorites' type='button' >${favoritesIds.includes(element.id) ? 'Supprimer des favoris' : 'Ajouter aux favoris'}</button>
                            </ul>
                            `)
                        })
                        // Fonction pour le player audio venant d'un plugin:
                        $(function () {
                            $('audio').audioPlayer();
                        });
                })
                .fail(function(xhr, status, error) {
                    //Ajax request failed.
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
            })
            }
        })   
    })

