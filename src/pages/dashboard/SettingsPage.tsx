import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSaveSettings, useSettings } from "@/hooks/use-settings";

export function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const saveSettings = useSaveSettings();
  const [form, setForm] = useState({
    adminWhatsApp: "",
    shopeeStoreUrl: "",
    shopeeUrl: "",
    tiktokUrl: "",
    instagramUrl: "",
    facebookUrl: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        adminWhatsApp: settings.adminWhatsApp,
        shopeeStoreUrl: settings.shopeeStoreUrl,
        shopeeUrl: settings.shopeeUrl || "",
        tiktokUrl: settings.tiktokUrl || "",
        instagramUrl: settings.instagramUrl || "",
        facebookUrl: settings.facebookUrl || "",
      });
    }
  }, [settings]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSettings.mutate(form, {
      onSuccess: () => toast.success("Settings saved"),
    });
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl">Store Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update global contact variables used across the store.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Configuration</CardTitle>
          <CardDescription>
            These values are stored locally for this demo and can be connected to your API later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5 p-1 sm:p-2" onSubmit={submit}>
            <div className="space-y-2">
              <Label htmlFor="admin-whatsapp">Admin WhatsApp Number</Label>
              <Input
                id="admin-whatsapp"
                disabled={isLoading}
                value={form.adminWhatsApp}
                onChange={(event) => setForm({ ...form, adminWhatsApp: event.target.value })}
                placeholder="+62 812 3456 7890"
              />
            </div>
<div className="space-y-2">
              <Label htmlFor="shopee-url">Main Shopee Store URL</Label>
              <Input
                id="shopee-url"
                disabled={isLoading}
                value={form.shopeeStoreUrl}
                onChange={(event) => setForm({ ...form, shopeeStoreUrl: event.target.value })}
                placeholder="shopee.co.id/hacollection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopee-link">Shopee Link</Label>
              <Input
                id="shopee-link"
                disabled={isLoading}
                value={form.shopeeUrl}
                onChange={(event) => setForm({ ...form, shopeeUrl: event.target.value })}
                placeholder="https://shopee.co.id/hacollection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tiktok-link">TikTok Link</Label>
              <Input
                id="tiktok-link"
                disabled={isLoading}
                value={form.tiktokUrl}
                onChange={(event) => setForm({ ...form, tiktokUrl: event.target.value })}
                placeholder="https://tiktok.com/@hacollection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-link">Instagram Link</Label>
              <Input
                id="instagram-link"
                disabled={isLoading}
                value={form.instagramUrl}
                onChange={(event) => setForm({ ...form, instagramUrl: event.target.value })}
                placeholder="https://instagram.com/hacollection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook-link">Facebook Link</Label>
              <Input
                id="facebook-link"
                disabled={isLoading}
                value={form.facebookUrl}
                onChange={(event) => setForm({ ...form, facebookUrl: event.target.value })}
                placeholder="https://facebook.com/hacollection"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#1f2e4f] hover:bg-[#1f2e4f]/90"
              disabled={saveSettings.isPending}
            >
              {saveSettings.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
