jQuery(document).ready(function () {
    const music_data = JSON.parse(localStorage.getItem('favorites'));
    console.log(music_data);
    if(music_data !== []) {
        music_data.forEach(element => {
                $(".home_favorites").append(
                    `
                    <ul>
                        <li class='mini_bg' style="background-image: url('${element.cover}');"></li>
                        <li><audio controls src=${element.audio}></audio></li>
                        <li id='title_music'>Titre:${element.titleshort}</li>
                        <li class='artist-name'>Artiste: ${element.author}</li>
                        <li class='album-title'>Album:${element.title}</li> 
                        <button class='favorites'type='button' >Ajout de favoris</button>
                    </ul>
                    `
                )
                console.log(element.title);
        });
    }
});