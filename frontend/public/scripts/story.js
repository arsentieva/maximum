import { authorCardBuilder } from "./util.js";
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let storyId = localStorage.getItem("MAXIMUM_STORY_ID");

    let url = `http://localhost:8085/stories/${storyId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw res;
    }
    const { story } = await res.json();
    const { title, byline, id, User, createdAt, body } = story;
    const storyContainer = document.querySelector(".story_container");
    const storyHTML = ` <div class="story" id="${id}">
              <div class="story-body">
              <h1 class="story-title">${title}</h1>
                  <div class="story-image">
                  <img src="/images/story-images/${id}.jpg">
              </div>
              <div class="author-card">
               ${authorCardBuilder(User, createdAt)}
            </div>
              <p class="story-byline">${byline}</p>
              <p class="story-body">${body}</p>
      </div>
    </div>
  `;

    storyContainer.innerHTML = storyHTML;
  } catch (err) {
    res.status(503).send({ message: e.message });
  }
});
