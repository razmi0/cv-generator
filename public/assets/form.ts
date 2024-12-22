// Client script

console.log("form script loaded");

class Dom {
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

class Ls {
    static save(key: keyof CvType, value: ExperiencesType[] | HeaderType | CompetencesType | FormationsType[]) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static load(key: keyof CvType, fallback: string = "{}") {
        return JSON.parse(localStorage.getItem(key) || fallback);
    }
}

const dom = new Dom();

// for each section of the form, when the user clicks on the submit button, we store the data in the local storage as json

const buildData = (inputs: HTMLInputElement[]) =>
    inputs.reduce((acc, input) => {
        acc[input.name] = input.value;
        return acc;
    }, {} as Record<string, string | string[]>);

const buildPayload = (): CvType => {
    return {
        header: Ls.load("header"),
        competences: Ls.load("competences"),
        experiences: Ls.load("experiences"),
        formations: Ls.load("formations"),
    };
};

const fetchPayload = async () => {
    const data = buildPayload();
    await fetch(dom.form.action, {
        method: dom.form.method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const onFieldsetSubmit = (inputs: HTMLInputElement[], id: keyof CvType) => {
    const data = buildData(inputs);
    if (id === "header" || id === "competences") {
        Ls.save(id, data as HeaderType | CompetencesType);
        return;
    }
    // experence and formations are array of objects
    Ls.save(id, [...Ls.load(id, "[]"), data]);
};

const onFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    fetchPayload();
};

dom.form.addEventListener("submit", onFormSubmit);
[dom.competences, dom.header, dom.formations, dom.experiences].forEach(({ inputs, button }) => {
    button.addEventListener("click", () => onFieldsetSubmit(inputs, button.id as keyof CvType));
});

// we handle the form submission by extracting the data from the local storage and sending it to the server as a big object
