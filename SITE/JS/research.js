
$(document).ready(function () {
    
    // $('.input_research').change(function () {
    //     const TITLE = $('.input_research').val();
    //     console.log(TITLE);    
    // })
    // const researchTitle = `${TITLE}`;

    $('.research_area').submit((e) => {
        e.preventDefault();
        const TITLE = $('.input_research').val();
        // console.log(TITLE);

        // Afficher le texte du champ sélectionné:
        let selectedCriteria = "";
        $('#criteria').change(function () {
            let str = '';
            $("select option:selected").each(function () {
                str += $(this).val() + " ";
                selectedCriteria = str;
            });
        }).change();
    
        console.log(selectedCriteria);
        if ($("select option:selected").val() === 'album') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${selectedCriteria}:"${TITLE}"&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
            .then(result => {
                console.log(result);
                // console.log(element.artist.preview)
                result.data.forEach(element => {
                    $('#music-cards').append(
                        `
                        <div class='card'>
                            <div class='mini_bg' style="background-image: url('${element.album.cover}');"></div>
                            <audio controls src=${element.preview}></audio>
                            <h5>Album: ${element.album.title}</h5>
                        </div>
                    `)
                })
            })
        } else if ($("select option:selected").val() === 'artist') {
            $.ajax({
                url: `https://api.deezer.com/search?q=${selectedCriteria}:"${TITLE}"&output=jsonp`,
                method: 'GET',
                dataType: 'jsonp'
            })
            .then(result => {
                console.log(result);
                result.data.forEach(element => {
                    $('#music-cards').append(
                        `
                        <div class='card'>
                            <div class='mini_bg' style="background-image: url('${element.artist.picture}');"></div>
                            <div class='overlay'></div>
                            <h3>Nom de l'artiste: ${element.artist.name}</h3>
                            <audio controls src=${element.artist.preview}></audio>  
                        </div>
                        `)
                })
            })
        }
        else {
                $('#music-cards').append(
                    `<h2>Aucun résultat pour cette recherche</h2>`
                )
            }
    })
})
                    // // CASE ARTIST:
                    // else if (selectedCriteria == 'artist') {
                    //     console.log('ok artist')

                    //     $('#music-cards').append(
                    //         `
                    //     <div class='card'>
                    //         <div class='mini_bg' style="background-image: url('${element.picture}');"></div>
                    //         <div class='overlay'></div>
                    //         <ul>
                    //             <li>Nom de l'artiste: ${element.artist.name}</li>
                    //         </ul>
                    //     </div>
                    //     `)
                    // }
                    // // CASE MUSIC:
                    // else if (selectedCriteria === 'track') {
                    //     console.log('ok musique')
                    //     $('#music-cards').append(
                    //         `
                    //     <div class='card'>
                    //         <div class='mini_bg' style="background-image: url('${element.artist.preview}');"></div>
                    //         <div class='overlay'></div>
                    //         <ul>
                    //             <li>Nom de la musique: ${element.artist.title}</li>
                    //         </ul>
                    //     </div>
                    //     `)
                    // } else {
                    //     $('#music-cards').append(
                    //         `<h2>Aucun résultat pour cette recherche</h2>`
                    //     )
                    // }
                // });       

// const displayAlbum = album => {
//     album.forEach( title => {
//         console.log(title)
//     });
// }