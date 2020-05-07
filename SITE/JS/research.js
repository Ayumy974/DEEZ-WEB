
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

        // FIRST CONDITION: CASE album ou CASE artist ou CASE Music
        if (selectedValue === 'album' || selectedValue === 'artist' || selectedValue === 'track') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
                .then(result => {
                    console.log(result);

                    result.data.forEach((element, i) => {
                        $('#music-cards').append(
                            `
                        <ul
                            class='card'
                            id = ${i}  
                            data-cover = "${element.album.cover}"
                            data-audio = "${element.preview}"
                            data-title = "${element.title_short}" 
                            data-artist = "${element.artist.name}" 
                            data-title = "${element.album.title}" 
                        >
                            <li id='mini_bg' style="background-image: url('${element.album.cover}');">
                            </li>
                            <li><audio preload="auto" controls src=${element.preview}></audio></li>
                            <li id='title_music'><span>Titre: </span>"${element.title_short}"</li>
                            <li class='artist-name'><span>Artiste: </span>"${element.artist.name}"</li>
                            <li class='album-title'><span>Album: </span>"${element.album.title}"</li> 
                            <button class='btn_favorites'type='button' >Ajout de favoris</button>
                        </ul>
                    `)
                    })

                    // Fonction pour le player audio venant d'un plugin:
                    $(function () {
                        $('audio').audioPlayer();
                    });

                    // Création de mon tableau de favoris du local storage:
                    let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
                    
                    // AU clic sur le bouton, je stocke la musique dans le local storage:
                    $('.btn_favorites').on('click', function () {
                        let btn_index = $('.btn_favorites').index(this);
                        console.log("That was button index: " + btn_index);
                        const ulArr = $('ul');
                        for (let i = 1; i < ulArr.length; i++) {
                            if (i === btn_index + 1) {
                                const selectUl = $('ul')[i];
                                favoritesArray.push({
                                    id: btn_index,
                                    cover: selectUl.dataset.cover,
                                    audio: selectUl.dataset.audio,
                                    title: selectUl.dataset.title,
                                    author: selectUl.dataset.artist,
                                    title: selectUl.dataset.album,
                                });
                                localStorage.setItem("favorites", JSON.stringify(favoritesArray));
                                
                            }
                        }
                    })
                    favoritesArray.forEach(el => {
                        console.log(el.id)
                    })
                    // let cache = {};
                    // favoritesArray = favoritesArray.filter(function(elem,index,array){
                    //     return cache[elem.id] ? 0 : cache[elem.id] = 1;
                    // })
                    
                    // console.log(JSON.stringify(favoritesArray));
                }) 
            .catch( error => console.log(error))
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

