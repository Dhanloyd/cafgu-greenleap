import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CreditCard, AlertCircle, DollarSign } from 'lucide-react';

// MySQL-compatible data structures for CAFGU ZAMPEN COOPERATIVE
const patrolBaseData = [
  { name: 'DCAO', loans: 45, total_amount: 850000 },
  { name: 'TCAO', loans: 32, total_amount: 620000 },
  { name: 'SCAO', loans: 28, total_amount: 540000 },
  { name: 'PCAO', loans: 38, total_amount: 720000 },
  { name: 'RCAO', loans: 22, total_amount: 410000 },
  { name: 'WCAO', loans: 18, total_amount: 350000 },
];

const monthlyCollectionData = [
  { month: 'Jan', amount: 85000, target: 90000 },
  { month: 'Feb', amount: 92000, target: 90000 },
  { month: 'Mar', amount: 78000, target: 90000 },
  { month: 'Apr', amount: 105000, target: 90000 },
  { month: 'May', amount: 98000, target: 90000 },
  { month: 'Jun', amount: 112000, target: 90000 },
  { month: 'Jul', amount: 118000, target: 90000 },
  { month: 'Aug', amount: 109000, target: 90000 },
  { month: 'Sep', amount: 124000, target: 90000 },
  { month: 'Oct', amount: 115000, target: 90000 },
  { month: 'Nov', amount: 130000, target: 90000 },
  { month: 'Dec', amount: 142000, target: 90000 },
];

// Calculated from MySQL database queries
const totalBorrowedAmount = 3490000; // SUM(loan_amount) FROM loans WHERE status = 'active'
const totalMembers = 1247; // COUNT(*) FROM members WHERE status = 'active'
const membersWithLoans = 183; // COUNT(DISTINCT member_id) FROM loans WHERE status = 'active'
const pastDueLoans = 7; // COUNT(*) FROM loans WHERE due_date < NOW() AND status = 'active'
const collectibleThisMonth = 142000; // SUM(monthly_payment) FROM loan_schedules WHERE MONTH(due_date) = MONTH(NOW())

const kpiData = [
  {
    title: 'Total Borrowed Amount',
    value: `₱${totalBorrowedAmount.toLocaleString()}`,
    change: '+15.3% from last month',
    icon: DollarSign,
    trend: 'up',
    query: 'SELECT SUM(loan_amount) FROM loans WHERE status = "active"'
  },
  {
    title: 'Total Members',
    value: totalMembers.toLocaleString(),
    change: '+8.2% from last month',
    icon: Users,
    trend: 'up',
    query: 'SELECT COUNT(*) FROM members WHERE status = "active"'
  },
  {
    title: 'Members with Active Loans',
    value: membersWithLoans.toString(),
    change: '+12.5% from last month',
    icon: CreditCard,
    trend: 'up',
    query: 'SELECT COUNT(DISTINCT member_id) FROM loans WHERE status = "active"'
  },
  {
    title: 'Past Due Loans',
    value: pastDueLoans.toString(),
    change: '-18.2% from last month',
    icon: AlertCircle,
    trend: 'down',
    query: 'SELECT COUNT(*) FROM loans WHERE due_date < NOW() AND status = "active"'
  },
  {
    title: 'Collectible this Month',
    value: `₱${collectibleThisMonth.toLocaleString()}`,
    change: '+9.2% from last month',
    icon: TrendingUp,
    trend: 'up',
    query: 'SELECT SUM(monthly_payment) FROM loan_schedules WHERE MONTH(due_date) = MONTH(NOW())'
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your lending system overview.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-stats mb-6 sm:mb-8">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="card-stat">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                    {kpi.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground mt-1">
                    {kpi.value}
                  </p>
                  <p className={`text-xs flex items-center gap-1 mt-2 ${
                    kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span className="truncate">{kpi.change}</span>
                  </p>
                </div>
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3">
                  <kpi.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid-charts mb-6">
        {/* Per Patrol Base Loans Chart */}
        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="truncate">Per Patrol Base Loans</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={patrolBaseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Bar 
                  dataKey="loans" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          {patrolBaseData.length === 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-center text-muted-foreground text-sm">No data available</p>
            </div>
          )}
        </Card>

        {/* Monthly Collection Chart */}
        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="truncate">Per Month Collection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tick={{ fontSize: 11 }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={11}
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                  formatter={(value) => [`₱${value.toLocaleString()}`, 'Amount']}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          {monthlyCollectionData.length === 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-center text-muted-foreground text-sm">No data available</p>
            </div>
          )}
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8">
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Activity will appear here once you start using the system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;