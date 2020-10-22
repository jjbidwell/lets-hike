$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signup");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const minLength = $("input#minLength");
  const maxLength = $("input#maxLength");
  const maxAscent = $("input#maxAscent");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      minLength: minLength.val(),
      maxLength: maxLength.val(),
      maxAscent: maxAscent.val()
    };
    if (
      !userData.email ||
      !userData.password ||
      !userData.minLength ||
      !userData.maxLength ||
      !userData.maxAscent ||
      userData.minLength >= userData.maxLength
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.password,
      userData.minLength,
      userData.maxLength,
      userData.maxAscent
    );
    signUpForm = "";
    emailInput = "";
    passwordInput = "";
    minLength = "";
    maxLength = "";
    maxAscent = "";
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, minLength, maxLength, maxAscent) {
    console.log("sign up user");
    $.post("/api/signup", {
      email: email,
      password: password,
      minLength: minLength,
      maxLength: maxLength,
      maxAscent: maxAscent
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
