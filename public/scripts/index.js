import { authorCardBuilder, backendURL, getRandomInt, featuredStoriesHtml } from "./util.js";

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
        <div class="story story-tile" id="${id}">
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
  const featStory= stories[1];
  const randomStory = stories[getRandomInt(2, 12)];
  storiesContainer.innerHTML = featuredStoriesHtml(featStory) + featuredStoriesHtml(randomStory) + storiesHtml.join("");
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchStories();

    const storyCards = document.querySelectorAll(".story");
    if (storyCards) {
      storyCards.forEach((storyCard) => {
        storyCard.addEventListener("click", () => {
          window.location.href = `/stories/${storyCard.id}`;
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
});
