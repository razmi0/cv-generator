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
import FormDom from "./dom.ts";
import Ls from "./storage.ts";
console.log("form script loaded");
const dom = new FormDom();
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
const fetchPayload = () => __awaiter(void 0, void 0, void 0, function* () {
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
const onFormSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
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
