export async function GET(request: Request) {
    return new Response("Hello", {
        headers: {
            "content-type": "text/html; charset=UTF-8",
        },
    });
}
