/** @jsx h */

import Input from "@/components/Form/Input.tsx";
import { h } from "@land/jsx";

type InputGroup = {
    label: string;
    id: string;
    name: string;
}[];

type FieldsetProps = {
    _legend: string;
    inputs: InputGroup;
    children?: JSX.Element;
    id?: keyof CvType;
};

export default function Fieldset({ _legend, inputs, children, id }: FieldsetProps) {
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
