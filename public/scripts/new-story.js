import { backendURL } from "./util.js";
const url = `${backendURL}/stories`;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    addNewStory();
  } catch (err) {
    console.error(err);
  }
});

async function addNewStory() {
  const titleElement = document.querySelector("#new_story-title");
  const bylineElement = document.querySelector("#new_story-byline");
  const bodyElement = document.querySelector("#new_story-body");

  let storyTitle = "";
  let storyByline = "";
  let storyBody = "";

  titleElement.addEventListener("blur", () => {
    storyTitle = titleElement.value;
  });

  bylineElement.addEventListener("blur", () => {
    storyByline = bylineElement.value;
  });

  bodyElement.addEventListener("blur", () => {
    storyBody = bodyElement.value;
  });

  const publishButton = document.querySelector("#publish");
  if (publishButton) {
    publishButton.addEventListener("click", async (event) => {
      event.preventDefault();
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
    let data = await res.json();
    if (!res.ok) {
      throw res;
    } else {
      window.location.href = `/stories/${data.story.id}`;
    }
  } catch (err) {
    console.error(err);
  }
};
