import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, signIn, signOut } from "@/api/auth";
import { loginAdmin, logoutAdmin } from "@/auth/ProtectedRoute";
import type { AdminSession } from "@/auth/ProtectedRoute";

export const authKeys = {
  user: () => ["auth", "user"] as const,
};

export function useAuth() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    onSuccess: (session) => {
      loginAdmin(session);
      queryClient.setQueryData(authKeys.user(), session);
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      logoutAdmin();
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.clear();
      window.location.href = "/dashboard/login";
    },
  });
}