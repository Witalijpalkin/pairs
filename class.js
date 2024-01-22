export default class Card {
	_open = false
	_success = false
	constructor(cards, num, cardsList, action) {
		this.item = document.createElement('div');
		this.itemFront = document.createElement('div');
		this.itemBack = document.createElement('div');
		this.itemBackContent = document.createElement('div');
		this.item.classList.add('card');
		this.itemFront.classList.add('card__front');
		this.itemBack.classList.add('card__back');
		this.itemBackContent.classList.add('card__back-content');
		this.itemBackContent.textContent = num;
		this.number = num;
		this.itemBack.append(this.itemBackContent);
		this.item.append(this.itemFront);
		this.item.append(this.itemBack);
		cardsList.append(this.item);
		this.item.addEventListener('click', () => {
			if (this.open == false && this.success == false) {
				this.open = true
				action(this);
			}
		cards.push(this.open)
		});
	}
	set open(value) {
		this._open = value
		value ? this.itemFront.classList.add('card-active-front') : this.itemFront.classList.remove('card-active-front')
		value ? this.itemBack.classList.add('card-active-back') : this.itemBack.classList.remove('card-active-back')
	}
	get open() {
		return this._open
	}
	set success(value) {
		this._success = value
		value ? this.itemBack.classList.add('success') : this.itemBack.classList.remove('success')
	}
	get success() {
		return this._open
	}
}