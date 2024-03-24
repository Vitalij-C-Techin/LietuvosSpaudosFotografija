import Config from "../config/Config";

class Photo {
    constructor(data) {
        this.data = data;
    }

    findPhotoItemByType(type){
        return this.data.photoItemList.find((e) => {
            if (e.type === type) {
                return true;
            }
        });
    }

    getPhotoSourceUrl() {
        const photoItem = this.findPhotoItemByType('source');

        return Photo.prepareUrl(photoItem.name);
    }

    getPhotoLargeUrl() {
        const photoItem = this.findPhotoItemByType('large');

        return Photo.prepareUrl(photoItem.name);
    }

    getPhotoSmallUrl() {
        const photoItem = this.findPhotoItemByType('small');

        return Photo.prepareUrl(photoItem.name);
    }


    static prepareUrl(filename) {
        return Config.apiDomain + "/" + Config.endpoints.photo.storage.replace('{filename}', filename);
    }

}

export default Photo;