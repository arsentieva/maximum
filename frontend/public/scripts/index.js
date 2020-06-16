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
  const storiesContainer = document.querySelector(".stories-container");
  const storiesHtml = stories.map(
    ({ title, user: { name } }) => `
        <div class="card">
          <div class="card-header">
            ${name}
          </div>
          <div class="card-body">
            <p class="card-text">${title}</p>
          </div>
        </div>
      `
  );
  storiesContainer.innerHTML = storiesHtml.join("");
};
