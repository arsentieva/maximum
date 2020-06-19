import { authorCardBuilder, backendURL } from './util.js';
const fetchComments = async (storyId) => {

    let url = `${backendURL}/stories/${storyId}/comments`;
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
        },
    });
    if (res.status === 401) {
        window.location.href = "/log-in";
        return;
    }
    const { comments } = await res.json();

    const commentsContainer = document.querySelector(".comments-container");
    const commentsHtml = comments.map(
        ({ id, body, User, Story, createdAt, updatedAt }) => `
            <div class="comment" id="${id}">
                <div class="comment-body">
                    <div class="author-card">
                        ${authorCardBuilder(User, createdAt)}
                    </div>
                    <p class="comment-body">${body}</p>
                </div>
            </div>
        `
    );
    commentsContainer.innerHTML = commentsHtml.join("");
};

document.addEventListener("DOMContentLoaded", async () => {

    try {
        let storyId = Number.parseInt(localStorage.getItem("MAXIMUM_STORY_ID"), 10);

        await fetchComments(storyId);

        const commentCards = document.querySelectorAll(".comment");
        if (commentCards) {
            commentCards.forEach((commentCard) => {
                commentCard.addEventListener("click", () => {
                    localStorage.setItem("MAXIMUM_COMMENT_ID", commentCard.id);
                    window.location.href = `/stories/${storyCard.id}/comments`;
                });
            });
        }
    } catch (e) {
        console.error(e);
    }
});
