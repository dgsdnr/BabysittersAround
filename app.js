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
    renderPhotos();
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
/* NANNY SEARCH AVAILABILITY */
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
  renderPhotos();

  showScreen("nannyQuestionnaire");

}


function closeQuestionnaire() {

  showScreen("nannyHome");

}


/* ========================= */
/* COLLECT QUESTIONNAIRE */
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


/* ========================= */
/* SAVE QUESTIONNAIRE */
/* ========================= */

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
    renderPhotos();
    return;
  }

  const data =
    JSON.parse(saved);


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


  renderPhotos();

}


/* ========================= */
/* PHOTOS */
/* ========================= */

function getSavedPhotos() {

  const saved =
    localStorage.getItem("nannyPhotos");

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }

}


function savePhotos(photos) {

  localStorage.setItem(
    "nannyPhotos",
    JSON.stringify(photos)
  );

}


function resizeImage(file) {

  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = function(event) {

      const image = new Image();

      image.onload = function() {

        const maxSize = 1000;

        let width = image.width;
        let height = image.height;


        if (width > maxSize || height > maxSize) {

          if (width > height) {

            height =
              Math.round(
                height * maxSize / width
              );

            width = maxSize;

          } else {

            width =
              Math.round(
                width * maxSize / height
              );

            height = maxSize;

          }

        }


        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;


        const context =
          canvas.getContext("2d");

        context.drawImage(
          image,
          0,
          0,
          width,
          height
        );


        const result =
          canvas.toDataURL(
            "image/jpeg",
            0.75
          );

        resolve(result);

      };


      image.onerror = reject;

      image.src = event.target.result;

    };


    reader.onerror = reject;

    reader.readAsDataURL(file);

  });

}


async function handlePhotoFiles(event) {

  let photos =
    getSavedPhotos();

  const files =
    Array.from(event.target.files);

  if (files.length === 0) {
    return;
  }


  const remaining =
    5 - photos.length;


  if (remaining <= 0) {

    alert(
      "Можно добавить максимум 5 фотографий."
    );

    event.target.value = "";

    return;
  }


  const selected =
    files.slice(0, remaining);


  try {

    for (const file of selected) {

      const photo =
        await resizeImage(file);

      photos.push(photo);

    }

    savePhotos(photos);

    renderPhotos();

  } catch (error) {

    alert(
      "Не удалось загрузить одну из фотографий."
    );

  }


  event.target.value = "";

}


function deletePhoto(index) {

  const photos =
    getSavedPhotos();

  photos.splice(index, 1);

  savePhotos(photos);

  renderPhotos();

}


function renderPhotos() {

  const gallery =
    document.getElementById("photoGallery");

  if (!gallery) {
    return;
  }


  const photos =
    getSavedPhotos();


  gallery.innerHTML = "";


  photos.forEach((photo, index) => {

    const item =
      document.createElement("div");

    item.className =
      "photo-item";


    const image =
      document.createElement("img");

    image.src = photo;

    image.alt =
      index === 0
        ? "Главная фотография"
        : "Фотография";


    const deleteButton =
      document.createElement("button");

    deleteButton.type =
      "button";

    deleteButton.className =
      "photo-delete";

    deleteButton.textContent =
      "×";

    deleteButton.onclick =
      () => deletePhoto(index);


    item.appendChild(image);


    if (index === 0) {

      const mainLabel =
        document.createElement("span");

      mainLabel.className =
        "photo-main-label";

      mainLabel.textContent =
        "Главная";

      item.appendChild(mainLabel);

    }


    item.appendChild(deleteButton);

    gallery.appendChild(item);

  });

}


/* ========================= */
/* CALENDAR */
/* ========================= */

let calendarDate =
  new Date();


function getAvailabilityData() {

  const saved =
    localStorage.getItem(
      "nannyAvailability"
    );

  if (!saved) {
    return {};
  }

  try {
    return JSON.parse(saved);
  } catch {
    return {};
  }

}


function saveAvailabilityData(data) {

  localStorage.setItem(
    "nannyAvailability",
    JSON.stringify(data)
  );

}


function dateKey(year, month, day) {

  const monthString =
    String(month + 1).padStart(2, "0");

  const dayString =
    String(day).padStart(2, "0");

  return (
    year +
    "-" +
    monthString +
    "-" +
    dayString
  );

}


function openAvailabilityCalendar() {

  calendarDate =
    new Date();

  renderCalendar();

  showScreen(
    "availabilityCalendar"
  );

}


function closeAvailabilityCalendar() {

  showScreen("nannyHome");

}


function changeCalendarMonth(direction) {

  calendarDate =
    new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + direction,
      1
    );

  renderCalendar();

}


function renderCalendar() {

  const title =
    document.getElementById(
      "calendarMonthTitle"
    );

  const grid =
    document.getElementById(
      "calendarGrid"
    );

  if (!title || !grid) {
    return;
  }


  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ];


  const year =
    calendarDate.getFullYear();

  const month =
    calendarDate.getMonth();


  title.textContent =
    months[month] +
    " " +
    year;


  grid.innerHTML = "";


  const firstDay =
    new Date(year, month, 1);

  let startDay =
    firstDay.getDay();

  // В JavaScript воскресенье = 0.
  // Нам нужен календарь с понедельника.
  startDay =
    startDay === 0
      ? 6
      : startDay - 1;


  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();


  const today =
    new Date();

  today.setHours(0, 0, 0, 0);


  const availability =
    getAvailabilityData();


  // Пустые клетки перед первым днём.
  for (
    let i = 0;
    i < startDay;
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-empty";

    grid.appendChild(empty);

  }


  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const button =
      document.createElement("button");

    button.type =
      "button";

    button.className =
      "calendar-day";


    const currentDay =
      new Date(
        year,
        month,
        day
      );

    currentDay.setHours(
      0, 0, 0, 0
    );


    const key =
      dateKey(
        year,
        month,
        day
      );


    const status =
      availability[key];


    button.textContent =
      day;


    if (status) {
      button.classList.add(status);
    }


    if (
      currentDay.getTime() ===
      today.getTime()
    ) {

      button.classList.add(
        "today"
      );

    }


    if (
      currentDay < today
    ) {

      button.classList.add(
        "past"
      );

      button.disabled = true;

    } else {

      button.onclick =
        () => cycleDayStatus(key);

    }


    grid.appendChild(button);

  }

}


function cycleDayStatus(key) {

  const availability =
    getAvailabilityData();

  const current =
    availability[key];


  if (!current) {

    availability[key] =
      "free";

  } else if (
    current === "free"
  ) {

    availability[key] =
      "partial";

  } else if (
    current === "partial"
  ) {

    availability[key] =
      "busy";

  } else {

    delete availability[key];

  }


  saveAvailabilityData(
    availability
  );

  renderCalendar();

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


  if (
    data.childrenAge.length === 0
  ) {

    required.push(
      "Возраст детей"
    );

  }


  if (
    data.workFormat.length === 0
  ) {

    required.push(
      "Формат работы"
    );

  }


  if (!data.price) {

    required.push(
      "Минимальная стоимость"
    );

  }


  if (!data.about.trim()) {

    required.push(
      "О себе"
    );

  }


  const photos =
    getSavedPhotos();


  if (photos.length === 0) {

    required.push(
      "Фотография"
    );

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


  showScreen(
    "publicationSuccess"
  );

}
