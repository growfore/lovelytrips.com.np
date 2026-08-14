import { apiFetch } from "@/lib/api";
import ContactForm from "@/components/booking-form";

export const revalidate = 3600;


export default async function BookingPage() {
  const res = await apiFetch(
    `/activity?page=1&limit=100`,
    { cache: "force-cache" },
  );

  const json = await res.json();

  const packages = json?.data;

  // const packageTitles = packages.map(p => p?.title)

  const sortedPackages = [...packages].sort(
    (a: { title: string }, b: { title: string }) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );

  return <div className="pt-12">
    <ContactForm packages={sortedPackages} />;
  </div>
}
