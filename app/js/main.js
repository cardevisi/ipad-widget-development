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
}
var main = new Main().init();
