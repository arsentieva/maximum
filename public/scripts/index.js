const fetchStories = async () => {
  const res = await fetch("http://localhost:8085/stories", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401) {
    window.location.href = "/log-in";
    return;
  }
  const { stories } = await res.json();
  console.log(stories);
  const storiesContainer = document.querySelector(".stories-container");
  const storiesHtml = stories.map(
    ({ title, byline, body, id, User }) => `
        <div class="story" id="${id}">
          <div class="story-body">
            <h3 class="story-title">${title}</h3>
            <h3 class="story-author">${User.name}</h3>
            <p class="story-byline">${byline}</p>
            <p class="story-byline">${body}</p>
          </div>
        </div>
      `
  );
  storiesContainer.innerHTML = storiesHtml.join("");
};

const handleClick = (storyId) => {
  return async () => {
    try {
      console.log(storyId);
      let url = `http://localhost:8085/stories/${storyId}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw res;
      }
      const selectedStory = document.querySelector(`#${storyId}`);
      //tODO redirect to this story
    } catch (err) {
      console.error(err);
    }
  };
};

const storyCards = document.querySelectorAll(".story");
if (storyCards) {
  storyCards.forEach((storyCard) => {
    storyCard.addEventListener("click", handleClick(storyCard.id));
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchStories();
  } catch (e) {
    console.error(e);
  }
});
