// Создать ассоциативный массив и занести в него десять элементов по принципу: "фамилия" -
// 	"дата рождения".Удалить из массива всех людей, родившихся летом.Формат записи числа
// 18 april 1956. Вывести массив до удаления и после на экран, каждый с новой строки.
// Пример записи в массиве: $arr['Иванов' = & gt; '18 april 1956'];

// let arr = new Map();
// let users = {
// 	0: {
// 		firstName: "Иванов",
// 		birthday: "10 апреля 1956"
// 	},
// 	1: {
// 		firstName: "Петрова",
// 		birthday: "11 октября 1960"
// 	},
// 	2: {
// 		firstName: "Макаров",
// 		birthday: "11 июля 1962"
// 	},
// 	3: {
// 		firstName: "Речкина",
// 		birthday: "12 сентября 1955"
// 	},
// 	4: {
// 		firstName: "Кириллова",
// 		birthday: "16 марта 1970"
// 	},
// 	5: {
// 		firstName: "Юшкин",
// 		birthday: "3 августа 1966"
// 	}
// }

// arr = fillArr();
// showArr(arr);

// deletedItems(arr);
// document.write("<br>");
// showArr(arr);

// //Функция формирования элементов ассоциативного массива из значения ключей объекта users
// function fillArr() {
// 	//цикл по ключам (0, 1, 2, 3, 4, 5) объекта users
// 	for (let key in users) {
// 		arr.set(users[key]["firstName"], users[key]["birthday"]);
// 	}

// 	return arr;
// }

// //Функция вывода ассоциативного массива
// function showArr(array) {
// 	//цикл по элементам массива
// 	//pair - сам элемент
// 	for (let pair of array) {
// 		document.write(`${pair[0]}: ${pair[1]}<br>`);
// 	}
// }

// //Функция удаления элементов (летние месяцы) из ассоциативного массива
// function deletedItems(array) {
// 	for (let pair of array) {
// 		if (pair[1].includes("июня") || pair[1].includes("июля") || pair[1].includes("августа")) {
// 			array.delete(pair[0]);
// 		}
// 	}
// }

// // .1. Создай массив чисел.2. Добавь в массив 10 чисел с клавиатуры.3. Вывести на экран длину самой длинной последовательности повторяющихся чисел в списке. Пример для списка < i > 2, 4, 4, 4, 8, 8, 4, 12, 12, 14 < /i>: 3

// let arrNumbers = [];
// let flag = false;

// start();
// showResult();

// //Стартовая функция
// function start() {
// 	do {
// 		let countNumbers = prompt("Кол-во чисел в массиве:");

// 		if (isNaN(+countNumbers)) {
// 			alert("Ввели не число!");
// 			flag = true;
// 		} else if (typeof countNumbers == "object") {
// 			alert("Вы отменили!");
// 			flag = false;
// 		} else if (+countNumbers == 0) {
// 			alert("Массив не может быть пустым!");
// 			flag = true;
// 		} else {
// 			flag = false;
// 			arrNumbers = getFillArr(+countNumbers);
// 		}
// 	} while (flag);
// }

// //Функция заполнения элементов массива
// function getFillArr(count) {
// 	let fillArr = [];

// 	for (let i = 0, randNum = 0; i < count; i++) {
// 		//заполнение массива с клавиатуры
// 		if (count <= 10) {
// 			fillArr.push(+prompt(`${i + 1}-й элемент:`));
// 		}
// 		//заполнение случайными числами
// 		else {
// 			randNum = Math.round(Math.random() * 100);
// 			fillArr.push(randNum);
// 		}
// 	}
// 	return fillArr;
// }

// //Функция вывода результата
// function showResult() {
// 	let result = searchRepeatNums(arrNumbers);

// 	if (result) {
// 		alert(`Длина максимальной последовательности массива ${arrNumbers} = ${result[1]} \nсама последовательность: ${result[0]}`);
// 	} else {
// 		alert(`В массиве ${arrNumbers} последовательности одинаковые!`);
// 	}
// }

// //Функция поиска повторяющихся последовательностей
// function searchRepeatNums(arr) {
// 	let arrChains = [];

// 	//[2, 4, 4, 4, 8, 8, 4, 12, 12, 14]
// 	for (let i = 1, str = arr[0], num = arr[0]; i <= arr.length; i++) {

// 		if (i == arr.length) {
// 			arrChains.push(str.toString());
// 			break;
// 		}

// 		if (num == arr[i]) {
// 			str = str + ' ' + num.toString();
// 		} else {
// 			num = arr[i];
// 			arrChains.push(str.toString());
// 			str = num;
// 		}
// 	}

// 	// ['2', '4 4 4', '8 8', '4', '12 12', '14']
// 	if (searchMax(arrChains)[0] == undefined) {
// 		return false;
// 	}

// 	return [arrChains[searchMax(arrChains)[0]], searchMax(arrChains)[1]];
// }

// //Функция поиска длины максимальной последовательности и порядкового номера
// function searchMax(arrChains) {
// 	let lengthMax; //длина максимальной последовательности
// 	let index; //порядковый номер максимальной последовательности

// 	lengthMax = arrChains[0].split(" ").length;

// 	for (let i = 1; i < arrChains.length; i++) {
// 		if (lengthMax < arrChains[i].split(" ").length) {
// 			lengthMax = arrChains[i].split(" ").length;
// 			index = i;
// 		}
// 	}

// 	return [index, lengthMax];
// }

// function settingsViewPage(color = "#f0f0f0", width, ...props) {
// 	if (color != undefined) {
// 		document.body.style.backgroundColor = color;
// 	}

// 	if (width != undefined) {
// 		document.body.style.width = width;
// 		document.body.style.margin = "auto";
// 	}

// 	if (props[0]) {
// 		document.body.style.padding = props[0];
// 	}
// 	if (props[1]) {
// 		document.body.style.boxShadow = props[1];
// 	}
// 	if (props[2]) {
// 		document.body.textContent = props[2];
// 		document.body.style.color = "white";
// 	}
// }

// settingsViewPage();
// settingsViewPage("rgb(150, 50, 50)");
// settingsViewPage("rgb(150, 50, 50)", "85%");
// settingsViewPage("rgb(150, 50, 50)", "50%", "50px", "0 0 10px 0 gold", "Текст Текст Текст");

// let btnHightLight = document.getElementById("btnHihgtLight");
// let pAll = document.querySelectorAll("p");

// btnHightLight.addEventListener("click", setHightLight);

// function setHightLight() {
// 	for (let p of pAll) {
// 		p.classList.toggle("bg");
// 		p.classList.toggle("space");
// 	}
// 	if (btnHightLight.textContent == "Выключить") {
// 		btnHightLight.textContent = "Включить";
// 	} else {
// 		btnHightLight.textContent = "Выключить";
// 	}
// }

// btnHightLight.addEventListener("click", function () {
// 	for (let p of pAll) {
// 		p.classList.toggle("bg");
// 		p.classList.toggle("space");
// 	}
// 	if (btnHightLight.textContent == "Выключить") {
// 		btnHightLight.textContent = "Включить";
// 	} else {
// 		btnHightLight.textContent = "Выключить";
// 	}
// });

// btnHightLight.addEventListener("click", () => {
// 	for (let p of pAll) {
// 		p.classList.toggle("bg");
// 		p.classList.toggle("space");
// 	}
// 	if (btnHightLight.textContent == "Выключить") {
// 		btnHightLight.textContent = "Включить";
// 	} else {
// 		btnHightLight.textContent = "Выключить";
// 	}
// });
