import { createFileRoute } from "@tanstack/react-router";
import { PortalApp } from "@/portal/PortalApp";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — ArabiyatLearn" },
      { name: "description", content: "Academy management, calendar and learning desk." },
    ],
  }),
  component: PortalApp,
});
