import { type NextApiRequest, type NextApiResponse } from "next";
import {
  build,
  type InlineConfig,
  type BuildResult,
  type OutputChunk,
} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Resolve the absolute path to the entry file
    const entryFile = path.join(process.cwd(), "src", "navbar", "entry.tsx");

    // Vite configuration
    const viteConfig: InlineConfig = {
      plugins: [react()],
      build: {
        rollupOptions: {
          input: entryFile,
          output: {
            format: "esm", // Output as ES module
          },
        },
        write: false, // Keep the output in memory
      },
    };

    // Run the Vite build
    const buildResult = await build(viteConfig);

    // Extract the first output chunk
    const outputChunk = buildResult.output.find(
      (chunk) => chunk.type === "chunk",
    );

    if (!outputChunk) {
      return res
        .status(500)
        .json({ error: "No output generated from the build." });
    }

    // Send the bundled JavaScript file as a response
    res.setHeader("Content-Type", "application/javascript");
    return res.status(200).send(outputChunk.code);
  } catch (error: any) {
    console.error("Vite build error:", error);
    return res.status(500).json({ error: `Build error: ${error.message}` });
  }
}
