const mainContainer = document.querySelector(".c-crypto-container");

function createSection(name, abbreviation, variation) {
  const sectionElement = document.createElement("section");
  const span1 = document.createElement("span");
  const span2 = document.createElement("span");
  const span3 = document.createElement("span");

  sectionElement.classList.add("crypto-card");

  if (+variation < 0) {
    sectionElement.classList.add("card--red");
  } else {
    sectionElement.classList.add("card--green");
  }

  if (+variation >= 1) {
    sectionElement.classList.add("green-pulse");
  }

  if (+variation <= -1) {
    sectionElement.classList.add("red-pulse");
  }

  sectionElement.appendChild(span1);
  sectionElement.appendChild(span2);
  sectionElement.appendChild(span3);

  span1.innerHTML = name;
  span2.innerHTML = abbreviation;
  span3.innerHTML = `${
    Number(variation) > 0
      ? "+" + Number(variation).toFixed(4) + "%"
      : Number(variation).toFixed(4) + "%"
  }`;

  mainContainer.append(sectionElement);
}

async function getDataApi() {
  try {
    const response = await fetch("https://api.coincap.io/v2/assets");
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    return;
  }
}

function updateScreen() {
  const data = getDataApi();
  data
    .then((jsonData) => {
      const sectionElements = document.querySelectorAll("section");
      [...sectionElements].map((section) => {
        section.remove();
      });

      const values = jsonData.data;
      values.map((value) => {
        createSection(value.name, value.symbol, value.changePercent24Hr);
      });
    })
    .catch((e) => {
      return;
    });
}

function run() {
  const data = getDataApi();
  data.then((jsonData) => {
    const values = jsonData.data;
    values.map((value) => {
      createSection(value.name, value.symbol, value.changePercent24Hr);
    });
  });
}

run();

setInterval(() => {
  updateScreen();
}, 3000);
