document.addEventListener("DOMContentLoaded", async () => {
  try {
    let storyId = localStorage.getItem("MAXIMUM_STORY_ID");

    let url = `http://localhost:8085/stories/${storyId}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw res;
    }
    const { story } = await res.json();
    const storyContainer = document.querySelector(".story_container");
    const storyHTML = ` <div class="story" id="${story.id}">
              <div class="story-body">
                  <div class="story-image">
                  <img src="/images/story-images/${story.id}.jpg">
              </div>
             <h3 class="story-title">${story.title}</h3>
              <p class="story-byline">${story.byline}</p>
           <div class="author-card">
        </div>
      </div>
    </div>
  `;

    storyContainer.innerHTML = storyHTML;
  } catch (err) {
    res.status(503).send({ message: e.message });
  }
});
