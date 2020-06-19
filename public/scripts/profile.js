import { backendURL } from "./util.js";
const userId = localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
const url = `${backendURL}/users/${userId}`;

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
  const { user } = await res.json();
  const { name, bio, id, createdAt } = user;
  const biography = bio ? bio : "in the making...";
  const userContainer = document.querySelector(".user_container");

  const userHTML = profileBlock(id, name, createdAt, biography);
  userContainer.innerHTML = userHTML;
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchUser();
    let newUserName = "";
    let newUserBio = "";
    const editButton = document.querySelector("#edit-profile");
    if (editButton) {
      editButton.addEventListener("click", () => {
        //TODO handle disable/hide of the edit in CSS?
        const userNameElement = document.querySelector(".user-name");
        userNameElement.contentEditable = true;
        userNameElement.addEventListener("blur", () => {
          newUserName = userNameElement.innerText;
        });

        const userBioElement = document.querySelector(".user-bio");
        userBioElement.contentEditable = true;
        userBioElement.addEventListener("blur", () => {
          newUserBio = userBioElement.innerText;
        });
      });
    }
    const saveButton = document.querySelector("#save-profile");
    if (saveButton) {
      saveButton.addEventListener("click", async () => {
        //todo check if the name changed
        if (newUserBio !== "" || newUserName !== "") {
          try {
            console.log("calling handle edit");
            debugger;
            await handleEdit(newUserName, newUserBio);
            console.log("after handle edit");
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
});

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
    //TODO update the ui with the changes
    const { user } = await res.json();
    console.log(user);
    const { name, bio, id, createdAt } = user;
    const biography = bio ? bio : "in the making...";
    const userContainer = document.querySelector(".user_container");

    const userHTML = profileBlock(id, name, createdAt, biography);
    userContainer.innerHTML = userHTML;
  } catch (err) {
    console.error(err);
  }
};
// editButton.addEventListener("click", () => {
//   window.location.href = `/users/${userId}/edit`;
//   let formHTML = `<form class="user-edit-form">
//               <div class="form-group">
//                   <label for="name">Name</label>
//                   <input class="form-control" id="text" type="nae" name="name" placeholder="Enter your name">
//               </div>
//               <div class="form-group">
//                   <label for="email">Email address</label>
//                   <input class="form-control" id="email" type="email" name="email" placeholder="Enter email">
//               </div>
//               <div class="form-group">
//                   <label for="bio">Bio</label>
//                   <input class="form-control" id="text" type="bio" name="bio" placeholder="Enter your bio">
//               </div>
//                   <button class="btn btn-primary" type="submit">Update</button>
//             </form>`;
//   editButton.innerHTML = formHTML;
// });
