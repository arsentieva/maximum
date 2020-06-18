export function authorCardBuilder(User, datePublished) {
// const authorCardBuilder = (User, datePublished) => {
  return `


    <div class="author-image">
      <img src="/images/profile-images/1.png">
    </div>
    <div class="author-text">
      <p "author-name">${User.name}</p>
      <p "author-date">${datePublished}</p>
    </div>
  `
};

// module.exports = { authorCardBuilder };
