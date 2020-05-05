$(document).ready(function(){
    $.ajax({
        url: 'https://api.deezer.com/search?q=eminem&output=jsonp',
        method: 'GET',
        dataType: 'jsonp'
    })
        .then(result => {
            // let data = JSON.parse(result);
            // console.log(result.data[0].album.title);
            // console.log(result.data[0].album.title);
            result.data.forEach(element => {
                console.log(element.album.cover);
                $('#music-cards').append(
                `
                <div class='card'>
                    <div class='mini_bg' style="background-image: url('${element.album.cover}');"></div>
                    <div class='overlay'></div>
                    <h3>${element.album.title}</h3>
                </div>
                `)
            });
    })
});

// const displayAlbum = album => {
//     album.forEach( title => {
//         console.log(title)
//     });
// }