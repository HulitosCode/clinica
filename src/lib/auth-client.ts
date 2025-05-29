import { customSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "./auth";

export const authClient = createAuthClient({
  // Chamamos o plugin customSession da nossa auth para poder renderizar os dados no frontend na dashboard
  plugins: [customSessionClient<typeof auth>()],
});
