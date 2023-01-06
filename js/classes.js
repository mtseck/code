let corrections = {
    B01: ['BD', 'AD', 'B', 'BC', 'B', 'A', 'B', 'B', 'AD', 'B', 'C', 'BC', 'AD', 'AC', 'B', 'B', 'B', 'A', 'B', 'B', 'A', 'B', 'A', 'B', 'B'],
    B02: ['AD', 'BD', 'BD', 'B', 'AD', 'A', 'AD', 'B', 'BD', 'B', 'B', 'BD', 'A', 'B', 'A', 'B', 'B', 'BC', 'A', 'B', 'A', 'A', 'AC', 'BD', 'BC'],
    B03: ['BD', 'BC', 'B', 'BD', 'B', 'A', 'BC', 'B', 'A', 'BC', 'A', 'AD', 'B', 'BC', 'B', 'A', 'BC', 'A', 'B', 'B', 'A', 'A', 'AC', 'BD', 'B'],
    B04: ['BD', 'AD', 'B', 'AD', 'AC', 'A', 'B', 'A', 'B', 'BC', 'B', 'B', 'A', 'B', 'A', 'B', 'B', 'A', 'BC', 'AD', 'C', 'A', 'BC', 'BD', 'BC'],
    B05: ['AD', 'BD', 'BD', 'BC', 'AD', 'B', 'B', 'B', 'C', 'B', 'B', 'A', 'A', 'B', 'B', 'B', 'A', 'A', 'BD', 'B', 'A', 'A', 'BC', 'AD', 'AD'],
    B06: ['AD', 'BD', 'B', 'A', 'B', 'A', 'B', 'B', 'AD', 'A', 'B', 'B', 'A', 'B', 'A', 'A', 'BD', 'AC', 'BC', 'AD', 'AC', 'A', 'A', 'A', 'AD'],
    B07: ['AD', 'BD', 'BD', 'A', 'A', 'B', 'BD', 'B', 'B', 'A', 'B', 'B', 'B', 'BC', 'A', 'A', 'BC', 'B', 'A', 'A', 'B', 'B', 'B', 'AD', 'AC'],
    B08: ['BD', 'A', 'BC', 'BC', 'AD', 'B', 'A', 'B', 'B', 'A', 'AD', 'A', 'BC', 'A', 'A', 'B', 'B', 'B', 'B', 'BC', 'A', 'BD', 'A', 'B', 'B'],
    B09: ['AC', 'BD', 'AC', 'B', 'BD', 'A', 'A', 'A', 'B', 'B', 'BC', 'A', 'AD', 'B', 'AD', 'B', 'AD', 'BC', 'B', 'A', 'B', 'BC', 'A', 'BC', 'B'],
    B10: ['AD', 'B', 'BD', 'B', 'BC', 'BC', 'AD', 'B', 'B', 'B', 'BC', 'B', 'BC', 'BD', 'BC', 'B', 'BD', 'B', 'BC', 'B', 'B', 'B', 'BC', 'A', 'BD'],
    B11: ['AD', 'BD', 'BD', 'AD', 'A', 'B', 'A', 'B', 'BC', 'B', 'B', 'B', 'AC', 'A', 'B', 'AC', 'A', 'BC', 'A', 'BC', 'B', 'A', 'AD', 'B', 'A'],
    B12: ['AD', 'BD', 'B', 'BC', 'B', 'A', 'A', 'A', 'B', 'B', 'B', 'B', 'BC', 'AD', 'B', 'BC', 'BC', 'A', 'A', 'B', 'A', 'A', 'B', 'BC', 'B'],
};


class SerieManager {
    constructor(pNom, pNbQuestions, pCurrentQuestion, pResponses, pCorrections, pHtmlContent) {
        this.nom = pNom;
        this.nbQuestions = pNbQuestions;
        this.currentQuestion = pCurrentQuestion;
        this.responses = pResponses;
        this.corrections = pCorrections;
        this.htmlContent = pHtmlContent;
        this.timer = new Timer();
    }
    destroy() {
        this.nom = null;
        this.nbQuestions = null;
        this.currentQuestion = null;
        this.responses = null;
        this.corrections = null;
        this.htmlContent = null;
        this.timer = null
    }
    init() {
        document.body.style.background = "#fff";
        document.getElementById("home").style.display = "none";
        this.htmlContent = `
        <div class="left">
            <img src="assets/${this.nom}/${this.nom} COUV.JPG" alt="">
        </div>
        <div class="right" style="justify-content:flex-end;">
            <button id="start">Start</button>
        </div>
        `
        document.getElementById("app").innerHTML = this.htmlContent;
        document.getElementById("start").addEventListener("click", () => {
            this.next();
        });
    }

    next() {

        if (this.currentQuestion > 0) {
            let resp = '';
            if (document.getElementById("A").checked == true) resp += 'A';
            if (document.getElementById("B").checked == true) resp += 'B';
            if (document.getElementById("C").checked == true) resp += 'C';
            if (document.getElementById("D").checked == true) resp += 'D';
            this.responses[this.currentQuestion - 1] = resp;
            if (this.currentQuestion == this.nbQuestions) {
                this.timer.destroy();
                this.recap();
                return 0;
            }
        }
        let text;
        this.currentQuestion++;
        if (this.currentQuestion == this.nbQuestions) text = "Valider"; else text = "Suivant";
        this.htmlContent = `
        <div class="left">
            <img src="assets/${this.nom}/${this.nom}-${(this.currentQuestion < 10) ? '0' + this.currentQuestion : this.currentQuestion}.JPG" alt="">
        </div>
        <div class="right">
            <div class="choices">
                <div>
                    <label for="A">A</label><input type="checkbox" name="A" id="A">
                </div>
                <div>
                    <label for="B">B</label><input type="checkbox" name="B" id="B">
                </div>
                <div>
                    <label for="C">C</label><input type="checkbox" name="C" id="C">
                </div>
                <div>
                    <label for="D">D</label><input type="checkbox" name="D" id="D">
                </div>
            </div>
            <button id="next">${text}</button>
            <button id="stop">Arreter</button>
        </div>
        `
        document.getElementById("app").innerHTML = this.htmlContent;
        document.getElementById("next").addEventListener("click", () => {
            this.next();
        });
        document.getElementById("stop").addEventListener("click", () => {
            this.timer.destroy();
            this.stop();
        });
        if (this.currentQuestion == 1) {
            this.timer.start();
        }
    }

    stop() {
        this.destroy();
        document.body.style.background = "#424242";
        document.getElementById("app").innerHTML = "";
        document.getElementById("home").style.display = "flex";
    }

    recap() {
        document.body.style.background = "#424242";
        document.getElementById("app").innerHTML = `
        <div class="results">
            <h1>Resultats - Serie ${this.nom} - Temps ${pad2(this.timer.minutes)}:${pad2(this.timer.seconds)}</h1>
            <table id="result">
                
            </table>
        </div>
        <div class="right" style="margin-top: 15%;">
            <button onclick="window.print();">Save</button>
            <button id="Menu">Menu</button>
        </div>
        `;
        document.getElementById("Menu").addEventListener("click", () => {
            this.stop();
        });
        let tab = "";
        let cpt = 1;
        for (let i = 0; i < 5; i++) {
            tab += "<tr>";
            for (let j = 0; j < 5; j++) {
                tab += `<td val="${cpt}" ${(this.responses[cpt - 1] != this.corrections[cpt - 1]) ? "class='error'" : ""}>`;
                tab += cpt;
                tab += "</td>";
                cpt++;
            }
            tab += "</tr>";
        }
        document.getElementById("result").innerHTML = tab;
        let tds = document.querySelectorAll("td.error");
        for (let i = 0; i < tds.length; i++) {
            tds[i].addEventListener("click", () => {
                document.body.style.background = "#fff";
                let nb = Number(tds[i].getAttribute("val"));
                this.htmlContent = `
                    <div class="left">
                        <img src="assets/${this.nom}/${this.nom}-${(nb < 10) ? '0' + nb : nb}.JPG" alt="">
                    </div>
                    <div class="right">
                        <div class="choices">
                            <div>
                                <label for="A" ${(this.responses[nb - 1].includes("A") && !this.corrections[nb - 1].includes("A")) ? "style='color:crimson;'" : ""} ${(this.responses[nb - 1].includes("A") && this.corrections[nb - 1].includes("A")) ? "style='color:rgb(0,255,174);'" : ""}>A</label><input type="checkbox" name="A" id="A" ${(this.corrections[nb - 1].includes("A")) ? "checked" : ""}>
                            </div>
                            <div>
                                <label for="B" ${(this.responses[nb - 1].includes("B") && !this.corrections[nb - 1].includes("B")) ? "style='color:crimson;'" : ""} ${(this.responses[nb - 1].includes("B") && this.corrections[nb - 1].includes("B")) ? "style='color:rgb(0,255,174);'" : ""}>B</label><input type="checkbox" name="B" id="B" ${(this.corrections[nb - 1].includes("B")) ? "checked" : ""}>
                            </div>
                            <div>
                                <label for="C" ${(this.responses[nb - 1].includes("C") && !this.corrections[nb - 1].includes("C")) ? "style='color:crimson;'" : ""} ${(this.responses[nb - 1].includes("C") && this.corrections[nb - 1].includes("C")) ? "style='color:rgb(0,255,174);'" : ""}>C</label><input type="checkbox" name="C" id="C" ${(this.corrections[nb - 1].includes("C")) ? "checked" : ""}>
                            </div>
                            <div>
                                <label for="D" ${(this.responses[nb - 1].includes("D") && !this.corrections[nb - 1].includes("D")) ? "style='color:crimson;'" : ""} ${(this.responses[nb - 1].includes("D") && this.corrections[nb - 1].includes("D")) ? "style='color:rgb(0,255,174);'" : ""}>D</label><input type="checkbox" name="D" id="D" ${(this.corrections[nb - 1].includes("D")) ? "checked" : ""}>
                            </div>
                        </div>
                        <button id="recap">Recap</button>
                        <button id="stop">Menu</button>
                    </div>
                    `
                document.getElementById("app").innerHTML = this.htmlContent;
                document.getElementById("recap").addEventListener("click", () => {
                    this.recap();
                });
                document.getElementById("stop").addEventListener("click", () => {
                    this.stop();
                });
            });
        }
    }

    correct(nb) {
        this.htmlContent = `
        <div class="left">
            <img src="assets/${this.nom}/${this.nom}-${(nb < 10) ? '0' + nb : nb}.JPG" alt="">
        </div>
        <div class="right">
            <div class="choices">
                <div>
                    <label for="A">A</label><input type="checkbox" name="A" id="A" ${(this.corrections[nb - 1].contains("A")) ? "checked" : ""}>
                </div>
                <div>
                    <label for="B">B</label><input type="checkbox" name="B" id="B" ${(this.corrections[nb - 1].contains("B")) ? "checked" : ""}>
                </div>
                <div>
                    <label for="C">C</label><input type="checkbox" name="C" id="C" ${(this.corrections[nb - 1].contains("C")) ? "checked" : ""}>
                </div>
                <div>
                    <label for="D">D</label><input type="checkbox" name="D" id="D" ${(this.corrections[nb - 1].contains("D")) ? "checked" : ""}>
                </div>
            </div>
            <button id="recap">Recap</button>
            <button id="stop">Menu</button>
        </div>
        `
        document.getElementById("app").innerHTML = this.htmlContent;
        document.getElementById("recap").addEventListener("click", () => {
            this.recap();
        });
        document.getElementById("stop").addEventListener("click", () => {
            this.stop();
        });
    }

}

class Timer {
    constructor(pMinutes, pSeconds, pHtmlContent,pUpdateF,pState) {
        this.minutes = pMinutes;
        this.seconds = pSeconds;
        this.htmlContent = pHtmlContent;
        this.pUpdateF = pUpdateF;
        this.state = pState;
    }
    start() {
        this.minutes = 0;
        this.seconds = 0;
        this.htmlContent = `${pad2(this.minutes)}:${pad2(this.seconds)}`;
        this.state = "on";
        let box = document.createElement("div");
        box.id = "timer";
        box.style.position = "absolute";
        box.style.right = "25px";
        box.style.bottom = "25px";
        box.style.padding = "15px";
        box.style.border = "2px solid #000";
        box.style.fontSize = "22px";
        box.title = "cliquer pour pause/resume\ndouble-cliquer pour reset";
        
        box.innerHTML = this.htmlContent;
        document.getElementById("app").parentNode.appendChild(box);
        document.getElementById("timer").addEventListener("click", () => {
            if (this.state == "on")
                this.pause();
            else
                this.resume();
        });
        document.getElementById("timer").addEventListener("dblclick", () => {
            this.reset();
        });
        this.updateF = setInterval(()=>{
            this.update();
        }, 1000);
    }
    pause() {
        this.state = "off";
    }
    resume() {
        this.state = "on";
    }
    reset() {
        this.minutes = 0;
        this.seconds = -1;
        this.state = "on";
    }
    update() {
        if(this.state == "off") return;
        this.seconds++;
        if (this.seconds == 60) {
            this.seconds = 0;
            this.minutes++;
        }
        if (this.minutes == 60) {
            this.reset();
        }
        this.htmlContent = `${pad2(this.minutes)}:${pad2(this.seconds)}`;
        document.getElementById("timer").innerHTML = this.htmlContent;

    }
    destroy(){
        clearInterval(this.updateF);
        this.pause();
        let e = document.getElementById("timer");
        e.parentNode.removeChild(e);
        this.htmlContent = null;
        this.pUpdateF = null;
        this.state = null;
    }

}

function pad2(number) {
    return (number < 10 ? '0' : '') + number;
}