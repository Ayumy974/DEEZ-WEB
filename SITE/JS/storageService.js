
class StorageService {
    
    constructor(storageId) {
        this.storageId = storageId;
        this.init();
    }

    init() {
        const storedData = localStorage[this.storageId];
        
        if(!storedData) {
            const data = {
                favorites: []
            };
            
            // on initialise le localStorage avec notre structure 
            // qui ne contient encore qu'une ou plusieurs clés avec
            // des valeurs vides (ici, l'unique clé 'contacts' est
            // un tableau vide au départ)
            localStorage[this.storageId] = JSON.stringify(data);
        }
    }

    getData(key) {
        const data = JSON.parse(localStorage[this.storageId]);
        const item = data[key];
        return item;
    }

    setData(key, newData) {

        // 3 étapes : 
        // 1 - On extrait les données existantes du localStorage
        const data  = JSON.parse(localStorage[this.storageId]);
        // 2 - On update ces données (un objet) en remplaçant sa
        // propriété donnée par la nouvelle valeur ('newData')
        data[key]   = newData;
        // 3 - On reconvertit le tout en un JSON qu'on réinjecte
        // dans le localStorage 
        localStorage[this.storageId] = JSON.stringify(data);
    }
}

export default StorageService;