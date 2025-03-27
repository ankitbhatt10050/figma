import { Liveblocks } from "@liveblocks/node";
import { env } from "~/env";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const liveblocks = new Liveblocks({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  secret: env.LIVEBLOCKS_SECRET_KEY,
});

export async function POST(req: Request) {
  const userSession = await auth();

  const user = await db.user.findUniqueOrThrow({
    where: { id: userSession?.user.id },
  });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name: user.name ?? "Anonymous",
    },
  });

  session.allow(`room:${"test"}`, session.FULL_ACCESS);

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
