import { authorCardBuilder, backendURL } from "./util.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let storyId = localStorage.getItem("MAXIMUM_STORY_ID");

    let url = `${backendURL}/stories/${storyId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw res;
    }
    const { story } = await res.json();
    const { title, byline, id, User, createdAt, body } = story;
    const storyContainer = document.querySelector(".story-container");
    const storyHTML = `
    <div class="story" id="${id}">
      <div class="story-page-content">
        <h1 class="story-page-title">${title}</h1>
        <h3 class="story-page-byline">${byline}</h3>
        <div class ="author-container">
          <div class="author-card">
            ${authorCardBuilder(User, createdAt)}
          </div>
          <button class="follow-button" type="button">Follow</button>
        </div>
        <div class="story-page-image">
          <img src="/images/story-images/${id}.jpg">
        </div>
        <p class="story-page-text">${body}</p>
        <div class="claps">
          <div class="claps-image">
            <img src="/images/resources/clap.png">
          </div>
          <p>23 claps</p>
        </div>

      </div>
    </div>
  `;

    storyContainer.innerHTML = storyHTML;
  } catch (err) {
    res.status(503).send({ message: e.message });
  }
});
