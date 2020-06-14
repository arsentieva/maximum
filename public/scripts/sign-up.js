const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signUpForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const body = { email, password, name };
  try {
    const res = await fetch("http://localhost:8085/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw res;
    }
  } catch (err) {
    //TODO handle errors in one common place
    console.log(err);
  }
});
