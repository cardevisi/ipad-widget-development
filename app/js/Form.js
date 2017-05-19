function Form() {

	function populatePayment() {
		var selectPayment = document.querySelector('#select-payment');
		for (var i = 1; i <= 12; i++) {
			var newOption = selectPayment.firstElementChild.cloneNode(true);
			newOption.setAttribute('value', i);
			newOption.text = i;
			selectPayment.appendChild(newOption);
		}
	};

	function populateQuantity() {
		var selectPayment = document.querySelector('#select-quantity');
		for (var i = 1; i <= 100; i++) {
			var newOption = selectPayment.firstElementChild.cloneNode(true);
			newOption.setAttribute('value', i);
			newOption.text = i;
			selectPayment.appendChild(newOption);
		}
	};

	this.init = function() {
		populatePayment();
		populateQuantity();
	};
	return this;
}