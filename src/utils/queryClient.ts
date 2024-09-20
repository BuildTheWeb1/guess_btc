import { generateClient } from "@aws-amplify/api";

export const queryClient = generateClient({ authMode: "apiKey" });
