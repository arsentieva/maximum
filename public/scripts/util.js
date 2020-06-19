export function authorCardBuilder(User, datePublished) {
  // const authorCardBuilder = (User, datePublished) => {
    const year = datePublished.slice(0,4);
    const month = datePublished.slice(5,7);
    const day = datePublished.slice(8,10);
    const date = new Date(year, month, day);
    const monthString = date.toLocaleString('default', { month: 'long' });
    const dayString = date.getDay().toString();
    const dateString = monthString + ' ' + dayString;
  return `
    <div class="author-image">
      <img src="/images/profile-images/1.png">
    </div>
    <div class="author-text">
      <p class="author-name">${User.name}</p>
      <p class="author-date">${dateString}</p>
    </div>
  `
};

export const backendURL = "https://radiant-garden-26318.herokuapp.com";
// export const backendURL = "http://localhost:8085";
