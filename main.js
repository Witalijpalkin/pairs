import Card from './class.js'
let firstCard = null,
	secondCard = null,
	arrOfPairs = [],
	timerBlock,
	timer,
	cardsForm;
const cards = [];




(function () {
	let container = document.querySelector('.container');
	container.innerHTML = `<h2>Игра в пары</h2>`;
	let cardsList = document.createElement('section');
	container.append(cardsList);
	cardsList.classList.add('list');

	//main fun
	function createGameOfPairs() {
		cardsForm = createCardsForm(); // создаем форму для ввода числа карточек, ^f
		let cardCount;
		cardsForm.form.addEventListener('submit', function (e) { //вешаем на форма событие
			e.preventDefault(); //игнор. перезагрузку страницы
			if (!cardsForm.input.value) { //Если пусто, то по умолчанию 4
				cardCount = 8;
			} else {
				cardCount = Number(cardsForm.input.value); //Берем значение из формы, преобразовав его в число.
				if (cardCount < 4 || cardCount > 12 || cardCount % 2) { // проверяем число на соответствие
					cardCount = 8;
				}
			}

			if (arrOfPairs.length > 0) {//не даем создать дополнительные карточки, когда идет игра
				alert('Закончите текущую игру или перезагрузите страницу');
				return;
			}
			arrOfPairs = getArrOfPairs(cardCount);// заполняем массив передав в фун значение из инпута, ^f
			const mixArr = shaking(arrOfPairs); // перемешиваем заполненный массив в новый массив
			let columns = 2;//настраиваем игровое поле в зависимости от кол-ва карточек
			switch (cardCount) {
				case 2:
					columns = 2;
					break;
				case 4:
					columns = 4;
					break;
				case 6:
					columns = 6;
					break;
				case 8:
					columns = 4;
					break;
				case 10:
					columns = 5;
					break;
				case 12:
					columns = 6;
					break;
				default:
					columns = 10;
			}
			cardsList.style = `grid-template-columns: repeat(${columns}, 1fr)`;
			createCardsList(mixArr); // Берем перемешанный м и кол-во карточек из инпута, передаем их в фун герерации карточек.
			cardsForm.input.value = ''; //Очищаем поле после взятия информации
			startTimer();
			cardsForm.form.style.display = 'none';
		});
	};

	window.createGameOfPairs = createGameOfPairs;

	function createCardsList(arr) {
		for (let cardNum of arr) {
			new Card(cards, cardNum, cardsList, flip);
			//cards.push(Card.open);
		}
		//saveCardList(cards, 'arrOfCards');

		function flip(card) {
			if (firstCard !== null && secondCard !== null) {
				if (firstCard.number != secondCard.number) {
					firstCard.open = false
					secondCard.open = false
					firstCard = null
					secondCard = null
				}
			}

			if (firstCard == null) {
				firstCard = card;
			} else {
				if (secondCard == null)
					secondCard = card;
			}

			if (firstCard !== null && secondCard !== null) {
				if (firstCard.number == secondCard.number) {
					firstCard.success = true
					secondCard.success = true
					firstCard = null
					secondCard = null
				}
			}

			if (document.querySelectorAll('.success').length == arr.length) {
				clearInterval(timer);
				setTimeout(function () {
					let btnReset = document.createElement('button');
					btnReset.textContent = 'Здорово, еще игру?'
					btnReset.classList.add('btn', 'btn-primary');
					container.append(btnReset);
					btnReset.addEventListener('click', () => {
						cardsForm.form.style.display = 'flex';
						cardsList.innerHTML = '';
						arrOfPairs = [];
						firstCard = null;
						secondCard = null;
						//createGameOfPairs();
						btnReset.remove();
						timerBlock.remove();
					})
				}, 200)
			}
		}
	}
	function getArrOfPairs(count) {
		for (let i = 1; i <= count / 2; i++) {
			arrOfPairs.push(i, i);
		};
		return arrOfPairs;
	};
	function shaking(arr) {
		const mixArr = [];
		for (let i = arr.length - 1; i > 0; i--) {
			let temp = arr[i];
			let rnd = Math.floor(Math.random() * (i + 1))
			arr[i] = arr[rnd];
			arr[rnd] = temp;
		}
		for (let item of arr) {
			mixArr.push(item);
		}

		return mixArr;
	};
	function createCardsForm() {
		const form = document.createElement('form');
		const input = document.createElement('input');
		const formButton = document.createElement('button');

		form.classList.add('input-group', 'form', 'mb-3');
		formButton.classList.add('btn', 'btn-primary');
		input.placeholder = 'Введите четное кол-во  карточек от 4 до 12';
		input.classList.add('form-control');
		formButton.textContent = 'Играть';
		formButton.disabled;

		form.append(input);
		form.append(formButton);

		container.append(form);
		return {
			form, input, formButton,
		};
	};

	function startTimer() {
		timerBlock = document.createElement('div');
		timerBlock.classList.add('timer');
		timerBlock.textContent = '00:30';
		container.append(timerBlock);
		let sec = 29;
		timer = setInterval(() => {
			timerBlock.innerHTML = '00:' + sec;
			if (sec < 1) {
				clearInterval(timer);
				let btnReset = document.createElement('button');
				btnReset.textContent = 'Время закончилось, еще игру?'
				btnReset.classList.add('btn', 'btn-primary');
				container.append(btnReset);
				timerBlock.remove();
				cardsList.innerHTML = '';
				btnReset.addEventListener('click', () => {
					cardsForm.form.style.display = 'flex';
					cardsList.innerHTML = '';
					arrOfPairs = [];
					firstCard = null;
					secondCard = null;
					//createGameOfPairs();
					btnReset.remove();
				})
			} else sec--;
		}, 1000)
	}
})();

