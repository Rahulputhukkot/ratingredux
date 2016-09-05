const valueToSave = {
  timestamp: '2016-09-05 12:54:45',
  rating: 5,
  desc: "very good service",
  email: "krishna.sharma@qburst.com",
};
const rowToWrite = Object
  .values(valueToSave)
  .map(
    value => encodeURIComponent(value)
  )
  .join(',')
;
// outputs: ""
const rowRead = '2016-09-05%2012%3A54%3A45,5,very%20good%20service,krishna.sharma%40qburst.com';
const keys = ['email','rating','timestamp','desc'];
const valueToReturn = {};
rowRead
  .split(',')
  .forEach(
    (value, index) => (
      valueToReturn[keys[index]] = decodeURIComponent(value)
    )
;
