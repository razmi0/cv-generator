// Client script

import FormDom from "./dom.ts";
import Ls from "./storage.ts";

console.log("form script loaded");

const dom = new FormDom();

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
    return await fetch(dom.form.action, {
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

const onFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const response = await fetchPayload();

    if (!response.ok) {
        const code = response.status;

        switch (code) {
            case 400: {
                const errors = await response.json();
                console.log(errors);
                break;
            }
            default:
                alert("An error occured");
        }
    }
};

dom.form.addEventListener("submit", onFormSubmit);
[dom.competences, dom.header, dom.formations, dom.experiences].forEach(({ inputs, button }) => {
    button.addEventListener("click", () => onFieldsetSubmit(inputs, button.id as keyof CvType));
});

// we handle the form submission by extracting the data from the local storage and sending it to the server as a big object
