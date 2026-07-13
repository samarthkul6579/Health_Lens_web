import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Users, Mail, BookOpen, Download, Activity, LogOut, FileText, Calendar, CheckSquare } from "lucide-react";

export const dynamic = "force-dynamic";

// Server action for logout
async function handleLogout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export default async function AdminDashboardPage(props: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || session !== "authenticated_healthlens_admin_2026") {
    redirect("/admin/login");
  }

  const searchParams = await props.searchParams;
  const activeTab = searchParams.tab || "waitlist";

  // Fetch all metrics in parallel
  const [
    waitlistRes,
    contactRes,
    newsletterRes,
    demoRes,
    downloadsRes,
    eventsRes
  ] = await Promise.all([
    supabase.from("waitlist").select("*").order("created_at", { ascending: false }),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false }),
    supabase.from("demo_requests").select("*").order("created_at", { ascending: false }),
    supabase.from("downloads").select("*").order("created_at", { ascending: false }),
    supabase.from("website_events").select("*").order("created_at", { ascending: false })
  ]);

  const waitlist = waitlistRes.data || [];
  const contactMessages = contactRes.data || [];
  const newsletterSubscribers = newsletterRes.data || [];
  const demoRequests = demoRes.data || [];
  const downloads = downloadsRes.data || [];
  const websiteEvents = eventsRes.data || [];

  const stats = [
    { title: "Waitlist", count: waitlist.length, icon: <Users size={18} />, tab: "waitlist", color: "bg-blue-50 text-blue-600 border-blue-100" },
    { title: "Inquiries", count: contactMessages.length, icon: <Mail size={18} />, tab: "contact", color: "bg-purple-50 text-purple-600 border-purple-100" },
    { title: "Newsletter", count: newsletterSubscribers.length, icon: <CheckSquare size={18} />, tab: "newsletter", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
    { title: "Demo Requests", count: demoRequests.length, icon: <BookOpen size={18} />, tab: "demo", color: "bg-amber-50 text-amber-600 border-amber-100" },
    { title: "Downloads", count: downloads.length, icon: <Download size={18} />, tab: "downloads", color: "bg-rose-50 text-rose-600 border-rose-100" },
    { title: "Logged Events", count: websiteEvents.length, icon: <Activity size={18} />, tab: "events", color: "bg-zinc-100 text-zinc-700 border-zinc-200" }
  ];

  return (
    <div className="flex-grow flex flex-col">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-40 w-full bg-white border-b border-zinc-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-lg text-zinc-900 tracking-tight">
              HealthLens <span className="text-zinc-500 font-medium">Admin Console</span>
            </span>
            <span className="text-[10px] font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200 uppercase">
              Secure
            </span>
          </div>

          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 border border-red-200 bg-red-50/50 hover:bg-red-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
            >
              <LogOut size={13} />
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Main dashboard content */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full space-y-10 flex-grow flex flex-col">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((card) => (
            <Link
              key={card.tab}
              href={`/admin?tab=${card.tab}`}
              className={`p-4.5 rounded-2xl border bg-white flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all ${
                activeTab === card.tab ? "ring-2 ring-zinc-800" : ""
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-xl border ${card.color}`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">{card.title}</span>
                <strong className="text-2xl font-extrabold text-zinc-900">{card.count}</strong>
              </div>
            </Link>
          ))}
        </div>

        {/* Tab content box */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex-grow flex flex-col">
          {/* Tabs bar */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4 mb-6">
            {stats.map((t) => (
              <Link
                key={t.tab}
                href={`/admin?tab=${t.tab}`}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                  activeTab === t.tab
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                {t.title}
              </Link>
            ))}
          </div>

          {/* Tables block */}
          <div className="overflow-x-auto flex-grow flex flex-col justify-start">
            {/* Waitlist Subscriber Table */}
            {activeTab === "waitlist" && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold">Joined At</th>
                    <th className="px-4 py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {waitlist.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-zinc-400">No waitlist subscriptions logged.</td>
                    </tr>
                  ) : (
                    waitlist.map((w) => (
                      <tr key={w.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-semibold text-zinc-900">{w.name}</td>
                        <td className="px-4 py-3.5 text-zinc-600 font-medium">{w.email}</td>
                        <td className="px-4 py-3.5"><span className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-md font-bold">{w.source || "direct"}</span></td>
                        <td className="px-4 py-3.5 text-zinc-400 font-medium">{new Date(w.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-right"><span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full font-bold">{w.status || "pending"}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Contact Messages Table */}
            {activeTab === "contact" && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Sender</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Subject</th>
                    <th className="px-4 py-3 font-semibold">Message</th>
                    <th className="px-4 py-3 font-semibold">Received</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-zinc-400">No inquiry messages found.</td>
                    </tr>
                  ) : (
                    contactMessages.map((msg) => (
                      <tr key={msg.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-semibold text-zinc-900">{msg.name}</td>
                        <td className="px-4 py-3.5 text-zinc-600 font-medium">{msg.email}</td>
                        <td className="px-4 py-3.5 font-bold text-zinc-700">{msg.subject}</td>
                        <td className="px-4 py-3.5 max-w-sm text-zinc-600 leading-relaxed font-medium break-words">{msg.message}</td>
                        <td className="px-4 py-3.5 text-zinc-400 font-medium">{new Date(msg.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Newsletter Subscriber Table */}
            {activeTab === "newsletter" && (
              <table className="w-full text-left text-xs border-collapse max-w-2xl">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Subscriber Email</th>
                    <th className="px-4 py-3 font-semibold">Subscribed At</th>
                    <th className="px-4 py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletterSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-zinc-400">No newsletter subscribers yet.</td>
                    </tr>
                  ) : (
                    newsletterSubscribers.map((n) => (
                      <tr key={n.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-semibold text-zinc-900">{n.email}</td>
                        <td className="px-4 py-3.5 text-zinc-400 font-medium">{new Date(n.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-right"><span className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full font-bold">{n.status || "active"}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Demo Request Table */}
            {activeTab === "demo" && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Contact</th>
                    <th className="px-4 py-3 font-semibold">Company</th>
                    <th className="px-4 py-3 font-semibold">Preferred Date</th>
                    <th className="px-4 py-3 font-semibold">Notes</th>
                    <th className="px-4 py-3 font-semibold">Requested At</th>
                    <th className="px-4 py-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {demoRequests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-zinc-400">No demo requests logged.</td>
                    </tr>
                  ) : (
                    demoRequests.map((d) => (
                      <tr key={d.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-semibold text-zinc-900">
                          <div>{d.name}</div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{d.email} {d.phone && `| ${d.phone}`}</div>
                        </td>
                        <td className="px-4 py-3.5 font-bold text-zinc-700">{d.company}</td>
                        <td className="px-4 py-3.5 font-semibold text-amber-600"><span className="flex items-center gap-1"><Calendar size={13} /> {new Date(d.preferred_date).toLocaleDateString()}</span></td>
                        <td className="px-4 py-3.5 max-w-xs text-zinc-500 font-medium truncate" title={d.message}>{d.message || "—"}</td>
                        <td className="px-4 py-3.5 text-zinc-400 font-medium">{new Date(d.created_at).toLocaleString()}</td>
                        <td className="px-4 py-3.5 text-right"><span className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-full font-bold">{d.status || "pending"}</span></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Downloads Log Table */}
            {activeTab === "downloads" && (
              <table className="w-full text-left text-xs border-collapse max-w-2xl">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Platform</th>
                    <th className="px-4 py-3 font-semibold">Source</th>
                    <th className="px-4 py-3 font-semibold text-right">Download Time</th>
                  </tr>
                </thead>
                <tbody>
                  {downloads.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-zinc-400">No download attempts recorded.</td>
                    </tr>
                  ) : (
                    downloads.map((dl) => (
                      <tr key={dl.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-bold text-zinc-900 flex items-center gap-1.5"><Download size={14} className="text-zinc-400" /> {dl.platform}</td>
                        <td className="px-4 py-3.5 text-zinc-600 font-semibold">{dl.source || "coming_soon"}</td>
                        <td className="px-4 py-3.5 text-right text-zinc-400 font-medium">{new Date(dl.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* Analytics Event Logs Table */}
            {activeTab === "events" && (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-500 border-b border-zinc-200">
                    <th className="px-4 py-3 font-semibold">Event Type</th>
                    <th className="px-4 py-3 font-semibold">Metadata / Payload</th>
                    <th className="px-4 py-3 font-semibold">Channel</th>
                    <th className="px-4 py-3 font-semibold text-right">Event Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {websiteEvents.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">No events logged.</td>
                    </tr>
                  ) : (
                    websiteEvents.map((ev) => (
                      <tr key={ev.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                        <td className="px-4 py-3.5 font-bold text-zinc-900"><span className="flex items-center gap-1.5"><Activity size={14} className="text-zinc-400" /> {ev.event_type}</span></td>
                        <td className="px-4 py-3.5 max-w-md font-mono text-[10px] text-zinc-500 truncate" title={JSON.stringify(ev.payload)}>{JSON.stringify(ev.payload)}</td>
                        <td className="px-4 py-3.5 font-medium text-zinc-600">{ev.source || "website"}</td>
                        <td className="px-4 py-3.5 text-right text-zinc-400 font-medium">{new Date(ev.created_at).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
