import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-3xl mb-8">Settings</h1>
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <div><Label>Store Name</Label><Input defaultValue="H.A Collection" /></div>
        <div><Label>Contact Email</Label><Input defaultValue="hello@hacollection.id" /></div>
        <div><Label>WhatsApp Number</Label><Input defaultValue="+62 812-3456-7890" /></div>
        <div><Label>About</Label><Textarea rows={4} defaultValue="Curated hijabs and abayas for the modern woman." /></div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
