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

function removeFavorite(sender) {
    let favoritesArray = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
    const musicId = parseInt($(sender).parent().attr('id'));
    let found = false;
    favoritesArray.forEach(function (item, index, object) {
        if (item.id === musicId) {
            object.splice(index, 1);
            found = true;
        }
    })
    
    if (found === true) {
        $(sender).parent().remove();
        localStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    console.log(favoritesArray);
}

// Dans l'idéal créer une fonction addOrRemoveFavorite(sender, callBack) pour éviter de dupliquer le code