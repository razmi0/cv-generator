/** @jsx h */

import formfields from "@/components/Form/fields.ts";
import Input from "@/components/Form/Input.tsx";
import { h } from "@land/jsx";
type InputGroup = {
    label: string;
    id: string;
    name: string;
}[];

type FieldsetProps<T extends keyof CvType> = {
    _legend: string;
    inputs: T extends "header"
        ? typeof formfields.header
        : T extends "competences"
        ? typeof formfields.competences
        : T extends "experiences"
        ? typeof formfields.experiences
        : T extends "formations"
        ? typeof formfields.formations
        : never;
    children?: JSX.Element;
    id: T;
};

export default function Fieldset<T extends keyof CvType>({
    _legend,
    inputs,
    children,
    id,
}: FieldsetProps<T>): JSX.Element {
    return (
        <fieldset id={id}>
            <legend>{_legend}</legend>
            {inputs.map((input) => (
                <Input {...input} />
            ))}
            {children}
        </fieldset>
    );
}
