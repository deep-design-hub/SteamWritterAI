import {
  convertToModelMessages,
  isStepCount,
  streamText,
  type UIMessage,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";

import type { AIProvider } from "@/types";
import { buildSystemPrompt } from "./prompts";
import { agentTools } from "./tools";
import type { AgentContext } from "./types";
import { getModelConfig } from "@/store/useModelStore";

function resolveModel(provider: Exclude<AIProvider, "ensemble">) {
  if (provider === "openai") {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(
        "OPENAI_API_KEY is not configured. Add it to .env.local — see .env.example."
      );
    }
    return openai(process.env.OPENAI_MODEL || "gpt-4o");
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY is not configured. Add it to .env.local — see .env.example."
    );
  }
  return anthropic(process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5");
}

export function getConfiguredProviders(): AIProvider[] {
  const providers: AIProvider[] = [];
  const config = getModelConfig();
  if (process.env.OPENAI_API_KEY && config.openai.enabled) providers.push("openai");
  if (process.env.ANTHROPIC_API_KEY && config.anthropic.enabled) providers.push("anthropic");
  if (providers.length >= 2) providers.push("ensemble");
  return providers;
}

function getEnabledProviders(): Exclude<AIProvider, "ensemble">[] {
  const config = getModelConfig();
  const providers: Exclude<AIProvider, "ensemble">[] = [];
  if (process.env.OPENAI_API_KEY && config.openai.enabled) providers.push("openai");
  if (process.env.ANTHROPIC_API_KEY && config.anthropic.enabled) providers.push("anthropic");
  return providers;
}

export async function runAgent({
  messages,
  context,
}: {
  messages: unknown[];
  context: AgentContext;
}) {
  const modelMessages = await convertToModelMessages(messages as UIMessage[], {
    ignoreIncompleteToolCalls: true,
  });

  if (context.model === "ensemble") {
    const enabled = getEnabledProviders();
    if (enabled.length === 0) {
      throw new Error("No AI providers are enabled. Ask an administrator to enable at least one model in Admin > AI Models.");
    }
    if (enabled.length === 1) {
      return streamText({
        model: resolveModel(enabled[0]),
        instructions: buildSystemPrompt(context),
        messages: modelMessages,
        tools: agentTools,
        stopWhen: isStepCount(4),
        temperature: 0.7,
        maxRetries: 2,
      });
    }
    const primary = enabled[0];
    return streamText({
      model: resolveModel(primary),
      instructions: buildSystemPrompt(context),
      messages: modelMessages,
      tools: agentTools,
      stopWhen: isStepCount(4),
      temperature: 0.7,
      maxRetries: 2,
    });
  }

  const model = resolveModel(context.model as Exclude<AIProvider, "ensemble">);
  return streamText({
    model,
    instructions: buildSystemPrompt(context),
    messages: modelMessages,
    tools: agentTools,
    stopWhen: isStepCount(4),
    temperature: 0.7,
    maxRetries: 2,
  });
}
