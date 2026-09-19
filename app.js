function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });

  document.getElementById(screenId).classList.remove("hidden");
}

function chooseRole(role) {
  if (role === "parent") {
    showScreen("parentHome");
  }

  if (role === "nanny") {
    showScreen("nannyHome");
  }
}

function goWelcome() {
  showScreen("welcomeScreen");
}

function openFeature(name) {
  alert(name + " — этот раздел мы сейчас создаём ❤️");
}
