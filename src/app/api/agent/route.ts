import { runAgent, getConfiguredProviders } from "@/lib/agent/agent";
import type { AgentRequestBody } from "@/lib/agent/types";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function POST(req: Request) {
  let body: AgentRequestBody;
  try {
    body = (await req.json()) as AgentRequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body?.messages ?? [];
  const context = body?.context;

  if (!context?.topic?.trim()) {
    return Response.json(
      { error: "Missing research topic in context." },
      { status: 400 }
    );
  }

  try {
    const result = await runAgent({ messages, context });
    return result.toUIMessageStreamResponse();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Agent configuration error.";
    return Response.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ providers: getConfiguredProviders() });
}
