export default class FormDom {
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
