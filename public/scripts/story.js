import { authorCardBuilder, backendURL } from "./util.js";
let authorId = "";
let pathName = window.location.pathname;
const storyId = pathName.substring(pathName.lastIndexOf("/") + 1);
localStorage.setItem("MAXIMUM_STORY_ID", storyId);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let url = `${backendURL}/stories/${storyId}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
    });
    if (!res.ok) {
      throw res;
    }
    const { story, userFollowsAuthor } = await res.json();
    const { title, byline, id, User, createdAt, body } = story;
    authorId = User.id;
    const storyContainer = document.querySelector(".story-container");
    let followButtonText = "Follow";
    if (userFollowsAuthor) {
      followButtonText = "Unfollow";
    }
    const storyHTML = `
    <div class="story" id="${id}">
      <div class="story-page-content">
        <h1 class="story-page-title">${title}</h1>
        <h3 class="story-page-byline">${byline}</h3>
        <div class ="author-container">
          <div class="author-card">
            ${authorCardBuilder(User, createdAt)}
          </div>
          <button class="follow-button" type="button">${followButtonText}</button>
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

    const followButton = document.querySelector(".follow-button");
    if (followButton) {
      followButton.addEventListener("click", async () => {
        let followState = followButton.innerText;
        await handleFollow(followState);
      });
    }
  } catch (err) {
    res.status(503).send({ message: e.message });
  }

  const handleFollow = async (followState) => {
    let method = "POST";
    if (followState === "Unfollow") {
      method = "DELETE";
    }
    let body = { followedId: authorId };
    let url = `${backendURL}/follows`;
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "MAXIMUM_ACCESS_TOKEN"
          )}`,
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.log(res.status);
        throw res;
      }

      await res.json();
      toggleFollowButton();
    } catch (err) {
      console.error(err);
    }
  };
});

function toggleFollowButton() {
  const followButton = document.querySelector(".follow-button");
  if (followButton) {
    let followState = followButton.innerText;
    if (followState === "Unfollow") {
      followButton.innerText = "Follow";
    } else {
      followButton.innerText = "Unfollow";
    }
  }
}
