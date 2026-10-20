
export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Growa bot is running", {
      status: 200,
    });
  }

  const token = Netlify.env.get("TELEGRAM_BOT_TOKEN");

  if (!token) {
    return new Response("Bot token is not configured", {
      status: 500,
    });
  }

  const update = await request.json();
  const message = update.message;

  if (!message?.text || message.text !== "/start") {
    return new Response("OK", { status: 200 });
  }

  const text =
    "🌱 Selamat datang di Growa!\n\n" +
    "Setiap pertumbuhan besar dimulai dari langkah kecil.\n\n" +
    "Di Growa, kamu bisa menetapkan tujuan, membangun kebiasaan positif, dan melihat perkembanganmu setiap hari.\n\n" +
    "Siap mulai bertumbuh? 🚀";

  await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: message.chat.id,
        text,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🌱 Buka Growa",
                url: "https://growa.page.gd/",
              },
            ],
          ],
        },
      }),
    }
  );

  return new Response("OK", { status: 200 });
};
