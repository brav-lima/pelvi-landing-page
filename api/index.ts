import type { IncomingMessage, ServerResponse } from "node:http";

type StartServer = { fetch: (req: Request) => Promise<Response> };

let server: StartServer | null = null;

async function getServer(): Promise<StartServer> {
  if (server) return server;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // @ts-expect-error dist/server/server.js is a build artifact with no declaration file
  const mod: any = await import("../dist/server/server.js");
  // Handle both ESM default export and CJS interop wrapper
  server = (mod.default?.fetch ? mod.default : mod) as StartServer;
  return server;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
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

  const start = await getServer();
  const webResponse = await start.fetch(webRequest);

  res.statusCode = webResponse.status;
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await webResponse.arrayBuffer()));
}
