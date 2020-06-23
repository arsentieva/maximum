import { backendURL } from "./util.js";
const url = `${backendURL}/stories`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    newStoryBlock();
    addNewStory();
  } catch (err) {
    console.error(err);
  }
});

function newStoryBlock() {
  const newStoryContainer = document.querySelector(".new-story_container");
  const storyHTML = ` <div class="new_story" id="new_story">
    <div class="new_story-body-container">
    <h3 class="new_story-title" contentEditable=true>Title (70 characters max)</h3>
    <h4 class="new_story-byline" contentEditable=true>Byline (140 characters max)</h4>
    <p class="new_story-body" contentEditable=true>Tell your story...</p>
    </div>
    </div>`;

  newStoryContainer.innerHTML = storyHTML;
}

async function addNewStory() {
  const titleElement = document.querySelector(".new_story-title");
  const bylineElement = document.querySelector(".new_story-byline");
  const bodyElement = document.querySelector(".new_story-body");

  let storyTitle = "";
  let storyByline = "";
  let storyBody = "";

  titleElement.addEventListener("blur", () => {
    storyTitle = titleElement.innerText;
  });
  bylineElement.addEventListener("blur", () => {
    storyByline = bylineElement.innerText;
  });

  bodyElement.addEventListener("blur", () => {
    storyBody = bodyElement.innerText;
  });

  const publishButton = document.querySelector("#publish");
  if (publishButton) {
    publishButton.addEventListener("click", async () => {
      await fetchNewStory({
        title: storyTitle,
        byline: storyByline,
        body: storyBody,
      });
    });
  }
}

const fetchNewStory = async (body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify(body),
    });
    if (res.status === 401) {
      window.location.href = "/log-in";
      return;
    }
    await res.json();
    if (!res.ok) {
      console.log(res.status);
      throw res;
    } else {
      window.location.href = "/stories";
    }
  } catch (err) {
    console.error(err);
  }
};
