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


/* =========================================================
   PARENT SIDE
   ========================================================= */


/* ---------- TEST NANNIES ---------- */

/*
  Пока у нас ещё нет базы данных Supabase,
  поэтому используем временных тестовых нянь.

  Позже этот массив полностью заменит база данных.
*/

function getTestDate(offset) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() + offset);

  return date.toISOString().slice(0, 10);
}


const testNannies = [
  {
    id: "n1",

    name: "Анна",
    age: 29,
    city: "Нови-Сад",

    photo: "👩🏻",

    languages: [
      "русский",
      "английский"
    ],

    childAges: [
      "1–3 года",
      "3–6 лет",
      "6–12 лет"
    ],

    workFormats: [
      "У семьи",
      "В другом месте"
    ],

    price: 10,
    currency: "EUR",

    rating: 4.9,
    reviewsCount: 12,

    about:
      "Люблю детей, прогулки и активные игры. Спокойная и внимательная.",

    experience:
      "Более 6 лет работы с детьми.",

    education:
      "Педагогическое образование.",

    courses:
      "Первая помощь детям.",

    additionalDuties: [
      "Сопровождение ребёнка",
      "Помощь с домашними заданиями"
    ],

    firstAid: true,
    nightWork: false,
    liveIn: false,
    travel: false,

    availability: {
      [getTestDate(0)]: "free",
      [getTestDate(1)]: "partial",
      [getTestDate(2)]: "busy"
    }
  },


  {
    id: "n2",

    name: "Мария",
    age: 34,
    city: "Белград",

    photo: "👩🏼",

    languages: [
      "русский",
      "сербский",
      "английский"
    ],

    childAges: [
      "До 1 года",
      "1–3 года",
      "3–6 лет"
    ],

    workFormats: [
      "У семьи"
    ],

    price: 12,
    currency: "EUR",

    rating: 5,
    reviewsCount: 8,

    about:
      "Опытная няня, люблю малышей и спокойные семейные прогулки.",

    experience:
      "Более 10 лет работы с детьми.",

    education:
      "Педагогическое образование.",

    courses:
      "Детская психология и первая помощь.",

    additionalDuties: [
      "Приготовление еды для ребёнка",
      "Сопровождение ребёнка"
    ],

    firstAid: true,
    nightWork: true,
    liveIn: false,
    travel: true,

    availability: {
      [getTestDate(0)]: "busy",
      [getTestDate(1)]: "free",
      [getTestDate(2)]: "free"
    }
  },


  {
    id: "n3",

    name: "Елена",
    age: 31,
    city: "Нови-Сад",

    photo: "👩🏼‍🦰",

    languages: [
      "русский"
    ],

    childAges: [
      "3–6 лет",
      "6–12 лет",
      "12+ лет"
    ],

    workFormats: [
      "У няни",
      "В другом месте"
    ],

    price: 9,
    currency: "EUR",

    rating: 4.7,
    reviewsCount: 5,

    about:
      "Мне нравится проводить с детьми время творчески: рисование, игры, чтение.",

    experience:
      "Более 5 лет.",

    education:
      "Высшее образование.",

    courses:
      "Курс первой помощи.",

    additionalDuties: [
      "Помощь с домашними заданиями",
      "Прогулки"
    ],

    firstAid: true,
    nightWork: false,
    liveIn: false,
    travel: false,

    availability: {
      [getTestDate(0)]: "partial",
      [getTestDate(1)]: "busy",
      [getTestDate(2)]: "free"
    }
  },


  {
    id: "n4",

    name: "Ольга",
    age: 27,
    city: "Суботица",

    photo: "👩🏻‍🦱",

    languages: [
      "русский",
      "английский"
    ],

    childAges: [
      "6–12 лет",
      "12+ лет"
    ],

    workFormats: [
      "У семьи"
    ],

    price: 8,
    currency: "EUR",

    rating: null,
    reviewsCount: 0,

    about:
      "Буду рада познакомиться с вашей семьёй.",

    experience:
      "Есть опыт работы с детьми школьного возраста.",

    education:
      "—",

    courses:
      "—",

    additionalDuties: [
      "Помощь с домашними заданиями"
    ],

    firstAid: false,
    nightWork: false,
    liveIn: false,
    travel: false,

    /*
      У этой няни календарь пока не заполнен.
    */
    availability: {}
  }
];


/* ---------- COMMON HELPERS ---------- */

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}


function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ---------- PARENT PROFILE ---------- */

function openParentProfile() {

  showScreen("parentProfile");

  loadParentProfile();
}


function closeParentScreen() {

  showScreen("parentHome");
}


function loadParentProfile() {

  const saved =
    JSON.parse(
      localStorage.getItem("parentProfile") || "{}"
    );

  document.getElementById("parentName").value =
    saved.name || "";

  document.getElementById("parentCity").value =
    saved.city || "";

  document.getElementById("parentAbout").value =
    saved.about || "";

  renderParentChildren(
    saved.children || []
  );
}


function renderParentChildren(children) {

  const container =
    document.getElementById("parentChildrenList");

  container.innerHTML = "";

  if (!children.length) {

    children = [
      {
        name: "",
        age: ""
      }
    ];
  }

  children.forEach((child, index) => {

    const row =
      document.createElement("div");

    row.className = "child-row";

    row.innerHTML = `
      <div class="child-row-fields">

        <input
          type="text"
          class="parent-child-name"
          placeholder="Имя ребёнка"
          value="${escapeHtml(child.name || "")}"
        >

        <select class="parent-child-age">

          <option value="">Возраст</option>

          <option value="До 1 года"
            ${child.age === "До 1 года" ? "selected" : ""}>
            До 1 года
          </option>

          <option value="1–3 года"
            ${child.age === "1–3 года" ? "selected" : ""}>
            1–3 года
          </option>

          <option value="3–6 лет"
            ${child.age === "3–6 лет" ? "selected" : ""}>
            3–6 лет
          </option>

          <option value="6–12 лет"
            ${child.age === "6–12 лет" ? "selected" : ""}>
            6–12 лет
          </option>

          <option value="12+ лет"
            ${child.age === "12+ лет" ? "selected" : ""}>
            12+ лет
          </option>

        </select>

        <button
          type="button"
          class="child-delete-button"
          onclick="removeParentChild(${index})"
        >
          ×
        </button>

      </div>
    `;

    container.appendChild(row);
  });
}


function getParentChildrenFromForm() {

  const rows =
    document.querySelectorAll(".child-row");

  const children = [];

  rows.forEach(row => {

    const name =
      row.querySelector(".parent-child-name").value.trim();

    const age =
      row.querySelector(".parent-child-age").value;

    if (name || age) {

      children.push({
        name,
        age
      });
    }
  });

  return children;
}


function addParentChild() {

  const current =
    getParentChildrenFromForm();

  current.push({
    name: "",
    age: ""
  });

  renderParentChildren(current);
}


function removeParentChild(index) {

  const current =
    getParentChildrenFromForm();

  current.splice(index, 1);

  renderParentChildren(current);
}


function saveParentProfile() {

  const profile = {

    name:
      document.getElementById("parentName").value.trim(),

    city:
      document.getElementById("parentCity").value.trim(),

    about:
      document.getElementById("parentAbout").value.trim(),

    children:
      getParentChildrenFromForm()
  };


  localStorage.setItem(
    "parentProfile",
    JSON.stringify(profile)
  );


  alert("Профиль сохранён ❤️");
}


/* ---------- PARENT SEARCH ---------- */

function openParentSearch() {

  showScreen("parentSearch");


  const saved =
    JSON.parse(
      localStorage.getItem("parentProfile") || "{}"
    );


  /*
    Если город уже указан в профиле,
    автоматически подставляем его.
  */

  document.getElementById("searchCity").value =
    saved.city || "";


  /*
    Если есть дети, автоматически отмечаем
    их возрастные группы.
  */

  document
    .querySelectorAll('input[name="searchAge"]')
    .forEach(input => {

      input.checked =
        (saved.children || [])
          .some(child => child.age === input.value);

    });


  /*
    Сегодня — минимальная доступная дата.
  */

  const dateInput =
    document.getElementById("searchDate");

  const today =
    new Date().toISOString().slice(0, 10);

  dateInput.min = today;


  /*
    Если дата ещё не выбрана,
    ставим сегодня.
  */

  if (!dateInput.value) {
    dateInput.value = today;
  }


  document.getElementById("searchResults").innerHTML = "";
}


function searchNannies() {

  const city =
    document
      .getElementById("searchCity")
      .value
      .trim();


  const ages =
    Array.from(
      document.querySelectorAll(
        'input[name="searchAge"]:checked'
      )
    ).map(input => input.value);


  const languages =
    document
      .getElementById("searchLanguages")
      .value
      .split(",")
      .map(normalizeText)
      .filter(Boolean);


  const formats =
    Array.from(
      document.querySelectorAll(
        'input[name="searchFormat"]:checked'
      )
    ).map(input => input.value);


  const date =
    document
      .getElementById("searchDate")
      .value;


  const time =
    document
      .getElementById("searchTime")
      .value;


  /*
    Проверяем обязательные поля.
  */

  if (!city) {

    alert("Укажите город.");

    return;
  }


  if (!ages.length) {

    alert("Выберите возраст ребёнка.");

    return;
  }


  if (!languages.length) {

    alert("Укажите хотя бы один язык.");

    return;
  }


  if (!formats.length) {

    alert("Выберите формат работы.");

    return;
  }


  if (!date) {

    alert("Выберите дату.");

    return;
  }


  /*
    Сохраняем последний поиск.
  */

  const searchData = {

    city,
    ages,
    languages,
    formats,
    date,
    time

  };


  localStorage.setItem(
    "lastParentSearch",
    JSON.stringify(searchData)
  );


  /*
    Фильтруем тестовых нянь.
  */

  let results =
    testNannies.filter(nanny => {


      /*
        Город
      */

      if (
        normalizeText(nanny.city) !==
        normalizeText(city)
      ) {

        return false;
      }


      /*
        Языки — OR.
        Няня подходит, если знает
        хотя бы один выбранный язык.
      */

      const languageMatch =
        languages.some(selectedLanguage =>
          nanny.languages.some(nannyLanguage =>
            normalizeText(nannyLanguage)
              .includes(selectedLanguage) ||
            selectedLanguage
              .includes(normalizeText(nannyLanguage))
          )
        );


      if (!languageMatch) {
        return false;
      }


      /*
        Возраст — OR.
      */

      const ageMatch =
        ages.some(selectedAge =>
          nanny.childAges.includes(selectedAge)
        );


      if (!ageMatch) {
        return false;
      }


      /*
        Формат работы — OR.
      */

      const formatMatch =
        formats.some(selectedFormat =>
          nanny.workFormats.includes(selectedFormat)
        );


      if (!formatMatch) {
        return false;
      }


      return true;

    });


  /*
    Определяем доступность на выбранную дату.
  */

  results =
    results.map(nanny => {

      let status = "none";


      if (
        nanny.availability &&
        nanny.availability[date]
      ) {

        status =
          nanny.availability[date];

      }


      return {
        ...nanny,
        availabilityStatus: status
      };

    });


  /*
    Сортируем:
    сначала свободные,
    потом частично занятые,
    потом занятые,
    потом без календаря.
  */

  const order = {

    free: 1,
    partial: 2,
    busy: 3,
    none: 4

  };


  results.sort((a, b) => {

    if (
      order[a.availabilityStatus] !==
      order[b.availabilityStatus]
    ) {

      return (
        order[a.availabilityStatus] -
        order[b.availabilityStatus]
      );

    }


    /*
      Няни без отзывов не считаются
      рейтингом 0.
      Поэтому внутри группы они
      идут после оценённых.
    */

    if (
      a.rating !== null &&
      b.rating !== null
    ) {

      return b.rating - a.rating;

    }


    if (a.rating !== null) {
      return -1;
    }


    if (b.rating !== null) {
      return 1;
    }


    return 0;

  });


  renderSearchResults(
    results,
    date
  );
}


/* ---------- SEARCH RESULTS ---------- */

function getAvailabilityLabel(status) {

  if (status === "free") {

    return "🟢 Свободна";

  }

  if (status === "partial") {

    return "🟡 Частично занята";

  }

  if (status === "busy") {

    return "🔴 Занята";

  }

  return "⚪ Доступность не указана";
}


function renderSearchResults(results, date) {

  const container =
    document.getElementById("searchResults");


  /*
    Если вообще никого не нашли.
  */

  if (!results.length) {

    container.innerHTML = `
      <div class="empty-state">

        <h2>Нянь по вашим параметрам пока не найдено.</h2>

        <p>
          Попробуйте изменить параметры поиска
          или посмотреть нянь без указанной доступности.
        </p>

        <button
          class="button button-secondary"
          onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
        >
          Изменить поиск
        </button>

      </div>
    `;

    return;
  }


  /*
    Если результатов меньше 20 —
    показываем также нянь без календаря.

    Если больше 20, няней без календаря
    пока не показываем.
  */

  let visibleResults =
    results.filter(
      nanny =>
        nanny.availabilityStatus !== "none"
    );


  const withoutCalendar =
    results.filter(
      nanny =>
        nanny.availabilityStatus === "none"
    );


  if (results.length < 20) {

    visibleResults =
      [
        ...visibleResults,
        ...withoutCalendar
      ];

  }


  /*
    Если после правила видимых результатов нет.
  */

  if (!visibleResults.length) {

    container.innerHTML = `
      <div class="empty-state">

        <h2>Нянь с указанной доступностью не найдено.</h2>

        <p>
          Попробуйте изменить параметры поиска
          или посмотреть другой день.
        </p>

      </div>
    `;

    return;
  }


  container.innerHTML = `
    <div class="search-results-header">
      <h2>Найдено нянь: ${visibleResults.length}</h2>
      <p>${escapeHtml(date)}</p>
    </div>
  `;


  visibleResults.forEach(nanny => {

    const card =
      document.createElement("div");

    card.className =
      "search-result-card";


    let ratingText =
      nanny.rating === null
        ? "Отзывы пока отсутствуют"
        : `⭐ ${nanny.rating} · ${nanny.reviewsCount} отзывов`;


    card.innerHTML = `

      <div class="nanny-result-top">

        <div class="nanny-result-photo">
          ${nanny.photo}
        </div>

        <div class="nanny-result-main">

          <h2>
            ${escapeHtml(nanny.name)}, ${nanny.age}
          </h2>

          <p>
            📍 ${escapeHtml(nanny.city)}
          </p>

          <p>
            🗣 ${escapeHtml(nanny.languages.join(", "))}
          </p>

        </div>

      </div>


      <div class="nanny-result-info">

        <p>
          👶 ${escapeHtml(nanny.childAges.join(", "))}
        </p>

        <p>
          💼 ${escapeHtml(nanny.workFormats.join(", "))}
        </p>

        <p>
          💰 от ${nanny.price} ${escapeHtml(nanny.currency)} / час
        </p>

        <p>
          ${getAvailabilityLabel(nanny.availabilityStatus)}
        </p>

        <p>
          ${escapeHtml(ratingText)}
        </p>

      </div>


      <div class="nanny-result-buttons">

        <button
          class="button button-secondary"
          onclick="openPublicNannyProfile('${nanny.id}')"
        >
          Посмотреть анкету
        </button>

        <button
          class="button button-primary"
          onclick="startRequest('${nanny.id}')"
        >
          Связаться / создать заявку
        </button>

      </div>

    `;


    container.appendChild(card);

  });
}


/* ---------- PUBLIC NANNY PROFILE ---------- */

let selectedNannyId = null;


function openPublicNannyProfile(id) {

  const nanny =
    testNannies.find(
      item => item.id === id
    );


  if (!nanny) {
    return;
  }


  selectedNannyId = id;


  showScreen(
    "publicNannyProfile"
  );


  const content =
    document.getElementById(
      "publicNannyContent"
    );


  const ratingBlock =
    nanny.rating === null
      ? "Отзывы пока отсутствуют"
      : `⭐ ${nanny.rating} · ${nanny.reviewsCount} отзывов`;


  content.innerHTML = `

    <div class="public-nanny-profile">

      <div class="public-nanny-photo">
        ${nanny.photo}
      </div>


      <h1>
        ${escapeHtml(nanny.name)}, ${nanny.age}
      </h1>


      <p class="profile-city">
        📍 ${escapeHtml(nanny.city)}
      </p>


      <div class="profile-rating">
        ${escapeHtml(ratingBlock)}
      </div>


      <div class="form-section">

        <h2>Языки</h2>

        <p>
          ${escapeHtml(nanny.languages.join(", "))}
        </p>

      </div>


      <div class="form-section">

        <h2>С какими детьми работает</h2>

        <p>
          ${escapeHtml(nanny.childAges.join(", "))}
        </p>

      </div>


      <div class="form-section">

        <h2>Формат работы</h2>

        <p>
          ${escapeHtml(nanny.workFormats.join(", "))}
        </p>

      </div>


      <div class="form-section">

        <h2>Стоимость</h2>

        <p>
          От ${nanny.price}
          ${escapeHtml(nanny.currency)}
          / час
        </p>

      </div>


      <div class="form-section">

        <h2>О себе</h2>

        <p>
          ${escapeHtml(nanny.about)}
        </p>

      </div>


      <div class="form-section">

        <h2>Опыт</h2>

        <p>
          ${escapeHtml(nanny.experience)}
        </p>

      </div>


      <div class="form-section">

        <h2>Образование</h2>

        <p>
          ${escapeHtml(nanny.education)}
        </p>

      </div>


      <div class="form-section">

        <h2>Курсы и дополнительная подготовка</h2>

        <p>
          ${escapeHtml(nanny.courses)}
        </p>

      </div>


      <div class="form-section">

        <h2>Дополнительно</h2>

        <p>
          ${escapeHtml(
            nanny.additionalDuties.join(", ")
          )}
        </p>

      </div>


      <div class="form-section">

        <h2>Дополнительная информация</h2>

        <p>
          Первая помощь:
          ${nanny.firstAid ? "Да" : "Нет"}
        </p>

        <p>
          Ночная работа:
          ${nanny.nightWork ? "Да" : "Нет"}
        </p>

        <p>
          Проживание у семьи:
          ${nanny.liveIn ? "Да" : "Нет"}
        </p>

        <p>
          Путешествия с семьёй:
          ${nanny.travel ? "Да" : "Нет"}
        </p>

      </div>


      <div class="form-section">

        <h2>Отзывы</h2>

        <p>
          ${escapeHtml(ratingBlock)}
        </p>

      </div>

    </div>

  `;
}


function closePublicNannyProfile() {

  selectedNannyId = null;

  showScreen("parentSearch");
}


/* ---------- REQUEST PLACEHOLDER ---------- */

function startRequest(id) {

  selectedNannyId = id;


  alert(
    "Заявку сделаем следующим этапом ❤️"
  );
}


function startRequestFromNanny() {

  if (!selectedNannyId) {
    return;
  }


  startRequest(
    selectedNannyId
  );
}


/* =========================================================
   REQUESTS
   Родитель → Няня
   ========================================================= */


/* ---------- REQUEST HELPERS ---------- */

let currentRequestNannyId = null;
let currentParentRequestTab = "upcoming";
let currentNannyRequestTab = "new";


function getRequests() {

  return JSON.parse(
    localStorage.getItem("babysitterRequests") || "[]"
  );

}


function saveRequests(requests) {

  localStorage.setItem(
    "babysitterRequests",
    JSON.stringify(requests)
  );

}


function generateRequestId() {

  return (
    "request_" +
    Date.now() +
    "_" +
    Math.random()
      .toString(36)
      .substring(2, 8)
  );

}


function getRequestNanny(id) {

  return testNannies.find(
    nanny => nanny.id === id
  );

}


/* ---------- CREATE REQUEST ---------- */

function openCreateRequest(nannyId) {

  const nanny =
    getRequestNanny(nannyId);

  if (!nanny) {
    return;
  }


  currentRequestNannyId =
    nannyId;


  showScreen("createRequest");


  /*
    Загружаем профиль родителя.
  */

  const parentProfile =
    JSON.parse(
      localStorage.getItem("parentProfile") || "{}"
    );


  /*
    Загружаем последний поиск.
  */

  const searchData =
    JSON.parse(
      localStorage.getItem("lastParentSearch") || "{}"
    );


  /*
    Няня.
  */

  document.getElementById(
    "requestNannySummary"
  ).innerHTML = `

    <div class="request-nanny-summary">

      <div class="nanny-result-photo">
        ${nanny.photo}
      </div>

      <div>
        <strong>
          ${escapeHtml(nanny.name)}, ${nanny.age}
        </strong>

        <p>
          📍 ${escapeHtml(nanny.city)}
        </p>

        <p>
          💰 от ${nanny.price}
          ${escapeHtml(nanny.currency)} / час
        </p>

      </div>

    </div>

  `;


  /*
    Имя родителя.
  */

  document.getElementById(
    "requestParentName"
  ).value =
    parentProfile.name || "";


  /*
    Город.
  */

  document.getElementById(
    "requestCity"
  ).value =
    searchData.city ||
    parentProfile.city ||
    "";


  /*
    Дата.
  */

  document.getElementById(
    "requestDate"
  ).value =
    searchData.date || "";


  /*
    Время.
  */

  document.getElementById(
    "requestTime"
  ).value =
    searchData.time || "";


  /*
    Формат работы.
  */

  document
    .querySelectorAll(
      'input[name="requestFormat"]'
    )
    .forEach(input => {

      input.checked =
        input.value === searchData.formats?.[0];

    });


  /*
    Регулярность по умолчанию выключена.
  */

  document.getElementById(
    "requestRegular"
  ).checked = false;


  /*
    Сообщение очищаем.
  */

  document.getElementById(
    "requestMessage"
  ).value = "";


  /*
    Показываем детей.
  */

  renderRequestChildren(
    parentProfile.children || [],
    searchData.ages || []
  );

}


/* ---------- REQUEST CHILDREN ---------- */

function renderRequestChildren(
  children,
  searchAges
) {

  const container =
    document.getElementById(
      "requestChildrenSummary"
    );


  /*
    Если в профиле есть дети —
    показываем их.
  */

  if (children.length) {

    container.innerHTML =
      children.map(child => `

        <div class="request-child-item">

          👶
          ${escapeHtml(child.name || "Ребёнок")}

          ${
            child.age
              ? " — " + escapeHtml(child.age)
              : ""
          }

        </div>

      `).join("");

    return;
  }


  /*
    Если профиль пока пустой,
    используем возраст из поиска.
  */

  if (searchAges.length) {

    container.innerHTML =
      searchAges.map(age => `

        <div class="request-child-item">
          👶 ${escapeHtml(age)}
        </div>

      `).join("");

    return;
  }


  container.innerHTML = `
    <p class="muted-text">
      Возраст ребёнка не указан.
    </p>
  `;

}


/* ---------- START REQUEST ---------- */

function startRequest(id) {

  openCreateRequest(id);

}


function startRequestFromNanny() {

  if (!selectedNannyId) {
    return;
  }


  openCreateRequest(
    selectedNannyId
  );

}


/* ---------- SUBMIT REQUEST ---------- */

function submitRequest() {

  if (!currentRequestNannyId) {
    return;
  }


  const nanny =
    getRequestNanny(
      currentRequestNannyId
    );


  if (!nanny) {
    return;
  }


  const parentProfile =
    JSON.parse(
      localStorage.getItem("parentProfile") || "{}"
    );


  const name =
    document
      .getElementById("requestParentName")
      .value
      .trim();


  const city =
    document
      .getElementById("requestCity")
      .value
      .trim();


  const date =
    document
      .getElementById("requestDate")
      .value;


  const time =
    document
      .getElementById("requestTime")
      .value;


  const formatInput =
    document.querySelector(
      'input[name="requestFormat"]:checked'
    );


  const format =
    formatInput
      ? formatInput.value
      : "";


  const regular =
    document.getElementById(
      "requestRegular"
    ).checked;


  const message =
    document
      .getElementById("requestMessage")
      .value
      .trim();


  /*
    Проверяем обязательные данные.
  */

  if (!name) {

    alert("Укажите ваше имя.");

    return;
  }


  if (!city) {

    alert("Укажите город.");

    return;
  }


  if (!date) {

    alert("Выберите дату.");

    return;
  }


  if (!format) {

    alert("Выберите формат работы.");

    return;
  }


  /*
    Дети.
  */

  const children =
    parentProfile.children || [];


  const searchData =
    JSON.parse(
      localStorage.getItem("lastParentSearch") || "{}"
    );


  /*
    Сохраняем заявку.
  */

  const request = {

    id: generateRequestId(),

    nannyId:
      nanny.id,

    nannyName:
      nanny.name,

    nannyPhoto:
      nanny.photo,

    parentName:
      name,

    parentCity:
      city,

    children:
      children,

    childAges:
      searchData.ages || [],

    date:
      date,

    time:
      time,

    format:
      format,

    regular:
      regular,

    message:
      message,

    status:
      "new",

    createdAt:
      new Date().toISOString(),

    meetingStatus:
      null

  };


  const requests =
    getRequests();


  requests.push(
    request
  );


  saveRequests(
    requests
  );


  /*
    Сохраняем имя и город
    обратно в профиль.

    Это удобно, если родитель
    ещё не успел заполнить профиль.
  */

  const updatedProfile = {

    ...parentProfile,

    name:
      name,

    city:
      city

  };


  localStorage.setItem(
    "parentProfile",
    JSON.stringify(updatedProfile)
  );


  /*
    Показываем экран успеха.
  */

  showScreen(
    "requestSent"
  );

}


/* ---------- CONTACT NANNY ---------- */

function contactNannyFromRequest() {

  const nanny =
    getRequestNanny(
      currentRequestNannyId
    );


  if (!nanny) {
    return;
  }


  /*
    Пока настоящего Telegram username
    у тестовых нянь нет.

    Позже здесь будет:
    https://t.me/username
  */

  alert(
    "Здесь откроется Telegram-чата с няней."
  );

}


/* ---------- PARENT REQUESTS ---------- */

function openParentRequests() {

  showScreen(
    "parentRequests"
  );


  currentParentRequestTab =
    "upcoming";


  updateParentRequestTabs();


  renderParentRequests();

}


function closeParentRequests() {

  showScreen(
    "parentHome"
  );

}


function showParentRequestTab(tab) {

  currentParentRequestTab =
    tab;


  updateParentRequestTabs();


  renderParentRequests();

}


function updateParentRequestTabs() {

  const upcoming =
    document.getElementById(
      "parentUpcomingTab"
    );


  const past =
    document.getElementById(
      "parentPastTab"
    );


  if (!upcoming || !past) {
    return;
  }


  upcoming.classList.toggle(
    "active",
    currentParentRequestTab === "upcoming"
  );


  past.classList.toggle(
    "active",
    currentParentRequestTab === "past"
  );

}


function renderParentRequests() {

  const container =
    document.getElementById(
      "parentRequestsList"
    );


  if (!container) {
    return;
  }


  const requests =
    getRequests();


  /*
    Пока разделяем только по дате.

    В будущем здесь появятся:
    new / upcoming / completed / cancelled
  */

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);


  let filtered;


  if (
    currentParentRequestTab === "past"
  ) {

    filtered =
      requests.filter(
        request =>
          request.date < today ||
          request.status === "cancelled"
      );

  } else {

    filtered =
      requests.filter(
        request =>
          request.date >= today &&
          request.status !== "cancelled"
      );

  }


  if (!filtered.length) {

    container.innerHTML = `

      <div class="empty-state">

        <h2>
          ${
            currentParentRequestTab === "past"
              ? "Прошедших заявок пока нет"
              : "Предстоящих заявок пока нет"
          }
        </h2>

        <p>
          Здесь будут отображаться ваши заявки.
        </p>

      </div>

    `;

    return;
  }


  container.innerHTML = "";


  filtered
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date)
    )
    .forEach(request => {

      const card =
        document.createElement("div");

      card.className =
        "request-card";


      const childrenText =
        request.children?.length

          ? request.children
              .map(
                child =>
                  `${child.name || "Ребёнок"}${
                    child.age
                      ? " — " + child.age
                      : ""
                  }`
              )
              .join(", ")

          : request.childAges?.join(", ") ||
            "Не указано";


      card.innerHTML = `

        <div class="request-card-header">

          <div class="request-card-photo">
            ${request.nannyPhoto || "👩🏻"}
          </div>

          <div>

            <h2>
              ${escapeHtml(request.nannyName)}
            </h2>

            <p>
              📅 ${escapeHtml(request.date)}
              ${
                request.time
                  ? " · " + escapeHtml(request.time)
                  : ""
              }
            </p>

          </div>

        </div>


        <div class="request-card-info">

          <p>
            👶 ${escapeHtml(childrenText)}
          </p>

          <p>
            💼 ${escapeHtml(request.format)}
          </p>

          ${
            request.regular
              ? "<p>🔄 Регулярная заявка</p>"
              : ""
          }

          ${
            request.message
              ? `
                <p>
                  💬 ${escapeHtml(request.message)}
                </p>
              `
              : ""
          }

        </div>

      `;


      container.appendChild(
        card
      );

    });

}


/* ---------- NANNY REQUESTS ---------- */

function openNannyRequests() {

  showScreen(
    "nannyRequests"
  );


  currentNannyRequestTab =
    "new";


  updateNannyRequestTabs();


  renderNannyRequests("new");

}


function closeNannyRequests() {

  showScreen(
    "nannyHome"
  );

}


function showNannyRequestTab(tab) {

  currentNannyRequestTab =
    tab;


  updateNannyRequestTabs();


  renderNannyRequests(tab);

}


function updateNannyRequestTabs() {

  const newTab =
    document.getElementById(
      "nannyNewTab"
    );


  const upcoming =
    document.getElementById(
      "nannyUpcomingTab"
    );


  const past =
    document.getElementById(
      "nannyPastTab"
    );


  if (!newTab || !upcoming || !past) {
    return;
  }


  newTab.classList.toggle(
    "active",
    currentNannyRequestTab === "new"
  );


  upcoming.classList.toggle(
    "active",
    currentNannyRequestTab === "upcoming"
  );


  past.classList.toggle(
    "active",
    currentNannyRequestTab === "past"
  );

}


function renderNannyRequests(currentTab) {

  const container =
    document.getElementById(
      "nannyRequestsList"
    );


  if (!container) {
    return;
  }


  /*
    В тестовом режиме определяем,
    что сейчас мы смотрим от имени
    конкретной тестовой няни.

    Поскольку реального Telegram пользователя
    ещё нет, берём первую няню Анну.

    Позже это будет автоматически
    определяться через аккаунт.
  */

  const currentNannyId =
    localStorage.getItem(
      "demoCurrentNannyId"
    ) || "n1";


  const requests =
    getRequests();


  const today =
    new Date()
      .toISOString()
      .slice(0, 10);


  let filtered;


  if (
    currentNannyRequestTab === "new"
  ) {

    filtered =
      requests.filter(
        request =>
          request.nannyId === currentNannyId &&
          request.status === "new" &&
          request.date >= today
      );

   } else if (
    currentNannyRequestTab === "upcoming"
  ) {

    filtered =
      requests.filter(
        request =>
          request.nannyId === currentNannyId &&
          request.date >= today &&
          request.status === "upcoming"
      );

  } else {

    filtered =
      requests.filter(
        request =>
          request.nannyId === currentNannyId &&
          (
            request.date < today ||
            request.status === "completed"
          )
      );

  }


  if (!filtered.length) {

    container.innerHTML = `

      <div class="empty-state">

        <h2>
          ${
            currentNannyRequestTab === "new"
              ? "Новых заявок пока нет"
              : currentNannyRequestTab === "upcoming"
                ? "Предстоящих заявок пока нет"
                : "Прошедших заявок пока нет"
          }
        </h2>

        <p>
          Здесь будут отображаться заявки родителей.
        </p>

      </div>

    `;

    return;
  }


  container.innerHTML = "";


  filtered
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date)
    )
    .forEach(request => {

      const card =
        document.createElement("div");

      card.className =
        "request-card";


      const childrenText =
        request.children?.length

          ? request.children
              .map(
                child =>
                  `${child.name || "Ребёнок"}${
                    child.age
                      ? " — " + child.age
                      : ""
                  }`
              )
              .join(", ")

          : request.childAges?.join(", ") ||
            "Не указано";


      card.innerHTML = `

        <div class="request-card-header">

          <div class="request-card-photo">
            👤
          </div>

          <div>

            <h2>
              ${escapeHtml(request.parentName)}
            </h2>

            <p>
              📍 ${escapeHtml(request.parentCity)}
            </p>

          </div>

        </div>


        <div class="request-card-info">

          <p>
            📅 ${escapeHtml(request.date)}
            ${
              request.time
                ? " · " + escapeHtml(request.time)
                : ""
            }
          </p>

          <p>
            👶 ${escapeHtml(childrenText)}
          </p>

          <p>
            💼 ${escapeHtml(request.format)}
          </p>

          ${
            request.regular
              ? "<p>🔄 Регулярная заявка</p>"
              : ""
          }

          ${
            request.message
              ? `
                <div class="request-message">
                  <strong>Сообщение:</strong>
                  <p>
                    ${escapeHtml(request.message)}
                  </p>
                </div>
              `
              : ""
          }

        </div>


        <div class="request-actions">

  <button
    class="button button-primary"
    onclick="contactParentFromRequest('${request.id}')"
  >
    💬 Написать родителю
  </button>

  ${
    currentTab === "new"
      ? `
        <button
          class="button button-success"
          onclick="nannyAgreedToRequest('${request.id}')"
        >
          ✓ Мы договорились
        </button>

        <button
          class="button button-danger"
          onclick="nannyDeclinedRequest('${request.id}')"
        >
          ✕ Не договорились
        </button>
      `
      : ""
  }

  ${
    currentTab === "upcoming" &&
    isRequestDatePassed(request)
      ? `
        <button
          class="button button-success"
          onclick="openMeetingConfirmation('${request.id}')"
        >
          ✓ Встреча состоялась?
        </button>
      `
      : ""
  }

</div>
      `;


      container.appendChild(
        card
      );

    });

}

function isRequestDatePassed(request) {
  if (!request.date) {
    return false;
  }

  const requestDate = new Date(request.date);

  if (isNaN(requestDate.getTime())) {
    return false;
  }

  const today = new Date();

  requestDate.setHours(23, 59, 59, 999);
  today.setHours(0, 0, 0, 0);

  return requestDate < today;
}

let currentMeetingRequestId = null;

function openMeetingConfirmation(requestId) {
  alert("Функция работает");

  currentMeetingRequestId = requestId;

  const modal =
    document.getElementById(
      "meetingConfirmModal"
    );

  if (!modal) {
    return;
  }

  modal.style.display = "flex";
}

function confirmMeeting(happened) {

  if (!currentMeetingRequestId) {
    return;
  }

  const requests = getRequests();

  const request = requests.find(
    r => r.id === currentMeetingRequestId
  );

  if (!request) {
    currentMeetingRequestId = null;
    return;
  }

  request.meetingStatus =
    happened ? "yes" : "no";

  request.status = "past";

  saveRequests(requests);

  const modal =
    document.getElementById(
      "meetingConfirmModal"
    );

  if (modal) {
    modal.style.display = "none";
  }

  currentMeetingRequestId = null;

  renderNannyRequests(
    "past"
  );
}


function nannyAgreedToRequest(requestId) {

  const requests = getRequests();

  const request = requests.find(
    r => r.id === requestId
  );

  if (!request) {
    return;
  }

  request.status = "upcoming";

  saveRequests(requests);

  alert("Заявка перенесена в «Предстоящие».");

  renderNannyRequests();
}


function nannyDeclinedRequest(requestId) {

  const requests = getRequests();

  const request = requests.find(
    r => r.id === requestId
  );

  if (!request) {
    return;
  }

  request.status = "declined";

  saveRequests(requests);

  alert("Заявка удалена из новых.");

  renderNannyRequests();
}


/* ---------- CONTACT PARENT ---------- */

function contactParentFromRequest(
  requestId
) {

  const request =
    getRequests().find(
      item =>
        item.id === requestId
    );


  if (!request) {
    return;
  }


  alert(
    "Здесь позже откроется Telegram-чата с родителем."
  );

}
