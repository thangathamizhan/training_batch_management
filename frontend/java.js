function openForm(){
  document.getElementById("formPopup").style.display="flex";
}

function closeForm(){
  document.getElementById("formPopup").style.display="none";
}
window.onclick = function(event) {
  let popup = document.getElementById("formPopup");
  if(event.target === popup){
    closeForm();
  }
}

function redirectPage(event) {
    event.preventDefault();  
    window.location.href = "login.html";
}
