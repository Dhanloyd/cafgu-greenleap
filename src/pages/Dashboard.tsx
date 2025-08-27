import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, CreditCard, AlertCircle, DollarSign } from 'lucide-react';

// Mock data for charts
const patrolBaseData = [
  { name: 'Alpha Base', loans: 45 },
  { name: 'Bravo Base', loans: 32 },
  { name: 'Charlie Base', loans: 28 },
  { name: 'Delta Base', loans: 51 },
  { name: 'Echo Base', loans: 39 },
];

const monthlyCollectionData = [
  { month: 'Jan', amount: 125000 },
  { month: 'Feb', amount: 132000 },
  { month: 'Mar', amount: 128000 },
  { month: 'Apr', amount: 145000 },
  { month: 'May', amount: 151000 },
  { month: 'Jun', amount: 148000 },
  { month: 'Jul', amount: 162000 },
  { month: 'Aug', amount: 158000 },
];

const kpiData = [
  {
    title: 'Borrowed Amounts',
    value: '₱2,450,000',
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up',
  },
  {
    title: 'Total Members',
    value: '1,247',
    change: '+3.2%',
    icon: Users,
    trend: 'up',
  },
  {
    title: 'Members with Loans',
    value: '342',
    change: '+8.7%',
    icon: CreditCard,
    trend: 'up',
  },
  {
    title: 'Past Due Loans',
    value: '23',
    change: '-15.3%',
    icon: AlertCircle,
    trend: 'down',
  },
  {
    title: 'Collectible this Month',
    value: '₱185,500',
    change: '+5.8%',
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
          <p className="text-muted-foreground">Welcome back! Here's your lending system overview.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="card-stat hover:scale-105 transition-transform duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <p className={`text-xs flex items-center gap-1 mt-1 ${
                    kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                    {kpi.change}
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <kpi.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Per Patrol Base Loans Chart */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Per Patrol Base Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={patrolBaseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
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
        </Card>

        {/* Monthly Collection Chart */}
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Per Month Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `₱${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
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
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="card-dashboard mt-6">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New loan application', member: 'Juan Dela Cruz', amount: '₱50,000', time: '2 hours ago' },
              { action: 'Payment received', member: 'Maria Santos', amount: '₱12,500', time: '4 hours ago' },
              { action: 'Loan approved', member: 'Pedro Rodriguez', amount: '₱35,000', time: '6 hours ago' },
              { action: 'New member registration', member: 'Ana Garcia', amount: 'N/A', time: '1 day ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.member}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;