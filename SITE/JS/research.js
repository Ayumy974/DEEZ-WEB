
    jQuery(document).ready(function () {

    $('.input_research').focus(function () {
        console.log('changed');
        $(this).val('');
    });

    $('.research_area').submit((e) => {
        e.preventDefault();
        $('#music-cards').empty();
    });
    
        
    let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    function serviceStorage () {
        favoritesArray.push({
            // cover:,
            musicTitle: musicTitle,
            artistName: artistName,
            albumTitle: albumTitle
        })
        localStorage.setItem('favorites', JSON.stringify(favoritesArray))
        } 
        
    $('.research_area').submit((e) => {
        e.preventDefault();
        const TITLE = $('.input_research').val();

        // Afficher le texte du champ sélectionné:
        let selectedCriteria = "";
        $('#criteria').change(function () {
            $("select option:selected").each(function () {
                selectedCriteria += $(this).val() + " ";
            });
        }).change();
    
        console.log(selectedCriteria);
        const selectedValue = $("select option:selected").val();

        // FIRST CONDITION: CASE album ou CASE artist ou CASE Music
        if (selectedValue === 'album' || selectedValue === 'artist' || selectedValue === 'track') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
            .then(result => {
                console.log(result);
                // LOCAL STORAGE:
                
                console.log(favoritesArray);
                // localStorage.setItem('favorites', JSON.stringify(favoritesArray))
                const music_data = JSON.parse(localStorage.getItem('favorites'));

                result.data.forEach((element, i) => {
                    $('#music-cards').append(
                        `
                        <ul class='card' id=${i}>
                            <li class='mini_bg' style="background-image: url('${element.album.cover}');"></li>
                            <li><audio controls src=${element.preview}></audio></li>
                            <li id='title_music'>Titre:${element.title_short}</li>
                            <li class='artist-name'>Artiste: ${element.artist.name}</li>
                            <li class='album-title'>Album:${element.album.title}</li> 
                            <button class='favorites'type='button' >Ajout de favoris</button>
                        </ul>
                    `)        
                })
                

                // const arrBtn = $('button').get();
                // let titleMusic = $('.title_music').get();
                // console.log(titleMusic[0]);
                // console.log(arrBtn);
                // console.log(title_index);
                $('.favorites').on('click', function () {
                    const newArr = [...result.data]
                    let btn_index = $('.favorites').index(this);
                    console.log("That was button index: " + btn_index);
                    for (let i = 0; i < newArr.length; i++) {
                        console.log(indexOf(i));
                    }   
                })
                
                // let musicTitle = $('.title_music').text();
                // let artistName = $('.artist-name').text();
                // let albumTitle = $('.album-title').text();
                // console.log(musicTitle);
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

