import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, AlertTriangle } from 'lucide-react';

// Mock analytics data
const performanceData = [
  { month: 'Jan', loans: 45, collections: 125000, members: 85 },
  { month: 'Feb', loans: 52, collections: 142000, members: 92 },
  { month: 'Mar', loans: 48, collections: 138000, members: 89 },
  { month: 'Apr', loans: 61, collections: 165000, members: 98 },
  { month: 'May', loans: 58, collections: 158000, members: 105 },
  { month: 'Jun', loans: 67, collections: 185000, members: 112 },
  { month: 'Jul', loans: 73, collections: 198000, members: 118 },
  { month: 'Aug', loans: 69, collections: 192000, members: 124 },
];

const riskAnalysisData = [
  { category: 'Low Risk', count: 145, percentage: 65 },
  { category: 'Medium Risk', count: 58, percentage: 26 },
  { category: 'High Risk', count: 21, percentage: 9 },
];

const collectionTrendsData = [
  { week: 'Week 1', target: 50000, actual: 52000 },
  { week: 'Week 2', target: 48000, actual: 45000 },
  { week: 'Week 3', target: 55000, actual: 58000 },
  { week: 'Week 4', target: 60000, actual: 62000 },
];

const Analytics: React.FC = () => {
  const totalGrowth = 15.3;
  const collectionRate = 94.2;
  const riskLevel = 'Low';
  const efficiency = 87.5;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Advanced insights and performance metrics for your lending operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth Rate</p>
                <p className="text-3xl font-bold text-success">{totalGrowth}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+2.3% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                <p className="text-3xl font-bold text-primary">{collectionRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+1.2% from target</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <p className="text-3xl font-bold text-success">{riskLevel}</p>
                <div className="flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">Well managed</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-3xl font-bold text-warning">{efficiency}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 text-warning" />
                  <span className="text-xs text-warning">-2.1% needs improvement</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorCollections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="loans" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorLoans)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Collection vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={collectionTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
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
                  formatter={(value) => [`₱${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="hsl(var(--success))" name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk Analysis & Member Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskAnalysisData.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      risk.category === 'Low Risk' ? 'bg-success' :
                      risk.category === 'Medium Risk' ? 'bg-warning' : 'bg-destructive'
                    }`} />
                    <span className="font-medium">{risk.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{risk.count}</p>
                    <p className="text-sm text-muted-foreground">{risk.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle>Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="members" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Insights */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <h4 className="font-semibold text-success mb-2">Strong Performance</h4>
              <p className="text-sm text-muted-foreground">
                Collection rates are exceeding targets by 4.2%. August shows the highest collection rate this year.
              </p>
            </div>
            
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <h4 className="font-semibold text-warning mb-2">Attention Needed</h4>
              <p className="text-sm text-muted-foreground">
                Processing efficiency has decreased by 2.1%. Consider reviewing approval workflows.
              </p>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Growth Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Member growth is steady at 5.1% monthly. Consider expanding to new patrol bases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;