export const connection = {
    baseUrl: process.env.NEXT_PUBLIC_LOCAL
        ? "http://localhost:3000/api"
        : "https://clickrestaurant.vercel.app/api",
    async get(route: string) {
        const res = await fetch(this.baseUrl + route);
        return res;
    },
    async post(route: string, body: string) {
        const res = await fetch(this.baseUrl + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        return res;
    },
    async put(route: string, body: string) {
        const res = await fetch(this.baseUrl + route, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        return res;
    },
    async delete(route: string, body: string) {
        const res = await fetch(this.baseUrl + route, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        return res;
    },
};
