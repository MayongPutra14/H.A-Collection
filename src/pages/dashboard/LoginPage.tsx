import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/auth/ProtectedRoute";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !email.trim().includes("@")) {
      setError("Please enter a valid admin email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setPending(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    loginAdmin({
      email: email.trim(),
      name: email.trim().split("@")[0] || "Admin",
      loginAt: new Date().toISOString(),
    });

    navigate("/dashboard/overview", { replace: true });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/30 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-4xl text-primary">H.A Admin</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to manage your store.</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-card border border-border rounded-2xl p-6 shadow-soft space-y-5"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="admin@hacollection.id"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-10"
                />
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-[#1f2e4f] hover:bg-[#1f2e4f]/90"
            disabled={pending}
          >
            {pending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
