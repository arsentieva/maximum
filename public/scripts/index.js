import { authorCardBuilder, backendURL } from "./util.js";

const fetchStories = async () => {
  let url = `${backendURL}/stories`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401 || res.status === 500) {
    window.location.href = "/log-in";
    return;
  }
  const { stories } = await res.json();
  // const featStory= stories[2];

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
          window.location.href = `/stories/${storyCard.id}`;
        });
      });
    }
  } catch (e) {
    console.error(e);
  }
});
