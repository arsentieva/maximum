import { authorCardBuilder, backendURL } from './util.js';

const fetchComments = async (storyId) => {
    let url = `${backendURL}/stories${storyId}/comments`;
    const res = await fetch( url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
        },
    });
    if (res.status === 401) {
        window.location.href = "/log-in";
        return;
    }
    const { comments } = await res.json();
    console.log(comments);
    const commentsContainer = document.querySelector(".comments-container");
    const commentsHtml = comments.map(
        ({ id, body, User, storyId, createdAt, updatedAt }) => `
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

const handleClick = (commentId) => {
    return async () => {
        try {
            console.log(commentId);
            let url = `${backendURL}/stories/${commentId}/comments`;
            const res = await fetch(url);
            if (!res.ok) {
                throw res;
            }
            const selectedComment = document.querySelector(`#${commentId}`);
            //TODO redirect to this comment
        } catch (err) {
            console.error(err);
        }
    };
}

const commentCards = document.querySelectorAll(".comment");
if (commentCards) {
    commentCards.forEach((commentCard) => {
        commentCard.addEventListener("click", handleClick(storyCard.id));
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // TODO I need to find how to obtain an id to pass into fetchComments
        let storyId = localStorage.getItem("MAXIMUM_STORY_ID");
        await fetchComments(storyId);
    } catch (e) {
        console.error(e);
    }
});
