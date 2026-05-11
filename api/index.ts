import type { IncomingMessage, ServerResponse } from "node:http";

// @ts-expect-error — built at deploy time
import handler from "../dist/server/server.js";

export default async function (req: IncomingMessage, res: ServerResponse) {
  const protocol = (req.headers["x-forwarded-proto"] as string) ?? "https";
  const host = req.headers["x-forwarded-host"] ?? req.headers.host ?? "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const chunks: Buffer[] = [];
  await new Promise<void>((resolve) => {
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", resolve);
  });

  const body = chunks.length ? Buffer.concat(chunks) : undefined;
  const webRequest = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: body?.byteLength ? body : undefined,
  });

  const webResponse: Response = await handler.default.fetch(webRequest);

  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));
  const buffer = Buffer.from(await webResponse.arrayBuffer());
  res.end(buffer);
}
