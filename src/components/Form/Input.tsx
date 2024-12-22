/** @jsx h */

import { h } from "@land/jsx";

export type InputProps = {
    id: string;
    type?: string;
    label: string;
    name: string;
};
export default function Input({ id, type, label, name }: InputProps) {
    return (
        <div role="group">
            <label style="width : 20ch;" for={id}>
                {label}
            </label>
            <input type={type || "text"} id={id} name={name} />
        </div>
    );
}
