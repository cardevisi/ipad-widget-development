function Tabs() {
    this.init = function () {
    	var tabs = new ch.Tabs(ch(".product-description-tabs")[0]);
    	tabs.enable(2);
    };
    return this;
}