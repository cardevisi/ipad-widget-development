(function(window, document, undefined) {
'use strict';
function Carrossel() {
    this.init = function () {
        var carousel = new ch.Carousel(ch('.product-carousel')[0], {
            'pagination': false,
            'autoMargin' :false,
            'autoHeight' :false,
            'arrows' : true,
            'fx': true
        });
    };
    return this;
}
function Tabs() {
    this.init = function () {
    	var tabs = new ch.Tabs(ch(".product-description-tabs")[0]);
    	tabs.enable(2);
    };
    return this;
}
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
function Main() {
    var carrossel = new Carrossel();
    var tabs = new Tabs();
    var form = new Form();
    this.init = function() {
        document.addEventListener('DOMContentLoaded', function(e) {
            carrossel.init();
            tabs.init();
            form.init();
        });
    };
    return this;    
}
var main = new Main().init();
})(window, document);
