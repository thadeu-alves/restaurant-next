export function Loading({ loading }: { loading: boolean }) {
    return <>{loading && <div>Loading...</div>}</>;
}
