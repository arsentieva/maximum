import { backendURL } from "./util.js";
// import { handleEdit } from "./profile.js"
const userId = localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
const url = `${backendURL}/users/${userId}`;

const getUser = async () => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
    },
  });
  if (res.status === 401 || res.status === 500) {
    window.location.href = "/log-in";
    return;
  }
  await getUserDataFromRes(res);
}
const updateButton = document.getElementById("save-profile");
let nameInput = document.querySelector("#user-name");
let bioInput = document.querySelector("#user-bio");

const getUserDataFromRes = async (res) => {
  const data = await res.json();
  nameInput.value = data.user.name;
  bioInput.value = data.user.bio;
}

const handleEdit = async (name, bio) => {
  const newName = name ? name : "";
  const newBio = bio ? bio : "";
  const id = window.localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
  let body = { id, name: newName, bio: newBio };
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("MAXIMUM_ACCESS_TOKEN")}`,
      },
      body: JSON.stringify(body),
    });
    console.log("handle edit res json", await res.json())
    if (!res.ok) {
      throw res;
    }
    await extractUserFromRes(res);
  } catch (err) {
    console.error(err);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await getUser()
  } catch (err) {
    console.error(err);
  }
});

updateButton.addEventListener("click", async () => {
  try {
    await handleEdit(nameInput.value, bioInput.value);
    window.location.href = "/profile"
  } catch(err) {
    console.error(err);
  }
})
