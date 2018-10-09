var firstNumber = getRandomInt(1, 10);
var secondNumber = getRandomInt(1, 10);
var sumNumbers = firstNumber + secondNumber;
var body = document.body;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Здесь располагается наш пример
var expression = document.createElement('div');
expression.classList.add('expression');
expression.innerHTML = `<span class="first">${firstNumber}</span> + <span class="second">${secondNumber}</span> <span class="equally"> = </span> <span class="count">?</span>`;

var expressionFirstNumber = expression.querySelector('.first');
var expressionSecondNumber = expression.querySelector('.second');
var equally = expression.querySelector('.equally'); //равно
var count = expression.querySelector('.count'); //сумма
body.insertAdjacentElement('afterBegin', expression); //вставляем выражение над линейкой

//Здесь располагается наш график
var cnvsConteiner = body.querySelector('.cnvs-container');
var context = document.querySelector('canvas').getContext('2d');
var rule = body.querySelector('.rule'); //изображение линейки
var scale = 41.3; //для корректной масштабируемости стрелки

//Первая дуга
var centerFirstArch = (scale * firstNumber) / 2; //координаты центра
var bendFirstArch = -75; // изгиб
var endFirstArch = scale * firstNumber; // координаты конца
//Вторая дуга
var centerSecondArch = ((scale * firstNumber) + ((scale * firstNumber) + (scale * secondNumber))) / 2; //координаты центра
var bendSecondArch = -50; //изгиб
var endSecondArch = (scale * secondNumber) + (scale * firstNumber); // координаты конца


(function createFirstArch() { //Рисуем первую дугу
	context.beginPath();
	context.lineWidth = 3; //толщина стрелки
	context.strokeStyle = 'red'; //цвет стрелки
	context.moveTo(0, 80); //начало дуги
	context.quadraticCurveTo(centerFirstArch, bendFirstArch, endFirstArch, 80);
	context.stroke();

})();


function createSecondArch() { //Рисуем вторую дугу
	context.beginPath();
	context.moveTo(endFirstArch, 80);
	context.quadraticCurveTo(centerSecondArch, bendSecondArch, endSecondArch, 80);
	context.stroke();
};

//Значения для ввода
var firstNumberInput = document.createElement('input'); //создаём для первого числа элемент типа input
firstNumberInput.setAttribute('type', 'text');
firstNumberInput.setAttribute('maxlength', '1');
firstNumberInput.classList.add('number-input');
cnvsConteiner.append(firstNumberInput); //добавляем возможность ввода числа
firstNumberInput.style.left = (centerFirstArch + 'px'); //Расположение первого числа по центру
firstNumberInput.style.top = (bendFirstArch + 'px'); //Расположение первого числа над дугой

var secondNumberInput = document.createElement('input');  //создаём для второго числа элемент типа input


//Значение выражения заменяем на input
var expressionValueInput = document.createElement('input');
expressionValueInput.setAttribute("type", "text");
expressionValueInput.setAttribute("maxlength", "2");
expressionValueInput.classList.add('expressionValueInput');


// Проверка значений input
function checkValues(inputValue, rightValue, span) { 
	if (inputValue.value != rightValue) {
		inputValue.classList.add('inputError');//если введено неверно, добавляем стили ошибок
		span.classList.add('spanError');
	} else {
		inputValue.disabled = true;
		inputValue.classList.remove('inputError');//если введено верно, убираем стиль ошибок
		span.classList.remove('spanError');
		nextInputValue();
	};

	if (firstNumberInput.disabled == true && secondNumberInput.disabled == true) { //если числа введены верно, вводим сумму
		count.after(expressionValueInput);
		count.remove();
	};

};


// Переход к следующему числу 
function nextInputValue() {
	var inputs = document.querySelectorAll('input'); //Получаем все введённые значения
	console.log(inputs)
	for (var input of inputs) {
		if (input.disabled) {
			secondNumberInput.setAttribute("type", "text");
			secondNumberInput.setAttribute("maxlength", "1");
			secondNumberInput.classList.add('number-input');
			cnvsConteiner.append(secondNumberInput);
			secondNumberInput.style.left = (centerSecondArch + 'px'); //Расположение второго числа по центру
			secondNumberInput.style.top = (bendFirstArch / 1.3 + 'px'); //Расположение второго числа над дугой
			createSecondArch(); // Рисуем дугу
		}
	};
};


// Проверка суммы
function checkSumNumbers() {
	if (expressionValueInput.value == sumNumbers) {
		expressionValueInput.disabled = true;
		expressionValueInput.classList.remove('inputError'); //если сумма корректна, ошибка нам не нужна
	} else {
		expressionValueInput.classList.add('inputError');
	}
};


firstNumberInput.oninput = () => checkValues(firstNumberInput, firstNumber, expressionFirstNumber); //oninput = () нужен для корректного перехода на следующее событие,затем проверка
secondNumberInput.oninput = () => checkValues(secondNumberInput, secondNumber, expressionSecondNumber);
expressionValueInput.oninput = checkSumNumbers;


