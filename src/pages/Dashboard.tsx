import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CreditCard, AlertCircle, DollarSign } from 'lucide-react';

// Empty data - ready for database integration
const patrolBaseData: any[] = [];
const monthlyCollectionData: any[] = [];

const kpiData = [
  {
    title: 'Borrowed Amounts',
    value: '₱0.00',
    change: 'No data',
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Total Members',
    value: '0',
    change: 'No data',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Members with Loans',
    value: '0',
    change: 'No data',
    icon: CreditCard,
    trend: 'up',
  },
  {
    title: 'Past Due Loans',
    value: '0',
    change: 'No data',
    icon: AlertCircle,
    trend: 'down',
  },
  {
    title: 'Collectible this Month',
    value: '₱0.00',
    change: 'No data',
    icon: TrendingUp,
    trend: 'up',
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