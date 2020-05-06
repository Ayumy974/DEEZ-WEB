
$(document).ready(function () {
    
    $('.input_research').focus(function () {
        console.log('changed');
        $(this).val('');
    });

    $('.research_area').submit((e) => {
        e.preventDefault();
        $('#music-cards').empty();
    });
    
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
        // if ($("select option:selected").val() === 'album') {
        $.ajax({
            url: `https://api.deezer.com/search?q=${TITLE}&order=${selectedCriteria}&output=jsonp`,
            method: 'GET',
            dataType: 'jsonp'
        })
        .then(result => {
            console.log(result);
            // console.log(element.artist.preview)
            result.data.forEach(element => {
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
            })
        }) 
    })
    
    $('#music-cards').empty();
    

    

    //     else {
    //             $('#music-cards').append(
    //                 `<h2>Aucun résultat pour cette recherche</h2>`
    //             )
    //         }
    // })
})

