import { supabase } from "@/integrations/supabase/client";

export interface DashboardMetrics {
  totalRevenue: number;
  bookingRevenue: number;
  coachingRevenue: number;
  activeMembers: number;
  inactiveMembers: number;
  trialUsers: number;
  trialConversionRate: number;
  cancelledBookings: number;
  refundedTransactions: number;
  revenueByVenue: { venue: string; revenue: number }[];
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  // Revenue aggregations
  const { data: revenueRows, error: revenueError } = await supabase
    .from("transactions")
    .select("type, amount")
    .eq("status", "Success");

  if (revenueError) throw revenueError;

  const totalRevenue =
    revenueRows?.reduce((s, r) => s + Number(r.amount), 0) || 0;

  const bookingRevenue =
    revenueRows
      ?.filter(r => r.type === "Booking")
      .reduce((s, r) => s + Number(r.amount), 0) || 0;

  const coachingRevenue =
    revenueRows
      ?.filter(r => r.type === "Coaching")
      .reduce((s, r) => s + Number(r.amount), 0) || 0;

  // Member counts
  const { count: activeMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "Active");

  const { count: inactiveMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "Inactive");

  const { count: trialUsers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("is_trial_user", true);

  const { count: convertedTrials } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("converted_from_trial", true);

  const trialConversionRate =
    trialUsers && trialUsers > 0
      ? Number(((convertedTrials || 0) / trialUsers) * 100).toFixed(2)
      : 0;

  // Cancelled bookings
  const { count: cancelledBookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("status", "Cancelled");

  // Refunded / disputed transactions
  const { count: refundedTransactions } = await supabase
    .from("transactions")
    .select("*", { count: "exact", head: true })
    .in("status", ["Refunded", "Dispute"]);

  // Revenue by venue (clean join)
  const { data: venueRevenueRows, error: venueError } = await supabase
    .from("transactions")
    .select(`
      amount,
      bookings (
        venues ( name )
      )
    `)
    .eq("status", "Success");

  if (venueError) throw venueError;

  const revenueMap: Record<string, number> = {};

  venueRevenueRows?.forEach((row: any) => {
    const venue = row.bookings?.venues?.name;
    if (!venue) return;
    revenueMap[venue] = (revenueMap[venue] || 0) + Number(row.amount);
  });

  const revenueByVenue = Object.entries(revenueMap).map(
    ([venue, revenue]) => ({ venue, revenue })
  );

  return {
    totalRevenue,
    bookingRevenue,
    coachingRevenue,
    activeMembers: activeMembers || 0,
    inactiveMembers: inactiveMembers || 0,
    trialUsers: trialUsers || 0,
    trialConversionRate: Number(trialConversionRate),
    cancelledBookings: cancelledBookings || 0,
    refundedTransactions: refundedTransactions || 0,
    revenueByVenue
  };
}
