import i18n from "../../modules/language/i18n";

class Category {
    constructor(data) {
        this.data = data;
    }

    getUuid() {
        return this.data.uuid;
    }

    getName() {
        switch (i18n.language) {
            case "en":
                return this.data.nameEn;
            case "lt":
            default:
                return this.data.nameLt;
        }
    }

    getDescription() {
        switch (i18n.language) {
            case "en":
                return this.data.descriptionEn;
            case "lt":
            default:
                return this.data.descriptionLt;
        }
    }
}

export default Category;