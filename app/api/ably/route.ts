import { verifySession } from "@/server/session";
import Ably from "ably";

export const revalidate = "0";

export async function GET() {
  const { userId } = await verifySession();
  const client = new Ably.Rest(process.env.ABLY_API_KEY ?? "");
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: userId.toString(),
  });
  return Response.json(tokenRequestData);
}
