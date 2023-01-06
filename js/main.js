window.onload = function () {
    let form = document.getElementById("choix");
    let select = document.getElementById("test");
    let man = new SerieManager();
    form.onsubmit = function (e) {
        e.preventDefault();
        man.nom = select.value;
        man.nbQuestions = 25;
        man.currentQuestion = 0;
        man.corrections = corrections[`${man.nom}`];
        man.responses = [];
        man.timer = new Timer();
        man.init();
    }
}