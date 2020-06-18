export function authorCardBuilder(User, datePublished) {
// const authorCardBuilder = (User, datePublished) => {
  return `
  <h4 "author-name">${User.name}</h4>
    <div class="author-image">
      <img src="/images/profile-images/1.png">
    </div>
  <p "author-date">${datePublished}</p>
  `
};

// module.exports = { authorCardBuilder };
