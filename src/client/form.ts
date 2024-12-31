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

// const buildPayload = (): CvType => {
//     return {
//         header: Ls.load("header"),
//         competences: Ls.load("competences"),
//         experiences: Ls.load("experiences"),
//         formations: Ls.load("formations"),
//     };
// };

// const fetchPayload = async () => {
//     const data = buildPayload();
//     return await fetch(dom.form.action, {
//         method: dom.form.method,
//         body: JSON.stringify(data),
//         headers: {
//             "Content-Type": "application/json",
//         },
//     });
// };

const onFieldsetSubmit = async (inputs: HTMLInputElement[], id: keyof CvType) => {
    // we build the data from the inputs
    const data = buildData(inputs);

    try {
        // we send the data to the server to the corresponding endpoint
        const response = await fetch(dom.form.action + `/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // we get the response from the server
        const json = (await response.json()) as keyof CvType;

        if (!response.ok) {
            alert("An error occured");
            console.log(json);
            return;
        }

        // if the response is ok, we store the data in the local storage
        if (id === "header" || id === "competences") {
            Ls.save(id, data as HeaderType | CompetencesType);
        } else {
            // experence and formations are array of objects
            Ls.save(id, [...Ls.load(id, "[]"), data]);
        }

        if (id === "header") {
            dom.header.article.classList.add("hidden");
            dom.competences.article.classList.remove("hidden");
        } else if (id === "competences") {
            dom.competences.article.classList.add("hidden");
            dom.experiences.article.classList.remove("hidden");
        } else if (id === "experiences") {
            dom.experiences.article.classList.add("hidden");
            dom.formations.article.classList.remove("hidden");
        } else if (id === "formations") {
            dom.formations.article.classList.add("hidden");
        }

        console.log(json);
    } catch (error) {
        console.error(error);
    }
};

// const onFormSubmit = async (e: SubmitEvent) => {
//     e.preventDefault();
//     const response = await fetchPayload();

//     if (!response.ok) {
//         const code = response.status;

//         switch (code) {
//             case 400: {
//                 const errors = await response.json();
//                 console.log(errors);
//                 break;
//             }
//             default:
//                 alert("An error occured");
//         }
//     }
// };

// dom.form.addEventListener("submit", onFormSubmit);
[dom.competences, dom.header, dom.formations, dom.experiences].forEach(({ inputs, button }) => {
    button.addEventListener("click", () => onFieldsetSubmit(inputs, button.id as keyof CvType));
});

// we handle the form submission by extracting the data from the local storage and sending it to the server as a big object
