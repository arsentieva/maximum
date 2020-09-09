import { authorCardBuilder, backendURL, giveImage } from "./util.js";
let authorId = "";
let pathName = window.location.pathname;
const storyId = pathName.substring(pathName.lastIndexOf("/") + 1);
localStorage.setItem("MAXIMUM_STORY_ID", storyId);

const getClap = async (storyId) => {
  let clapURL = `${backendURL}/stories/${storyId}/story-claps`;
  const res = await fetch(clapURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 201) return true;
  if (res.status === 204) return false;
  else throw new Error("Something unexpected happened...");
}

const clap = async (storyId) => {
  try {
    let clapURL = `${backendURL}/stories/${storyId}/story-claps`;
    const res = await fetch(clapURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
    });
    if (!res.ok) throw res;
    return res;
  } catch (e) {
    console.error(e);
  }
}

const unclap = async (storyId) => {
  try {
    let clapURL = `${backendURL}/stories/${storyId}/story-claps`;
    const res = await fetch(clapURL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
    });
    if (!res.ok) throw res;
    return res;
  } catch (e) {
    console.error(e);
  }
}

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

    console.log(res.status)

    if (res.status === 401 || res.status === 500) {
      window.location.href = "/log-in";
      return;
    }

    if (!res.ok) throw res;

    const { story, numClaps, userFollowsAuthor } = await res.json();
    const { title, byline, id, User, createdAt, body } = story;
    authorId = User.id;
    const storyContainer = document.querySelector(".story-container");
    let followButtonText = "Follow";
    let followClass = "";
    if (userFollowsAuthor) {
      followButtonText = "Unfollow";
      followClass = "follow-button-unfollow";
    }

    const storyHTML = `
    <div class="story" id="${id}">
      <div class="story-page-content">
        <h1 class="story-page-title">${title}</h1>
        <h3 class="story-page-byline">${byline}</h3>
        <div class ="author-container">
          <div class="author-card">
            ${authorCardBuilder(User, id, createdAt, true)}
          </div>
          <button class="follow-button ${followClass}" type="button">${followButtonText}</button>
        </div>
        <div class="story-page-image">
          <img src="/images/story-images/${giveImage(id)}.jpg">
        </div>
        <p class="story-page-text">${body}</p>
        <div class="story-footer">
          <div class="claps">
            <div class="claps-image">
              <img src="/images/resources/clap.png">
            </div>
            <p><span id="clap-number">${numClaps}</span> claps</p>
          </div>
          <div class="comments">
            <a href="/stories/${storyId}/comments" class="comment-button">View Comments</a>
          </div>
        </div>
      </div>
    </div>
  `;
    storyContainer.innerHTML = storyHTML;

    const clapNumber = document.querySelector("#clap-number");
    const clapImage = document.querySelector(".claps-image");
    const followButton = document.querySelector(".follow-button");

    // Determine whether to preload claps image with clapped CSS class
    if(await getClap(storyId)){
      clapImage.classList.add('claps-image-clapped');
    }
    if(await !getClap(storyId)){
      clapImage.classList.remove('claps-image-clapped');
    }

    clapImage.addEventListener("click", async () => {
      try {
        const clapStatus = await getClap(storyId);
        if (clapStatus) {
          const unclapped = await unclap(storyId).then(response => response.json());;
          clapNumber.innerHTML = unclapped.numClaps;
          clapImage.classList.remove("claps-image-clapped");
        }
        if (!clapStatus){
          const clapped = await clap(storyId).then(response => response.json());
          clapNumber.innerHTML = clapped.numClaps;
          clapImage.classList.add("claps-image-clapped");
        }
      } catch (e) {
        console.error(e);
      }
    });

    if (followButton) {
      followButton.addEventListener("click", async () => {
        let followState = followButton.innerText;
        await handleFollow(followState);
      });
    }
  } catch (err) {
    console.error(err)
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
      followButton.classList.remove("follow-button-unfollow");
    } else {
      followButton.innerText = "Unfollow";
      followButton.classList.add("follow-button-unfollow");
    }
  }
}
