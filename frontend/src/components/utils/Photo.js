import Config from "../config/Config";

class Photo {
    constructor(data) {
        this.data = data;
    }

    findPhotoItemByType(type){
        if(!this.data){
            return false;
        }

        if(!this.data.photoItemList){
            return false;
        }

        return this.data.photoItemList.find((e) => {
            if (e.type === type) {
                return true;
            }
        });
    }

    getPhotoSourceUrl() {
        const photoItem = this.findPhotoItemByType('source');

        if(!photoItem){
            return false;
        }

        return Photo.prepareUrl(photoItem.name);
    }

    getPhotoLargeUrl() {
        const photoItem = this.findPhotoItemByType('large');

        if(!photoItem){
            return false;
        }

        return Photo.prepareUrl(photoItem.name);
    }

    getPhotoSmallUrl() {
        const photoItem = this.findPhotoItemByType('small');

        if(!photoItem){
            return false;
        }

        return Photo.prepareUrl(photoItem.name);
    }


    static prepareUrl(filename) {
        return Config.apiDomain + "/" + Config.endpoints.photo.storage.replace('{filename}', filename);
    }

}

export default Photo;