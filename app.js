/* ========================= */
/* SCREEN NAVIGATION */
/* ========================= */

function showScreen(screenId) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.add("hidden");
    });

  const screen = document.getElementById(screenId);

  if (screen) {
    screen.classList.remove("hidden");
  }

}


/* ========================= */
/* ROLE */
/* ========================= */

function chooseRole(role) {

  if (role === "parent") {
    showScreen("parentHome");
  }

  if (role === "nanny") {
    showScreen("nannyHome");

    loadQuestionnaire();
    loadAvailability();
  }

}


/* ========================= */
/* COMMON */
/* ========================= */

function goWelcome() {
  showScreen("welcomeScreen");
}

function goNannyHome() {
  showScreen("nannyHome");
}

function openFeature(name) {

  alert(
    name +
    " — этот раздел мы создадим следующим этапом ❤️"
  );

}


/* ========================= */
/* NANNY AVAILABILITY */
/* ========================= */

function toggleSearchAvailability() {

  const checkbox =
    document.getElementById("searchAvailability");

  const text =
    document.getElementById("availabilityText");

  if (checkbox.checked) {

    text.textContent =
      "Сейчас вы отображаетесь родителям";

    localStorage.setItem(
      "nannySearchAvailable",
      "true"
    );

  } else {

    text.textContent =
      "Вы временно не отображаетесь в поиске";

    localStorage.setItem(
      "nannySearchAvailable",
      "false"
    );

  }

}


function loadAvailability() {

  const saved =
    localStorage.getItem("nannySearchAvailable");

  const checkbox =
    document.getElementById("searchAvailability");

  const text =
    document.getElementById("availabilityText");

  if (saved === "false") {

    checkbox.checked = false;

    text.textContent =
      "Вы временно не отображаетесь в поиске";

  } else {

    checkbox.checked = true;

    text.textContent =
      "Сейчас вы отображаетесь родителям";

  }

}


/* ========================= */
/* QUESTIONNAIRE */
/* ========================= */

function openNannyQuestionnaire() {

  loadQuestionnaire();

  showScreen("nannyQuestionnaire");

}


function closeQuestionnaire() {

  showScreen("nannyHome");

}


/* ========================= */
/* SAVE QUESTIONNAIRE */
/* ========================= */

function collectQuestionnaire() {

  const childrenAge = [];

  document
    .querySelectorAll(
      'input[name="childrenAge"]:checked'
    )
    .forEach(input => {
      childrenAge.push(input.value);
    });


  const workFormat = [];

  document
    .querySelectorAll(
      'input[name="workFormat"]:checked'
    )
    .forEach(input => {
      workFormat.push(input.value);
    });


  return {

    name:
      document.getElementById("nannyName").value,

    age:
      document.getElementById("nannyAge").value,

    city:
      document.getElementById("nannyCity").value,

    languages:
      document.getElementById("nannyLanguages").value,

    childrenAge,

    experience:
      document.getElementById("nannyExperience").value,

    specialExperience:
      document.getElementById("specialExperience").value,

    education:
      document.getElementById("nannyEducation").value,

    courses:
      document.getElementById("nannyCourses").value,

    workFormat,

    price:
      document.getElementById("nannyPrice").value,

    currency:
      document.getElementById("nannyCurrency").value,

    liveIn:
      document.getElementById("liveIn").checked,

    nightWork:
      document.getElementById("nightWork").checked,

    travelWithFamily:
      document.getElementById("travelWithFamily").checked,

    hasCar:
      document.getElementById("hasCar").checked,

    useCar:
      document.getElementById("useCar").checked,

    firstAid:
      document.getElementById("firstAid").checked,

    about:
      document.getElementById("nannyAbout").value,

    hobbies:
      document.getElementById("nannyHobbies").value,

    additional:
      document.getElementById("nannyAdditional").value

  };

}


function saveQuestionnaire() {

  const data =
    collectQuestionnaire();

  localStorage.setItem(
    "nannyQuestionnaire",
    JSON.stringify(data)
  );

  alert(
    "Анкета сохранена ❤️\n\n" +
    "Пока данные хранятся только на этом устройстве."
  );

}


/* ========================= */
/* LOAD QUESTIONNAIRE */
/* ========================= */

function loadQuestionnaire() {

  const saved =
    localStorage.getItem(
      "nannyQuestionnaire"
    );

  if (!saved) {
    return;
  }

  const data = JSON.parse(saved);


  document.getElementById("nannyName").value =
    data.name || "";

  document.getElementById("nannyAge").value =
    data.age || "";

  document.getElementById("nannyCity").value =
    data.city || "";

  document.getElementById("nannyLanguages").value =
    data.languages || "";

  document.getElementById("nannyExperience").value =
    data.experience || "";

  document.getElementById("specialExperience").value =
    data.specialExperience || "";

  document.getElementById("nannyEducation").value =
    data.education || "";

  document.getElementById("nannyCourses").value =
    data.courses || "";

  document.getElementById("nannyPrice").value =
    data.price || "";

  document.getElementById("nannyCurrency").value =
    data.currency || "EUR";

  document.getElementById("liveIn").checked =
    data.liveIn || false;

  document.getElementById("nightWork").checked =
    data.nightWork || false;

  document.getElementById("travelWithFamily").checked =
    data.travelWithFamily || false;

  document.getElementById("hasCar").checked =
    data.hasCar || false;

  document.getElementById("useCar").checked =
    data.useCar || false;

  document.getElementById("firstAid").checked =
    data.firstAid || false;

  document.getElementById("nannyAbout").value =
    data.about || "";

  document.getElementById("nannyHobbies").value =
    data.hobbies || "";

  document.getElementById("nannyAdditional").value =
    data.additional || "";


  document
    .querySelectorAll('input[name="childrenAge"]')
    .forEach(input => {

      input.checked =
        (data.childrenAge || [])
          .includes(input.value);

    });


  document
    .querySelectorAll('input[name="workFormat"]')
    .forEach(input => {

      input.checked =
        (data.workFormat || [])
          .includes(input.value);

    });

}


/* ========================= */
/* PUBLISH */
/* ========================= */

function publishQuestionnaire() {

  const data =
    collectQuestionnaire();


  const required = [];

  if (!data.name.trim()) {
    required.push("Имя");
  }

  if (!data.age) {
    required.push("Возраст");
  }

  if (!data.city.trim()) {
    required.push("Город");
  }

  if (!data.languages.trim()) {
    required.push("Языки");
  }

  if (data.childrenAge.length === 0) {
    required.push("Возраст детей");
  }

  if (data.workFormat.length === 0) {
    required.push("Формат работы");
  }

  if (!data.price) {
    required.push("Минимальная стоимость");
  }

  if (!data.about.trim()) {
    required.push("О себе");
  }


  if (required.length > 0) {

    alert(
      "Чтобы опубликовать анкету, заполните:\n\n" +
      "• " +
      required.join("\n• ")
    );

    return;
  }


  localStorage.setItem(
    "nannyQuestionnaire",
    JSON.stringify(data)
  );


  localStorage.setItem(
    "nannyPublished",
    "true"
  );


  showScreen("publicationSuccess");

}
