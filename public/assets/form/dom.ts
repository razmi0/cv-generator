export default class FormDom {
    constructor(
        public form = document.querySelector("form") as HTMLFormElement,
        public experiences = {
            button: this.buttonSlector("experiences"),
            inputs: this.inputSelector("experiences"),
        },
        public formations = {
            button: this.buttonSlector("formations"),
            inputs: this.inputSelector("formations"),
        },
        public header = {
            button: this.buttonSlector("header"),
            inputs: this.inputSelector("header"),
        },
        public competences = {
            button: this.buttonSlector("competences"),
            inputs: this.inputSelector("competences"),
        }
    ) {}

    buttonSlector(id: keyof CvType): HTMLButtonElement {
        const buttonElement = document.querySelector(`button#${id}`) as HTMLButtonElement;
        if (!buttonElement) {
            throw new Error(`No button element found for id: ${id}`);
        }
        return buttonElement;
    }

    inputSelector(id: keyof CvType): HTMLInputElement[] {
        const inputElements = Array.from(document.querySelectorAll(`fieldset#${id} input`)) as HTMLInputElement[];
        if (inputElements.length === 0) {
            throw new Error(`No input elements found for id: ${id}`);
        }
        return inputElements;
    }
}
