import moment from 'moment';

class Order {
  constructor(id, items, totalAmount, pubId, date, tableNo, orderStatus) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.pubId = pubId;
    this.date = date;
    this.tableNo = tableNo;
    this.orderStatus = orderStatus;
  }

  get readableDate() {
    //   return this.date.toLocaleDateString('en-EN', {
    //       year: 'numeric',
    //       month: 'long',
    //       day: 'numeric',
    //       hour: '2-digit',
    //       minute: '2-digit'
    //   });
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Order;