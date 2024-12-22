// Client script
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("form script loaded");
class Dom {
    constructor(form = document.querySelector("form"), experiences = {
        button: this.buttonSlector("experiences"),
        inputs: this.inputSelector("experiences"),
    }, formations = {
        button: this.buttonSlector("formations"),
        inputs: this.inputSelector("formations"),
    }, header = {
        button: this.buttonSlector("header"),
        inputs: this.inputSelector("header"),
    }, competences = {
        button: this.buttonSlector("competences"),
        inputs: this.inputSelector("competences"),
    }) {
        this.form = form;
        this.experiences = experiences;
        this.formations = formations;
        this.header = header;
        this.competences = competences;
    }
    buttonSlector(id) {
        const buttonElement = document.querySelector(`button#${id}`);
        if (!buttonElement) {
            throw new Error(`No button element found for id: ${id}`);
        }
        return buttonElement;
    }
    inputSelector(id) {
        const inputElements = Array.from(document.querySelectorAll(`fieldset#${id} input`));
        if (inputElements.length === 0) {
            throw new Error(`No input elements found for id: ${id}`);
        }
        return inputElements;
    }
}
class Ls {
    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static load(key, fallback = "{}") {
        return JSON.parse(localStorage.getItem(key) || fallback);
    }
}
const dom = new Dom();
// for each section of the form, when the user clicks on the submit button, we store the data in the local storage as json
const buildData = (inputs) => inputs.reduce((acc, input) => {
    acc[input.name] = input.value;
    return acc;
}, {});
const buildPayload = () => {
    return {
        header: Ls.load("header"),
        competences: Ls.load("competences"),
        experiences: Ls.load("experiences"),
        formations: Ls.load("formations"),
    };
};
const fetchPayload = () => __awaiter(this, void 0, void 0, function* () {
    const data = buildPayload();
    return yield fetch(dom.form.action, {
        method: dom.form.method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
});
const onFieldsetSubmit = (inputs, id) => {
    const data = buildData(inputs);
    if (id === "header" || id === "competences") {
        Ls.save(id, data);
        return;
    }
    // experence and formations are array of objects
    Ls.save(id, [...Ls.load(id, "[]"), data]);
};
const onFormSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
    e.preventDefault();
    const response = yield fetchPayload();
    if (!response.ok) {
        const code = response.status;
        switch (code) {
            case 400: {
                const errors = yield response.json();
                console.log(errors);
                break;
            }
            default:
                alert("An error occured");
        }
    }
});
dom.form.addEventListener("submit", onFormSubmit);
[dom.competences, dom.header, dom.formations, dom.experiences].forEach(({ inputs, button }) => {
    button.addEventListener("click", () => onFieldsetSubmit(inputs, button.id));
});
// we handle the form submission by extracting the data from the local storage and sending it to the server as a big object
