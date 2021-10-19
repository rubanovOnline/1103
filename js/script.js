let border, shadow;

// получаем объект - тело страницы (body)
let body = document.body;

// получаем объект - форму (form с атрибутом name="settings")
let formSettings = document.forms.settings;

// получаем объекты - кнопку "Форматировать" и кнопку "Сбросить"
let btnFormatted = formSettings.elements.btnFormatted;
let btnClear = formSettings.elements.btnClear;

// получаем объекты - радиопереключатели "по умолчанию" и "пол.настр."
let radioDefault = document.querySelector("#radioDefault");
let radioCustom = document.querySelector("#radioCustom");

// получаем объект - область полей (fieldset) с польз. настр.
let customSettings = document.querySelector(".custom-settings");

// получаем коллекцию - флажки (checkbox)
let checkboxes = formSettings.querySelectorAll("[type='checkbox']");
// получаем объект - поле с кол-вом абзацев
let countP = document.getElementById("countP");
//поле с пользовательским текстом
let userText;

for (let i = 0; i < checkboxes.length; i++) {
	checkboxes[i].addEventListener("change", () => {
		if (i == 0) {
			if (checkboxes[0].checked) {
				body.style.border = "10px solid darkblue";
			} else {
				body.style.border = "none";
			}
		}

		if (i == 1) {
			if (checkboxes[1].checked) {
				body.style.boxShadow = "inset 0 0 20px 10px gray";
			} else {
				body.style.boxShadow = "none";
			}
		}

		if (i == 2) {
			if (checkboxes[2].checked) {
				countP.removeAttribute("disabled");

				if (!document.querySelector(".text-container")) {
					let div = document.createElement("div");
					div.classList.add("text-container");

					userText = document.createElement("textarea");
					userText.classList.add("user-text");
					userText.setAttribute("maxlength", "1000");

					div.append(userText);
					customSettings.append(div);

					userText.focus();
					userText.addEventListener("input", getTextLength);
				}
			} else {
				countP.setAttribute("disabled", "disabled");
				document.querySelector(".text-container").remove();
			}
		}
	});
}

//Обработчики события "click" на кнопки "Форматировать" и "Очистить"
btnFormatted.addEventListener("click", formattedPage);
btnClear.addEventListener("click", clearFormatted);

//Обработчик события "change" при выборе радиопереключ. "по умолчанию"
radioDefault.addEventListener("change", () => {
	if (!customSettings.classList.contains(".hidden")) {

		if (customSettings.classList.contains("animate__fadeInUp")) {
			customSettings.classList.remove("animate__fadeInUp");
		}

		customSettings.classList.toggle("animate__fadeOutUp");
		setTimeout(() => {
			customSettings.classList.add("hidden");
		}, 500);
	}
});

//Обработчик события "change" при выборе радиопереключ. "польз. настр."
radioCustom.addEventListener("change", showCustomSettings);

//Функция отображения области с польз. настр.
function showCustomSettings() {
	customSettings.classList.remove("hidden");

	if (customSettings.classList.contains("animate__fadeOutUp")) {
		customSettings.classList.remove("animate__fadeOutUp");
	}

	customSettings.classList.toggle("animate__fadeInUp");
}

//Функция вывода длины текста в поле
function getTextLength() {
	let span; //информация о текущем кол-ве символов в строке
	let error;
	let textLength = userText.value.length;

	if (textLength < 100) {
		userText.style.outlineColor = "red";

		if (!document.querySelector(".error")) {
			error = document.createElement("b");
			error.textContent = "В поле недостаточно символов (< 100)!";
			error.classList.add("error");
			userText.insertAdjacentElement("beforebegin", error);
		} else {
			document.querySelector(".error").textContent = "В поле недостаточно символов (< 100)!";
		}
	} else {
		if (document.querySelector(".error")) {
			document.querySelector(".error").remove();
		}
		userText.style.outlineColor = "rgb(204, 204, 125)";
	}

	if (!document.querySelector("span")) {
		span = document.createElement("span");
		span.classList.add("info-length");
		span.textContent = textLength + ` / ${userText.getAttribute("maxlength")}`;
		userText.insertAdjacentElement("afterend", span);
	} else {
		document.querySelector("span").textContent = textLength + ` / ${userText.getAttribute("maxlength")}`;
	}
}

//Функция форматирования страницы
function formattedPage(border, shadow) {
	let p;

	body.classList.add("page-default");

	if (checkboxes[2].checked) {
		let numP = countP.value;
		let div;

		if (userText.value.length >= 100) {
			if (document.querySelector(".added")) {
				document.querySelector(".added").innerHTML = "";
			} else {
				div = document.createElement("div");
				div.classList.add("added");
				formSettings.insertAdjacentElement("afterend", div);
			}

			createP(numP);
		}
	}
}

//Функция создания абзацев (p) в контейнере с классом .added
function createP(numP) {
	for (let i = 0; i < numP; i++) {
		p = document.createElement("p");
		p.textContent = userText.value;
		document.querySelector(".added").append(p);
	}
}

//Функция сброса форматирования
function clearFormatted() {
	if (body.classList.contains("page-default")) {
		body.classList.remove("page-default");
	}

	if (document.querySelector(".added")) {
		document.querySelector(".added").remove();
	}

	if (document.querySelector(".text-container")) {
		document.querySelector(".text-container").remove();
	}

	body.style.boxShadow = "none";
	body.style.border = "none";

	for (let i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}

	if (countP.value != 1) {
		countP.value = 1;
	}
	countP.setAttribute("disabled", "disabled");
}