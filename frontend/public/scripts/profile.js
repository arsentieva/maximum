import { backendURL } from "./util.js";

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("MAXIMUM_CURRENT_USER_ID");
  try {
    const url = `${backendURL}/users/${userId}`;
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

    const userHTML = ` <div class="user" id="${id}">
              <div class="user-body">
                <h1 class="user-name">${name}</h1>
                  <div class="user-image">
                    <img src="/images/profile-images/1.png">
                    <p "author-date">Member since :${createdAt}</p>
                  </div>
              </div>
              <p class="user-bio">${biography}</p>
             </div>
    </div>
  `;

    userContainer.innerHTML = userHTML;
    const profileElement = document.querySelector("#profile");
    if (profileElement) {
      //   profileElement.addEventListener("click", handleEdit)
    }
  } catch (err) {
    console.error(err);
  }

  const handleEdit = (userId) => {
    return async () => {
      try {
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "MAXIMUM_ACCESS_TOKEN"
            )}`,
          },
        });
        if (!res.ok) {
          throw res;
        }
        //TODO update the ui with the changes
      } catch (err) {
        console.error(err);
      }
    };
  };
});
