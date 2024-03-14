import i18n from "../../modules/language/i18n";

export default class Competition {
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

    getStartDate() {
        return Competition.formatDate(this.data.startDate);
    }

    getEndDate() {
        return Competition.formatDate(this.data.endDate);
    }

    getActiveDates() {
        return this.getStartDate() + " - " + this.getEndDate();
    }

    static formatDate(date) {
        const d = new Date(date);

        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return d.getFullYear() + "." + month + '.' + day;
    }

    static formatDateTime(date) {
        const d = new Date(date);

        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return d.getFullYear() + "." + month + '.' + day + ' ' + hours + ":" + minutes;
    }

    getAdminUrl() {
        return "/admin-competition-edit/" + this.getUuid();
    }
}