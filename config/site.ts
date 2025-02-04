export const siteConfig = {
  metadataBase: new URL("https://app.hackcanada.org"),
  title: "Hack Canada",
  description:
    "First hackathon Hosted by Hackathons Canada, the biggest hacker community in Canada of 3000 members.",
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
        width: 1500,
        height: 1000,
        alt: "Hack Canada",
      },
    ],
  },
  keywords: [
    "hackathon",
    "canada",
    "programming",
    "coding",
    "hackers",
    "technology",
    "innovation",
  ],
};

export const discordInviteUrl = "https://discord.gg/your-invite-link";

export const eventDate = new Date("2025-02-21T16:30:00-05:00");
