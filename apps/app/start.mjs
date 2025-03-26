import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Define __dirname globally
global.__dirname = dirname(fileURLToPath(import.meta.url));

// Dynamically import your built server
import("./build/index.js");
