export default class User {
    constructor(data) {
        this.data = data;
    }

    getUuid() {
        return this.data.uuid;
    }

    getName() {
        return this.data.name;
    }

    getSurname() {
        return this.data.surname;
    }

    getEmail() {
        return this.data.email;
    }

    getAdminUrl() {
        return "/prfile/" + this.getUuid();
    }
}