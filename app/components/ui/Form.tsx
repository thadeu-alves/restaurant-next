import { JSX } from "react";
import {
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

interface FormLabelProps<TFieldValue extends FieldValues> {
    title: Path<TFieldValue>;
    register: UseFormRegister<TFieldValue>;
    label: string;
    type?: string;
    required?: boolean;
    error?: string;
}

interface FormSubmitProps {
    isLoading: boolean;
    text: string;
}

export const Form = {
    Container: FormContainer,
    Title: FormTitle,
    Label: FormLabel as <TFieldValue extends FieldValues>(
        props: FormLabelProps<TFieldValue>
    ) => JSX.Element,
    Submit: FormSubmit,
};

function FormContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
            {children}
        </div>
    );
}

function FormTitle({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <h2 className="text-xl font-semibold mb-4">
            {children}
        </h2>
    );
}

function FormLabel<TFieldValue extends FieldValues>({
    title,
    register,
    label,
    type = "text",
    required = false,
    error,
}: FormLabelProps<TFieldValue>) {
    const inputProps = register
        ? register(title, {
              required: required && `${label} is required`,
          })
        : { name: title };

    return (
        <div>
            <label
                htmlFor={title}
                className="block text-sm font-medium text-[var(--primary)]"
            >
                {label}
                {required && (
                    <span className="text-red-500"> *</span>
                )}
            </label>
            <input
                type={type}
                id={title}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border ${
                    error ? "border-red-500" : ""
                }`}
                {...inputProps}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

function FormSubmit({ isLoading, text }: FormSubmitProps) {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--primary)]  text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
        >
            {isLoading ? "Adding..." : text}
        </button>
    );
}
