interface FormSubmitProps {
    isLoading: boolean;
    text: string;
}

export function FormSubmit({
    isLoading,
    text,
}: FormSubmitProps) {
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
