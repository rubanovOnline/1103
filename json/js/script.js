let headersName = new Map(); // ассоциативный массив с именами заголовков таблицы

const btnsContainer = document.getElementById("buttons"); // div с кнопками
const btnCreate = document.getElementById("mainServices"); // кнопка "Услуги"
const btnCreateVip = document.getElementById("vipServices"); // кнопка "VIP-услуги"
const btnDelete = document.getElementById("remove"); // кнопка "Удалить"
let btnRowDelete; // кнопка "Удалить последнюю строку"

let services; // строка объектов (услуг)
let countKeys = 0; // кол-во ключей в объекте (кол-во столбцов в таблице)
let countServices = 0; // кол-во услуг (кол-во строк в таблице)

let url; // адрес файла с данными (для AJAX-запроса)
let request = new XMLHttpRequest(); // объект-запрос

// обработчик события "click" по кнопке "Услуги"
btnCreate.addEventListener("click", () => {
  // если таблица с id "generateTable" не существует в DOM
  if (!document.getElementById("generateTable")) {
    url = "js/services.json"; // файл с основными услугами
    sendRequest("GET", url, "json", true);
  } else {
    let table = document.getElementById("generateTable");
    btnCreate.textContent = "Услуги";

    visibleRows.call(table);
    table.classList.remove("hidden");

    btnCreateVip.classList.remove("hidden");
    btnDelete.removeAttribute("disabled");
    btnRowDelete.classList.remove("hidden");
    btnRowDelete.removeAttribute("disabled");
  }
});

// обработчик события "click" по кнопке "VIP-услуги"
btnCreateVip.addEventListener("click", () => {
  if (!document.querySelector(".vip-category")) {
    url = "js/vip-services.json"; // файл с VIP-услугами
    sendRequest("GET", url, "json", true);
  } else {
    let rowsVip = document.querySelectorAll(".vip-services");

    if (rowsVip[0].classList.contains("hidden")) {
      visibleRows.call(rowsVip);
      btnCreateVip.textContent = "Скрыть";
    } else {
      deleteRow.call(rowsVip);
      btnCreateVip.textContent = "VIP-услуги";
    }
  }
});

function sendRequest(method, url, responseType, flag) {
  request.open(method, url, flag);
  request.responseType = responseType;

  request.send();
}

request.addEventListener("readystatechange", (e) => {
  if (request.readyState == 4 && request.status == 200) {
    services = request.response;

    let fileName = e.target.responseURL.substr(-17);

    if (fileName === "vip-services.json") {
      row = document.getElementById("generateTable").insertRow();
      row.classList.add("vip-services");
      cell = row.insertCell(); // добавляем ячейку (td) к строке (tr)
      cell.setAttribute("colspan", countKeys);
      cell.textContent = "VIP-Услуги";
      cell.classList.add("title-category", "vip-category");

      countServices = 0;
      countServices = getCountServices(services);
      let tBody = document.getElementById("generateTable").tBodies[0];

      createRows(tBody, countServices, "vip-services");
      btnCreateVip.textContent = "Скрыть";
    } else {
      countKeys = getCountKeys(services);
      countServices = getCountServices(services);

      createTable(services); // вызов функции создания таблицы

      btnCreateVip.classList.remove("hidden");
      btnDelete.removeAttribute("disabled");

      createBtnRowDelete();

      let table = document.getElementById("generateTable");
      btnRowDelete.addEventListener("click", deleteRow.bind(table));
    }
  }
});

// обработчик события "click" по кнопке "Удалить"
btnDelete.addEventListener("click", () => {
  let table = document.getElementById("generateTable");

  if (table) {
    table.classList.add("hidden");
    btnCreateVip.classList.add("hidden");
    btnRowDelete.classList.add("hidden");
    btnDelete.setAttribute("disabled", "");
  }
});

// функция возврата кол-ва ключей (характеристик услуги - столбцов)
function getCountKeys(services) {
  for (let key in services[1]) {
    if (services[1].hasOwnProperty(key)) {
      countKeys++;
    }
  }
  return countKeys;
}

// функция возврата кол-ва услуг (строки)
function getCountServices(services) {
  for (let key in services) {
    if (services.hasOwnProperty(key)) {
      countServices++;
    }
  }
  return countServices;
}

// функция создания таблицы
function createTable() {
  let table = document.createElement("table"); // объект (тег table)
  table.id = "generateTable"; // задаём тегу table id
  table.classList.add("generateTable"); // добавляем класс

  let caption = table.createCaption(); // объект (тег caption)
  caption.textContent = "Наши услуги";

  createTHead(table); // вызов функции создания заголовочной области (тег thead)
  createTBody(table); // вызов функции создания содержимого таблицы (тег tbody)

  // добавляем объект (таблицу) после div с кнопками
  btnsContainer.insertAdjacentElement("afterend", table);
}

// функция создания заголовочной строки таблицы
function createTHead(table) {
  let tHead = table.createTHead(); // объект (тег thead)

  headersName = setHeadersName(services); // вызов функции для получения массива с наименованиями заголовков таблицы

  createRows(tHead, 1);
}

// функция формирования ассоциативного массива с наименованиями заголовочных ячеек таблицы
function setHeadersName(services) {
  let keyName = "";
  let value = "";
  let index;

  // цикл по ключам объекта из массива services
  for (let key in services[1]) {
    switch (key) {
      case "id":
        continue;
      case "name":
        index = "0";
        keyName = "name";
        value = "Наименование";
        break;
      case "category":
        index = "1";
        keyName = "category";
        value = services[1].category;
        break;
      case "price":
        index = "2";
        keyName = "price";
        value = "Цена";
        break;
      case "discont":
        index = "3";
        keyName = "discont";
        value = "Скидка";
        break;
    }
    // создание элемента массива с ключом "index" и значением в виде объекта
    headersName.set(index, { keyName: keyName, value: value });
  }

  return headersName;
}

// функция создания содержимого таблицы (тег tbody)
function createTBody(table) {
  let tBody = table.createTBody(); // объект (тег tbody)
  let row, cell; // объекты: строка (тег tr) и ячейка (тег td)

  row = tBody.insertRow(); // добавляем строку (tr) к tbody
  cell = row.insertCell(); // добавляем ячейку (td) к строке (tr)
  cell.setAttribute("colspan", countKeys - 1);
  cell.textContent = headersName.get("1").value;

  cell.classList.add("title-category");

  createRows(tBody, countServices);
}

// функция создания строк таблицы
function createRows(sectionTable, countRows, vipClass) {
  let row, cell; // объекты: строка (тег tr) и ячейка (тег th или td)
  let data; // данные ячейки
  let tag; // th или td

  sectionTable.tagName === "THEAD" ? (tag = "th") : (tag = "td");

  // внешний цикл - по строкам (tr)
  for (let i = 0; i < countRows; i++) {
    row = sectionTable.insertRow(); // добавляем строку (tr)

    if (vipClass) {
      row.classList.add(vipClass);
    }

    // внутренний цикл - по ячейкам (th или td)
    for (let j = 0; j < countKeys; j++) {
      if (j == 0) {
        tag === "th" ? (data = "№ п/п") : (data = i + 1);
        cell = createCell(tag, data);
      } else {
        if (headersName.get((j - 1).toString()).keyName === "category") {
          continue;
        }

        tag === "th"
          ? (data = headersName.get((j - 1).toString()).value)
          : (data = getValue(i, j - 1));

        cell = createCell(tag, data);
      }
      row.append(cell); // добавление ячейки к строке
    }
  }
}

// функция создания ячейки (th или td) с данными
function createCell(tag, data) {
  let cell;

  cell = document.createElement(tag); // создаём ячейку (th или td)
  cell.textContent = data;

  return cell;
}

// функция возврата значения для ячейки таблицы
function getValue(indexRow, indexCell) {
  let value = "";
  let keyName;

  // цикл по ключам ассоциативного массива headersName
  for (let key of headersName.keys()) {
    // если значение ключа совпадает с порядковым номером ячейки
    if (indexCell.toString() === key) {
      keyName = headersName.get(key).keyName;
    }
  }

  // цикл по массиву объектов
  for (let i = 1; i <= countServices; i++) {
    // если значение порядкового номера строки совпадает с индексом объекта
    if (indexRow + 1 === i) {
      value = services[i][keyName]; // записываем значение ключа "keyName"
    }
    // иначе прерываем текущую итерацию цикла (переходим к следующему элементу)
    else {
      continue;
    }
  }
  return value;
}

// функция отображения строк таблицы
function visibleRows() {
  if (this instanceof NodeList) {
    for (let row of this) {
      row.classList.remove("hidden");
    }
  } else {
    for (let row of this.rows) {
      row.classList.remove("hidden");
    }
  }
}

// функция создания кнопки удаления (скрытия) последней строки
function createBtnRowDelete() {
  let table = document.getElementById("generateTable");

  btnRowDelete = document.createElement("button");
  btnRowDelete.id = "btnRowDelete";
  btnRowDelete.textContent = "Удалить последнюю строку";
  btnRowDelete.classList.add("btnRowDelete");

  table.insertAdjacentElement("afterend", btnRowDelete);
}

// функция удаления (скрытия) последней строки таблицы
function deleteRow() {
  let i = 0;
  console.log(this);
  if (this instanceof NodeList) {
    for (let row of this) {
      if (!row.classList.contains("hidden")) {
        row.classList.add("hidden");
      }
    }
  } else {
    for (let row of this.rows) {
      if (!row.classList.contains("hidden")) {
        i++;
      }
    }

    btnCreate.textContent = "Отобразить";
    if (i > 2) {
      document
        .querySelector(`tbody tr:nth-child(${i - 1})`)
        .classList.add("hidden");
    }
    if (i == 4) {
      btnRowDelete.setAttribute("disabled", "");
    }
  }
}
