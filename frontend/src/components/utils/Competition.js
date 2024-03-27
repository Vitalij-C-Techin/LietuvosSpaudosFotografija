import i18n from '../../modules/language/i18n';

export default class Competition {
  constructor(data) {
    this.data = data;
  }

  getUuid() {
    return this.data.uuid;
  }

  getName() {
    return this.data[`name_${i18n.language}`];
  }

  getDescription() {
    return this.data[`description_${i18n.language}`];
  }

  getStatus() {
    return this.data.status;
  }

  getStartDate() {
    return Competition.formatDate(this.data.start_date);
  }

  getEndDate() {
    return Competition.formatDate(this.data.end_date);
  }

  getActiveDates() {
    return this.getStartDate() + ' - ' + this.getEndDate();
  }

  static formatDate(date) {
    const d = new Date(date);

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return d.getFullYear() + '.' + month + '.' + day;
  }

  static formatDateTime(date) {
    const d = new Date(date);

    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return d.getFullYear() + '.' + month + '.' + day + ' ' + hours + ':' + minutes;
  }

  getAdminUrl() {
    return '/admin-competition-edit/' + this.getUuid();
  }
}
