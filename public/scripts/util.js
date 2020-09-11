export function authorCardBuilder(User, storyId, datePublished, useFullYear) {
  let dateType = 1;
  let img = '1.png';
  if (useFullYear) dateType = 2;
  if (User.id < 7) img = User.id.toString() + '.jpg'; console.log("Image", img); console.log("User id", User.id)
  if (!datePublished) return // For some reason, stories.map on index.js line 19 is returning an extra index, need to break away from it when hit.
  return `
    <div class="author-image">
      <img src="/images/profile-images/${img}">
    </div>
    <div class="author-text">
      <p class="author-name">${User.name}</p>
      <p class="author-date">${formatDateFromSequelize(datePublished, dateType)}</p>
    </div>
  `
};

export function featuredStoriesHtml(featStory) {
  return `
    <div class ="featuredStory story" id="${featStory.id}">
      <div class="feat-story-image">
        <img src="/images/story-images/${giveImage(featStory.id)}.jpg">
      </div>
      <div class="feat-story-text">
        <h2 class="feat-story-header">${featStory.title}</h2>
        <p class="feat-story-byline">${featStory.byline}</p>
        <div class="author-card">
          ${authorCardBuilder(featStory.User, featStory.User.id, featStory.createdAt)}
        </div>
      </div>
    </div>
  `
};
export const backendURL = "https://radiant-garden-26318.herokuapp.com";
// export const backendURL = "http://localhost:8080";

/* Use the following function to format your date from the string returned from sequelize.
Returns either a string or an array depending on specified formatType(integer)
formatType 1 = Month Day (e.g. 'June 10')
formatType 2 = Month Day, Year (e.g. 'July 25, 1988') ***IF NO formatType IS SPECIFIED, THIS IS RETURNED BY DEFAULT***
formatType 3 = array containing day, month, and year as ints (e.g. [30, 9, 1993])*/
export function formatDateFromSequelize(oldString, formatType) {
  const year = oldString.slice(0, 4);
  const month = oldString.slice(5, 7).toString() - 1;
  const day = oldString.slice(8, 10);
  const date = new Date(year, month, day);
  const monthString = date.toLocaleString('default', { month: 'long' });
  const dayString = date.getDate();
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

// Look into how Random Int is randomly generating image ids
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function giveImage(id) {
  if (id >= 0 && id < 12) return id;
  return getRandomInt(1, 11);
}
