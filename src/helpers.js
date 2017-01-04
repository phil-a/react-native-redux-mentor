import _ from 'lodash';
import moment from 'moment';

export const extractDates = (dates_completed) => {
  var completed_array = [];
  const completed_objects = _.values(dates_completed);
  _.forEach(completed_objects, function(value) {
    completed_array.push(moment(value["completed_datetime"]).format("YYYY-MM-DD"));
  });
  return completed_array;
}
