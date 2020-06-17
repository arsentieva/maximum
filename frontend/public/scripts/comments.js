const fetchComments = async (storyId) => {
    const res = await fetch(`http://localhost:8085/stories${storyId}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
        },
    });
    if(res.status === 401) {
        window.location.href = "/log-in";
        return;
    }
    const { comments } = await res.json();

    const commentsContainer = document.querySelector(".comments-container");
    const storiesHtml = stories.map(
        ({ id, body, userId, storyId, createdAt, updatedAt }) => `
            <div class="comment" id="${id}">
                <div class="comment-body">
                    <h3 class="comment-creation_date"
        `
    )
}
