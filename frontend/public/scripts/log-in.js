import { backendURL } from "./util.js";

const logInForm = document.querySelector(".log-in-form");
const demoUser = document.getElementById('demo');

demoUser.addEventListener("click", (e)=>{
  document.getElementById("email").value="demo@isdemo.com";
  document.getElementById("password").value="password";
  document.getElementsByClassName("log-in-form")[0].click();
});

logInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(logInForm);
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password };
  try {
    let url = `${backendURL}/users/token`;
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
    if (err.status >= 400 && err.status < 600) {
      const errorJSON = await err.json();
      const errorsContainer = document.querySelector(".errors-container");
      let errorsHtml = [
        `
        <div class="alert alert-danger">
            Something went wrong. Please try again.
        </div>
      `,
      ];
      const { errors } = errorJSON;
      if (errors && Array.isArray(errors)) {
        errorsHtml = errors.map(
          (message) => `
          <div class="alert alert-danger">
              ${message}
          </div>
        `
        );
      }
      errorsContainer.innerHTML = errorsHtml.join("");
    } else {
      alert(
        "Something went wrong. Please check your internet connection and try again!"
      );
    }
  }
});
