import { formatDateFromSequelize, authorCardBuilder, backendURL } from "./util.js";
const userId = localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
const url = `${backendURL}/users/${userId}`;
let currentName = "";
let currentBio = "";

const fetchUser = async () => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401 || res.status === 500) {
    window.location.href = "/log-in";
    return;
  }
  await extratcUserFromRes(res);
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
  let newUserName = "";
  let newUserBio = "";
  const userNameElement = document.querySelector(".user-name");
  const userBioElement = document.querySelector(".user-bio");

  //EDIT USER
  const editButton = document.querySelector("#edit-profile");
  if (editButton) {
    editButton.addEventListener("click", () => {
      //TODO handle disable/hide of the edit in CSS?
      userNameElement.contentEditable = true;
      userBioElement.contentEditable = true;

      userNameElement.addEventListener("blur", () => {
        newUserName = userNameElement.innerText;
      });

      userBioElement.addEventListener("blur", () => {
        newUserBio = userBioElement.innerText;
      });
    });
  }

  //SAVE USER
  const saveButton = document.querySelector("#save-profile");
  if (saveButton) {
    saveButton.addEventListener("click", async () => {
      userNameElement.contentEditable = false;
      userBioElement.contentEditable = false;
      if (newUserName === "") {
        newUserName = currentName;
      }
      if (newUserBio === "") {
        newUserBio = currentBio;
      }

      if (newUserBio !== "" || newUserName !== "") {
        try {
          await handleEdit(newUserName, newUserBio);
        } catch (error) {
          console.error(error);
        }
      }
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

async function extratcUserFromRes(res) {
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
  let User = { 'name': name};
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
              <img src="/images/profile-images/1.png">
          </div>
        </div>
        <h4 class="bio-title">Bio:</h4>
        <p class="user-bio">${biography}</p>
        <button class="btn btn-primary" id="edit-profile" type="submit">Edit Profile</button>
        <button class="btn btn-primary" id="save-profile" type="submit">Save</button>
      </div>
      <div class="user-stories-container">
        <h3> Latest Stories </h3>
        <div class="user-story">
          <div class="author-card">
          ${authorCardBuilder(User, createdAt, true)}
          </div>
          <h2 class="user-story-title">Why I Will Never Play "Never Have I Ever" Again</h2>
          <p class="user-story-byline">Just when you think you know your friends, it turns out,
            they were the ones that didn't know you</p>
        </div>
      </div>
    </div>
`;
}

const handleEdit = async (name, bio) => {
  const newName = name ? name : "";
  const newBio = bio ? bio : "";
  let body = { name: newName, bio: newBio };

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.log(res.status);
      throw res;
    }
    await extratcUserFromRes(res);
  } catch (err) {
    console.error(err);
  }
};
