import moment from 'moment';

function getDateFormatted(date) {
  console.log('---', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}
export default getDateFormatted;
