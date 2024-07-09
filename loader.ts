"use client";

export default function myImageLoader({
    src,
    width,
    quality,
}: { src: string; width?: string; quality?: string }) {
    const isLocal = !src.startsWith("http");
    const isUserContent = src.includes("mdusercontent.com");
    const query = new URLSearchParams();

    const imageOptimizationApi = "https://i.mikandev.com/image";
    const baseUrl = "https://mikn.dev";

    const fullSrc = `${baseUrl}${src}`;

    if (width) query.set("width", width);
    if (quality) query.set("quality", quality);

    if (isLocal && process.env.NODE_ENV === "development") {
        return src;
    }
    if (isLocal) {
        return `${imageOptimizationApi}/${fullSrc}?${query.toString()}`;
    }
    if (isUserContent) {
        return src;
    }
    return `${imageOptimizationApi}/${src}?${query.toString()}`;
}
