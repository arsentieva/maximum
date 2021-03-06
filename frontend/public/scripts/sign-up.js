import { backendURL } from "./util.js";

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signUpForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password, name };
  try {
    // previously `${backendURL}/users/token`;
    let url = `${backendURL}/users`;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }
    const {
      token,
      user: { id },
    } = await res.json();
    // storage access_token in localStorage:
    localStorage.setItem("MAXIMUM_ACCESS_TOKEN", token);
    localStorage.setItem("MAXIMUM_CURRENT_USER_ID", id);
    // redirect to home page to see all stories:
    window.location.href = "/stories";
  } catch (err) {
    //TODO handle errors in one common place
    console.error(err);
  }
});
