/** @jsx h */
/** @jsxFrag Fragment */

import formFields from "@/components/Form/fields.ts";
import Fieldset from "@/components/Form/Fieldset.tsx";
import Button from "@/components/ui/Button.tsx";
import { Fragment, h } from "@land/jsx";

function Header(): JSX.Element {
    return (
        <>
            <Fieldset _legend="Coordonnees" inputs={formFields.header} id="header" />
            <Button id={"header"}>Submit</Button>
        </>
    );
}

function Competences(): JSX.Element {
    return (
        <>
            <Fieldset _legend="Competences" inputs={formFields.competences} id="competences" />
            <Button id={"competences"}>Submit</Button>
        </>
    );
}

function Experiences(): JSX.Element {
    return (
        <>
            <Fieldset _legend="Experiences" inputs={formFields.experiences} id={"experiences"} />
            <Button id="experiences">Submit</Button>
        </>
    );
}

function Formations(): JSX.Element {
    return (
        <>
            <Fieldset _legend="Formations" inputs={formFields.formations} id="formations" />
            <Button id={"formations"}>Submit</Button>
        </>
    );
}

export default {
    Header,
    Competences,
    Experiences,
    Formations,
};
