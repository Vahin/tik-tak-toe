import { NextRequest } from "next/server";

export const sseStream = (req: NextRequest) => {
  const responseStream = new TransformStream();

  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const write = async (data: unknown) => {
    try {
      await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    } catch (error) {
      console.error("Failed to write to stream:", error);
      writer.close();
    }
  };

  const response = new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });

  const addCloseListener = (onDisconnect: () => void) => {
    req.signal.addEventListener("abort", () => {
      onDisconnect();
    });
  };

  const disconnect = () => {
    writer.close();
  };

  return {
    response,
    write,
    disconnect,
    addCloseListener,
  };
};
