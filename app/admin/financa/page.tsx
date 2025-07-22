import { TransactionForm } from "@/app/componets/TransactionForm";
import { TransactionTable } from "@/app/componets/TransactionTable";

export default function page() {
    return (
        <div className="flex flex-1 justify-center items-center p-12">
            <TransactionForm />
            <TransactionTable />
        </div>
    );
}
