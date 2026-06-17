import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const AI_PROXY_TIMEOUT_MS = 300000;
const REQUEST_HEADERS = ["authorization", "content-type", "accept", "openai-beta"];
const RESPONSE_HEADERS = ["content-type", "content-disposition", "cache-control"];

export async function GET(request: NextRequest) {
    return proxyAiRequest(request);
}

export async function POST(request: NextRequest) {
    return proxyAiRequest(request);
}

export async function PUT(request: NextRequest) {
    return proxyAiRequest(request);
}

export async function PATCH(request: NextRequest) {
    return proxyAiRequest(request);
}

export async function DELETE(request: NextRequest) {
    return proxyAiRequest(request);
}

async function proxyAiRequest(request: NextRequest) {
    const target = new URL(request.url).searchParams.get("target") || "";
    let url: URL;
    try {
        url = new URL(target);
    } catch {
        return new Response("Invalid AI proxy target", { status: 400 });
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") return new Response("Unsupported AI proxy target", { status: 400 });

    const headers = new Headers();
    REQUEST_HEADERS.forEach((key) => {
        const value = request.headers.get(key);
        if (value) headers.set(key, value);
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), AI_PROXY_TIMEOUT_MS);
    try {
        const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.arrayBuffer();
        const response = await fetch(url, {
            method: request.method,
            headers,
            body: body?.byteLength ? body : undefined,
            signal: controller.signal,
        });
        return new Response(response.body, {
            status: response.status,
            headers: responseHeaders(response.headers),
        });
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return new Response("AI proxy timeout", { status: 504 });
        return new Response(error instanceof Error ? error.message : "AI proxy error", { status: 502 });
    } finally {
        clearTimeout(timer);
    }
}

function responseHeaders(headers: Headers) {
    const result = new Headers();
    RESPONSE_HEADERS.forEach((key) => {
        const value = headers.get(key);
        if (value) result.set(key, value);
    });
    return result;
}
