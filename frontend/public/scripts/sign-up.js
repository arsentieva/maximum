const { backendURL } = require("./util");

const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signUpForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password, name };
  try {
    // TIP if developing use http://localhost:8085/users
    const res = await fetch(`${backendURL}/users`, {
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
    window.location.href = "/";
  } catch (err) {
    //TODO handle errors in one common place
    console.log(err);
  }
});
