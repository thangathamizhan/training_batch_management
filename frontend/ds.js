// ds.js

function openForm() {
  document.getElementById("formPopup").style.display = "flex";
}

function closeForm() {
  document.getElementById("formPopup").style.display = "none";
}

function redirectPage(event) {
  event.preventDefault(); // stop normal submit

  // close popup
  closeForm();

  // redirect after submit
}
