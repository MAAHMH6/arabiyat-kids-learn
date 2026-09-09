import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);
      const admin = (data ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      return admin;
    } catch {
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (cancelled) return;
        setSession(data.session);
        const currentUser = data.session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          await fetchRole(currentUser.id);
        } else {
          setIsAdmin(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void init();

    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, s) => {
      if (cancelled) return;
      setSession(s);
      const currentUser = s?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await fetchRole(currentUser.id);
      } else {
        setIsAdmin(false);
      }
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { session, user, isAdmin, loading, signOut };
}
