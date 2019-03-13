import moment from 'moment';

function getDateFormatted(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}
export default getDateFormatted;
