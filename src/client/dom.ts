export default class FormDom {
    constructor(
        public form = document.querySelector("form") as HTMLFormElement,
        public experiences = {
            article: this.articleSelector("experiences"),
            button: this.buttonSelector("experiences"),
            inputs: this.inputSelector("experiences"),
        },
        public formations = {
            article: this.articleSelector("formations"),
            button: this.buttonSelector("formations"),
            inputs: this.inputSelector("formations"),
        },
        public header = {
            article: this.articleSelector("header"),
            button: this.buttonSelector("header"),
            inputs: this.inputSelector("header"),
        },
        public competences = {
            article: this.articleSelector("competences"),
            button: this.buttonSelector("competences"),
            inputs: this.inputSelector("competences"),
        }
    ) {}

    articleSelector(dataType: string): HTMLElement {
        const articleElement = document.querySelector(`article[data-article="${dataType}"]`) as HTMLElement;
        if (!articleElement) {
            throw new Error(`No article element found for data-article: ${dataType}`);
        }
        return articleElement;
    }

    buttonSelector(id: keyof CvType): HTMLButtonElement {
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
