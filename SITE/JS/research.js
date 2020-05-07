
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
    
    
    // LOCAL STORAGE:
    let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    // function serviceStorage () {
    //     favoritesArray.push({
    //         // cover:,
    //         musicTitle: musicTitle,
    //         artistName: artistName,
    //         albumTitle: albumTitle
    //     })
    //     localStorage.setItem('favorites', JSON.stringify(favoritesArray))
    //     } 
    
    // SOUMISSION du formulaire de recherche
        // TODO: 
    $('.research_area').submit((e) => {
        e.preventDefault();

        // Valeur de mon input de recherche qu eje passe à l'url de l'API:
        const TITLE = $('.input_research').val();

        // CHAMP SELECT pour le tri que je passe à l'url de l'API
        let selectedCriteria = "";
        $('#criteria').change(function () {
            $("select option:selected").each(function () {
                selectedCriteria += $(this).val() + " ";
            });
        }).change();
    
        console.log(selectedCriteria);

        const selectedValue = $("select option:selected").val();
        // En fonction de la sélection et de la valeur de mon champ, je fais une requête AJAX et j'affiche les résultats.

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
                        <ul class='card' id=${i}>
                            <li class='mini_bg' style="background-image: url('${element.album.cover}');"></li>
                            <li><audio preload="auto" controls src=${element.preview}></audio></li>
                            <li id='title_music'><span>Titre: </span>"${element.title_short}"</li>
                            <li class='artist-name'><span>Artiste: </span>"${element.artist.name}"</li>
                            <li class='album-title'><span>Album: </span>"${element.album.title}"</li> 
                            <button class='favorites'type='button' >Ajout de favoris</button>
                        </ul>
                    `)        
                })
                
                // Lien entre le bouton cliqué et la musique:
                console.log($('ul'));
                $('.favorites').on('click', function () {
                    let btn_index = $('.favorites').index(this);
                    console.log("That was button index: " + btn_index);
                    for (let i = 1; i < $('ul').length ; i++) {
                        if (i === btn_index + 1) {
                            console.log($('ul')[i])
                            // localStorage.setItem('favorites', JSON.stringify($('ul')[i]));
                        }
                    } 
                }) 
                $(function() {
                    $('audio').audioPlayer();
                });
            })   
            
        }
        // TODO: pas réussi le tri par popularité...
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

