import { backendURL } from "./util.js";
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
  if (res.status === 401) {
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
  const { user } = await res.json();
  const { id, createdAt } = user;
  currentName = user.name;
  currentBio = user.bio;
  const biography = currentBio ? currentBio : "in the making...";
  const userContainer = document.querySelector(".user_container");

  const userHTML = profileBlock(id, currentName, createdAt, biography);
  userContainer.innerHTML = userHTML;
}

function profileBlock(id, name, createdAt, biography) {
  return ` <div class="user" id="${id}">
    <div class="user-body">
        <h1 class="user-name">${name}</h1>
        <div class="user-image">
            <img src="/images/profile-images/1.png">
            <p "author-date">Member since :${createdAt}</p>
        </div>
    </div>
    <p class="user-bio">${biography}</p>
    </div>
</div>`;
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
