import { WebSocketServer } from "ws";
import prismaClient from "db/client";
import dotenv from "dotenv";
dotenv.config({path:'../../packages/db/.env'});

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("client connected");

  ws.on("message", async (data) => {
    const message = data.toString();
    console.log("received:", message);

    try {
      const parsed = JSON.parse(message);

      if (parsed.type === "create-user") {
        const user = await prismaClient.user.create({
          data: {
            username: parsed.username,
            password: parsed.password
          }
        });
        ws.send(JSON.stringify({ type: "user-created", user }));
      } else {
        ws.send(JSON.stringify({ type: "echo", message }));
      }
    } catch (err) {
      ws.send(JSON.stringify({ type: "error", error: err.message }));
    }
  });

  ws.on("close", () => {
    console.log("client disconnected");
  });
});

console.log("ws server listening on port 8080");
console.log("Database URL:", process.env.DATABASE_URL);
