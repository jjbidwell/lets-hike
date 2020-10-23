$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("#signup");
  const emailInput = $("input#email");
  const passwordInput = $("input#password");
  const minLengthInput = $("input#minLength");
  const maxLengthInput = $("input#maxLength");
  const maxAscentInput = $("input#maxAscent");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      minLength: minLengthInput.val().trim(),
      maxLength: maxLengthInput.val().trim(),
      maxAscent: maxAscentInput.val().trim()
    };
    // Don't allow user to enter blank (we do have all fields set as required but just in case)
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
    signUpUser(userData);
    emailInput.val("");
    passwordInput.val("");
    minLengthInput.val("");
    maxLengthInput.val("");
    maxAscentInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(userData) {
    $.post("/api/signup", {
      email: userData.email,
      password: userData.password,
      minLength: userData.minLength,
      maxLength: userData.maxLength,
      maxAscent: userData.maxAscent
    })
      .then(() => {
        window.location.replace("/search");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
