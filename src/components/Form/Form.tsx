/**
 * @jsx h
 */
import { h } from "@land/jsx";

export type FormProps = {
    method: Uppercase<"get" | "post">;
    action: `/${string}`;
    children: JSX.Element;
    className?: string;
};

export default function Form({ children, className, action, method }: FormProps) {
    return (
        <form method={method} action={action} class={className}>
            {children}
        </form>
    );
}
