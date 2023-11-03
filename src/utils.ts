export async function readFromUrl(url: string): Promise<string> {
    let text: string = await fetch(url).then(response => response.text());
    return text;
}