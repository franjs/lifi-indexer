import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  CHAIN_RPC_URL: z.string().url(),
  MONGODB_URI: z.string().url(),
  BATCH_SIZE: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10)),
  START_BLOCK: z
    .string()
    .regex(/^\d+$/)
    .transform((val) => parseInt(val, 10)),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  const missingEnvVariables = result.error.issues.map((issue) =>
    issue.path.join("."),
  );
  throw new Error(
    `Missing environment variables: [${missingEnvVariables.join(", ")}]`,
  );
}

export default result.data;
