
const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const formatDate = (date) => {
    let result = formatAMPM(date)
    let month = date.toLocaleString('default', { month: 'short' })
    result = result + ' . ' + month + ' ' + date.getDate().toString() + ', ' +  date.getFullYear().toString()
    return result
}


  module.exports = {
    formatDate
  }