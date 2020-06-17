document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("did this console logged");
    const id = req.params.id;
    const res = await fetch(`http://localhost:8085/stories/${id}/`);
    if (res.status === 404) {
      window.location.href = "/"; //TODO where should we redirect
      return;
    }
    const { story } = await res.json();
    console.log(story);
    const storiesContainer = document.querySelector(".stories-container");
    const storyHtml = `<div ><h2>${story.title}</h2><p>${story.byline}</p><p>${story.body}</p></div>`;
    storiesContainer.innerHTML = storyHtml;
  } catch (err) {
    console.error(err);
  }
});
