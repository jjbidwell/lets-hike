$(document).ready(() => {
  const editForm = $("#edit-form");
  const minLengthInput = $("#minLength");
  const maxLengthInput = $("#maxLength");
  const maxAscentInput = $("#maxAscent");

  editForm.on("submit", event => {
    event.preventDefault();
    const newPreferences = {
      minLength: minLengthInput.val(),
      maxLength: maxLengthInput.val(),
      maxAscent: maxAscentInput.val()
    };
    if (
      isNaN(newPreferences.minLength) ||
      isNaN(newPreferences.maxLength) ||
      isNaN(newPreferences.maxAscent)
    ) {
      console.log(newPreferences.minLength);
      console.log(newPreferences.maxLength);
      console.log(newPreferences.maxAscent);
      return;
    }

    $.ajax({
      method: "POST",
      url: "/api/user_data",
      data: newPreferences
    })
      .then(() => {
        window.location.replace("/members");
      })
      .catch(err => {
        console.log("error");
      });
  });
});
