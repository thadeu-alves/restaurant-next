interface FormLabelProps {
    title: string;
    handleChange: (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => void;
    label: string;
    value: string;
    type?: string;
    required?: boolean;
}

interface FormSubmitProps {
    isLoading: boolean;
    text: string;
}

export const Form = {
    Container: FormContainer,
    Title: FormTitle,
    Label: FormLabel,
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

function FormLabel({
    title,
    handleChange,
    label,
    value,
    type,
    required,
}: FormLabelProps) {
    return (
        <div>
            <label
                htmlFor={title}
                className="block text-sm font-medium text-[var(--primary)]"
            >
                {label}
            </label>
            <input
                type={type || "text"}
                id={title}
                name={title}
                value={value}
                onChange={handleChange}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
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
