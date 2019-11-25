import Vue from 'vue';
import moment from 'moment';

const filters = () => {

  Vue.filter('formatDate', (value, formatType = 'Do MMM YY') => {
    if (!value) return '';

    return moment(value).format(formatType);
  })

  Vue.filter('shortenText', (text, maxLength = 200) => {
    if(text && typeof text === 'string') {
      const finalChar = text.length > maxLength ? '...' : '';
      return text.substr(0, maxLength) + finalChar;
    }
  
    return '';
  })

  Vue.filter('fromNow', (value) => {
    if (!value) return '';

    return moment(value).fromNow();
  })

  Vue.filter('capitalize', (value) => {
    if (value && typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }

    return '';
  })
}

export default filters;
