import { configureClientSIWE } from "connectkit-next-siwe";

export const siweClient = configureClientSIWE({
  apiRoutePrefix: "/api/siwe", // Your API route directory
  statement: "Sign In to Rune", // optional
});
