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