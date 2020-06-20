import { authorCardBuilder, backendURL } from "./util.js";

const getClap = async (storyId) => {
  let url = `${backendURL}/stories/${storyId}/story-claps`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if(res.status === 200) return true;
  if(res.status === 204) return false;
  else throw new Error("Something unexpected happened...");
}

const clap = async (storyId) => {
  try {
    let url = `${backendURL}/stories/${storyId}/story-claps`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
    });
    if(res.ok) throw res;
    window.location.href = `/stories/${storyId}`;
  } catch (e) {
    console.error(e);
  }
}

const unclap = async (storyId) => {
  try {
    let url = `${backendURL}/stories/${storyId}/story-claps`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
    });
    if(res.ok) throw res;
    window.location.href = `/stories/${storyId}`;
  } catch(e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    let pathName = window.location.pathname;
    const storyId = pathName.substring(pathName.lastIndexOf("/") + 1);
    localStorage.setItem("MAXIMUM_STORY_ID", storyId);

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
          <p><span id="clap-number">23</span> claps</p>
        </div>

      </div>
    </div>
  `;

  const clapNumber = document.querySelector(".clap-number");
  const clapImage = document.querySelector(".claps-image");

  clapImage.addEventListener("click", async () => {
    try{
      const clapStatus = await getClap(storyId);
      if(clapStatus) unclap;
      if(!clapStatus) clap;
    } catch(e){
      console.error(e);
    }
  })

    storyContainer.innerHTML = storyHTML;
  } catch (err) {
    res.status(503).send({ message: e.message });
  }
});
