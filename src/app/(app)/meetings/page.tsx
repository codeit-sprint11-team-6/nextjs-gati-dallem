import HeroBanner from "@/components/meeting/list/HeroBanner";
import MeetingsPageClient from "@/components/meeting/list/MeetingsPageClient";
import CreateMeetingButton from "@/components/meeting/create/CreateMeetingButton";

export default function MeetingsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <HeroBanner />

      <div className="mt-8">
        <MeetingsPageClient />
      </div>

      <CreateMeetingButton />
    </main>
  );
}