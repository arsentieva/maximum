document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`http://localhost:8085/stories/${id}/`);
    if (res.status === 404) {
      window.location.href = "/"; //TODO where should we redirect
      return;
    }
    const { story } = await res.json();
    //TODO generate the html
  } catch (err) {
    console.error(err);
  }
});
