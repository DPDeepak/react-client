import moment from 'moment';

function getDateFormatted() {
  console.log('---', moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));

  return moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
}
export default getDateFormatted;
