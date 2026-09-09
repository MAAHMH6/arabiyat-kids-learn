import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginScreen } from "@/portal/components/auth/LoginScreen";
import { useApp } from "@/portal/context/AppContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Academy & Parent Login — ArabiyatLearn" },
      {
        name: "description",
        content: "Log in to ArabiyatLearn Academy Portal for directors, teachers, and parents.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      void navigate({ to: "/portal" });
    }
  }, [currentUser, navigate]);

  return (
    <LoginScreen
      onBackToLanding={() => {
        void navigate({ to: "/" });
      }}
    />
  );
}
