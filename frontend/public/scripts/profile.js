import { formatDateFromSequelize, authorCardBuilder, backendURL } from "./util.js";
const userId = localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
const url = `${backendURL}/users/${userId}`;
let currentName = "";
let currentBio = "";

export const fetchUser = async () => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401 || res.status === 500) {
    window.location.href = "/log-in";
    return;
  }
  await extractUserFromRes(res);
  await getUserStories(userId);
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchUser();
    editAndSaveUserProfile();
    addNewStory();
  } catch (err) {
    console.error(err);
  }
});

function editAndSaveUserProfile() {
  // EDIT USER
  const editButton = document.querySelector("#edit-profile");
  // const cancelButton = document.querySelector("#cancel");
  if (editButton) {
    editButton.addEventListener("click", () => {
      window.location.href = "/edit-profile";
    });
  }

}

function addNewStory() {
  //redirect to new story page
  const newStoryBtn = document.querySelector("#new-story");
  if (newStoryBtn) {
    newStoryBtn.addEventListener("click", () => {
      window.location.href = "/new-story";
    });
  }
}

// Needs work
async function extractUserFromRes(res) {
  const { user, follow } = await res.json();
  const { id, createdAt } = user;
  const { followersCount, followingCount } = follow;
  currentName = user.name;
  currentBio = user.bio;
  const biography = currentBio ? currentBio : "No bio available";
  const userContainer = document.querySelector(".user-container");

  const userHTML = profileBlock(
    id,
    currentName,
    createdAt,
    biography,
    followersCount,
    followingCount
  );

  userContainer.innerHTML = userHTML;
}



function profileBlock(
  id,
  name,
  createdAt,
  biography,
  followersCount,
  followingCount
) {
  let User = { 'name': name };
  return `
    <div class="user" id="${id}">
      <div class="user-body">
        <div class="profile-head">
          <div class="profile-head-text">
            <h1 class="user-name">${name}</h1>
            <div class="follow-display">
              <h5 class="user-followers">${followersCount} Followers</h5>
              <h5 class="user-following">${followingCount} Following</h5>
            </div>
            <p class="author-date">Member since ${formatDateFromSequelize(createdAt)}</p>
          </div>
          <div class="user-image">
          <img src="/images/profile-images/${id}.jpg">
          </div>
          </div>
          <h4 class="bio-title">Bio:</h4>
          <p class="user-bio">${biography}</p>
          <button class="btn btn-primary" id="edit-profile" type="submit">Edit Profile</button>
          </div>
          </div>
          `;

}
async function getUserStories(userId) {
  const res = await fetch(`${backendURL}/stories/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  })
  if (res.status === 401 || res.status === 500) {
    window.location.href = "/log-in";
    return;
  }
  let data = await res.json();
  let dataLength = data.stories.length;
  let newData = [];
  for (let i = 0; i < dataLength; i++) {
    if (data.stories[i].User.id === Number(userId)) {
      newData.push(data.stories[i]);
    }
  }
  const storiesContainer = document.querySelector(".stories-container");
  const storiesHtml = newData.map(
    ({ id, title, body }) => `
      <div class="story" id="${id}">
        <a href="/stories/${id}">${title}</a>
      </div>
    `
  );
  storiesContainer.innerHTML = storiesHtml.join("");
}
