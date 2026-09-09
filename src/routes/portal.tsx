import { createFileRoute } from "@tanstack/react-router";
import { PortalApp } from "@/portal/PortalApp";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Academy Management Suite & Calendar — ArabiyatLearn" },
      {
        name: "description",
        content: "Director suite, teacher management, academy calendar, and student homework portal.",
      },
    ],
  }),
  component: PortalApp,
});
