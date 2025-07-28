interface FormLabelProps {
    titulo: string;
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

export function FormLabel({
    titulo,
    handleChange,
    label,
    value,
    type,
    required,
}: FormLabelProps) {
    return (
        <div>
            <label
                htmlFor={titulo}
                className="block text-sm font-medium text-[var(--primary)]"
            >
                {label}
            </label>
            <input
                type={type || "text"}
                id={titulo}
                name={titulo}
                value={value}
                onChange={handleChange}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
        </div>
    );
}
