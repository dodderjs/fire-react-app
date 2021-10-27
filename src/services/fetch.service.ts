export async function fetchJSON(url: string, options?: any): Promise<any> {
    try {
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error('Not on TMDB');
        }
        return await response.json()
    } catch (e) {
        console.error(e);
        throw e;
    }
}
