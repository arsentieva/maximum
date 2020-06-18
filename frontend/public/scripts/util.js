export function authorCardBuilder(User, datePublished) {
  // const authorCardBuilder = (User, datePublished) => {
  return `


    <div class="author-image">
      <img src="/images/profile-images/1.png">
    </div>
  <p "author-date">${datePublished}</p>
  `;
}

export const backendURL = "https://radiant-garden-26318.herokuapp.com";
// export const backendURL = "http://localhost:8085";
