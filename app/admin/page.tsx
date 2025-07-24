export default function page() {
    return (
        <div className="p-12 flex flex-col gap-4 h-screen w-screen">
            <div className="flex gap-6">
                <div className="bg-green-500 p-8 rounded-2xl text-white text-center shadow">
                    <p className="text-xl font-medium">
                        Income
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
                <div className="bg-red-500 p-8 rounded-2xl text-white text-center shadow">
                    <p className="text-xl font-medium">
                        Expense
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
                <div className="bg-gray-100 p-8 rounded-2xl text-primary text-center shadow border border-gray-100">
                    <p className="text-xl font-medium">
                        Balance
                    </p>
                    <h1 className="text-4xl font-bold flex">
                        <span className="text-xl">R$</span>
                        99999.99
                    </h1>
                </div>
            </div>
            <div className="flex-1 bg-gray-100">
                <div>Graph</div>
            </div>
            <div>
                <div>Food</div>
            </div>
        </div>
    );
}
