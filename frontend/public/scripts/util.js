export function authorCardBuilder(User, datePublished, useFullYear) {
  let dateType = 1;
  if (useFullYear) dateType = 2;
  return `
    <div class="author-image">
      <img src="/images/profile-images/1.png">
    </div>
    <div class="author-text">
      <p class="author-name">${User.name}</p>
      <p class="author-date">${formatDateFromSequelize(datePublished, dateType)}</p>
    </div>
  `
};

// export const backendURL = "https://radiant-garden-26318.herokuapp.com";
export const backendURL = "http://localhost:8085";

/* Use the following function to format your date from the string returned from sequelize.
Returns either a string or an array depending on specified formatType(integer)
formatType 1 = Month Day (e.g. 'June 10')
formatType 2 = Month Day, Year (e.g. 'July 25, 1988') ***IF NO formatType IS SPECIFIED, THIS IS RETURNED BY DEFAULT***
formatType 3 = array containing day, month, and year as ints (e.g. [30, 9, 1993])*/
export function formatDateFromSequelize(oldString, formatType) {
  const year = oldString.slice(0,4);
  const month = oldString.slice(5,7);
  const day = oldString.slice(8,10);
  const date = new Date(year, month, day);
  const monthString = date.toLocaleString('default', { month: 'long' });
  const dayString = date.getDay().toString();
  const yearString = date.getFullYear().toString();

  if (formatType == 1) {
    return monthString + ' ' + dayString;
  }
  if (formatType == 3) {
    return [parseInt(day), parseInt(month), parseInt(year)]
  } else { // assumes formatType2
    return monthString + ' ' + dayString + ', ' + yearString;
  }
}
