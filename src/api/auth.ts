import { supabase } from "@/lib/supabase";
import type { AdminSession } from "@/auth/ProtectedRoute";

export const signIn = async (email: string, password: string): Promise<AdminSession> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("Authentication failed");

  return {
    email: data.user.email || "",
    name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "Admin",
    loginAt: new Date().toISOString(),
  };
};

export const signOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const getCurrentUser = async (): Promise<AdminSession | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;

  return {
    email: data.user.email || "",
    name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "Admin",
    loginAt: data.user.last_sign_in_at || new Date().toISOString(),
  };
};