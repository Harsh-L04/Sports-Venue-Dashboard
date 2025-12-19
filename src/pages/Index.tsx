import { useQuery } from "@tanstack/react-query";
import { 
  IndianRupee , 
  CalendarCheck, 
  Users, 
  UserMinus, 
  UserPlus, 
  XCircle, 
  AlertTriangle,
  GraduationCap
} from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { RevenueChart } from "@/components/RevenueChart";
import { fetchDashboardMetrics } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: fetchDashboardMetrics
  });

  // ✅ Safe fallback to avoid undefined access
  const safeMetrics = metrics ?? {
    totalRevenue: 0,
    bookingRevenue: 0,
    coachingRevenue: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    trialUsers: 0,
    cancelledBookings: 0,
    refundedTransactions: 0,
    revenueByVenue: []
  };

  // ✅ Use INR (₹) to match assignment data
  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="dashboard-card text-center py-12">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">
              Error Loading Dashboard
            </h2>
            <p className="text-muted-foreground">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Sports Venue Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Business metrics and revenue analytics
          </p>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            <>
              {[...Array(8)].map((_, i) => (
                <div key={i} className="dashboard-card">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-20" />
                </div>
              ))}
            </>
          ) : (
            <>
              <KPICard
                title="Total Revenue"
                value={(safeMetrics.totalRevenue)}
                icon={IndianRupee }
                iconColor="text-success"
              />
              <KPICard
                title="Booking Revenue"
                value={formatCurrency(safeMetrics.bookingRevenue)}
                icon={CalendarCheck}
                iconColor="text-primary"
              />
              <KPICard
                title="Coaching Revenue"
                value={formatCurrency(safeMetrics.coachingRevenue)}
                icon={GraduationCap}
                iconColor="text-warning"
              />
              <KPICard
                title="Active Members"
                value={safeMetrics.activeMembers}
                icon={Users}
                iconColor="text-success"
              />
              <KPICard
                title="Inactive Members"
                value={safeMetrics.inactiveMembers}
                icon={UserMinus}
                iconColor="text-muted-foreground"
              />
              <KPICard
                title="Trial Users"
                value={safeMetrics.trialUsers}
                icon={UserPlus}
                iconColor="text-primary"
              />
              <KPICard
                title="Cancelled Bookings"
                value={safeMetrics.cancelledBookings}
                icon={XCircle}
                iconColor="text-destructive"
              />
              <KPICard
                title="Refunded / Disputed"
                value={safeMetrics.refundedTransactions}
                icon={AlertTriangle}
                iconColor="text-warning"
              />
            </>
          )}
        </div>

        {/* Revenue Chart */}
        {isLoading ? (
          <div className="dashboard-card">
            <Skeleton className="h-6 w-48 mb-6" />
            <Skeleton className="h-80 w-full" />
          </div>
        ) : (
          <RevenueChart data={safeMetrics.revenueByVenue} />
        )}
      </div>
    </div>
  );
}
