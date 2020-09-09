import { authorCardBuilder, backendURL } from './util.js';
const fetchComments = async (storyId) => {
    const url = `${backendURL}/stories/${storyId}/comments`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
        },
    });
    if (res.status === 401 || res.status === 500) {
        window.location.href = "/log-in";
        return;
      }
    const { comments } = await res.json();

    const commentsContainer = document.querySelector(".comments-container");
    const commentsHtml = comments.map(
        ({ id, body, User, createdAt, updatedAt }) => `
            <div class="comment" id="${id}">
                <div class="comment-body">
                    <div class="author-card">
                        ${authorCardBuilder(User, id, createdAt, true)}
                    </div>
                    <p class="comment-body">${body}</p>
                </div>
            </div>
        `
    );
    commentsContainer.innerHTML = commentsHtml.join("");
};

const commentPost = async (storyId, body) => {
    try {
        const url = `${backendURL}/stories/${storyId}/comments`;
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
            },
        });
        if (!res.ok) throw res;
        await res.json();
        window.location.href = `/stories/${storyId}/comments`;
    } catch (e) {
        console.error(e);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const commentPostBtn = document.getElementById("submit");
    // obtain the story id
    const storyId = Number.parseInt(localStorage.getItem("MAXIMUM_STORY_ID"), 10);

    try {
        // on page load, obtain the comments
        await fetchComments(storyId);
        commentPostBtn.addEventListener("click", async (event) => {
            event.preventDefault();
            const commentBody = document.getElementById("body").value.trim();
            if (commentBody) {
                await commentPost(storyId, { body: commentBody });
            }
        });
    } catch (e) {
        console.error(e);
    }
});
