import { authorCardBuilder, backendURL } from "./util.js";

console.log(authorCardBuilder);
const fetchStories = async () => {
  let url = `${backendURL}/stories`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401) {
    window.location.href = "/log-in";
    return;
  }
  const { stories } = await res.json();
  const storiesContainer = document.querySelector(".stories-container");
  const storiesHtml = stories.map(
    ({ title, byline, id, User, createdAt }) => `
        <div class="story" id="${id}">
          <div class="story-body">
            <div class="story-image">
              <img src="/images/story-images/${id}.jpg">
            </div>
            <h3 class="story-title">${title}</h3>
            <p class="story-byline">${byline}</p>
            <div class="author-card">
              ${authorCardBuilder(User, createdAt)}
            </div>
          </div>
        </div>
      `
  );
  storiesContainer.innerHTML = storiesHtml.join("");
};
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchStories();

    const storyCards = document.querySelectorAll(".story");
    if (storyCards) {
      storyCards.forEach((storyCard) => {
        storyCard.addEventListener("click", () => {
          localStorage.setItem("MAXIMUM_STORY_ID", storyCard.id);
          window.location.href = `/stories/${storyCard.id}`;
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
});
