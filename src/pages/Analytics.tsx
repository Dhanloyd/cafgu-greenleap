import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, AlertTriangle } from 'lucide-react';

// Sample data for demonstration
const performanceData = [
  { month: 'Jan', loans: 120, members: 985 },
  { month: 'Feb', loans: 135, members: 1008 },
  { month: 'Mar', loans: 118, members: 1025 },
  { month: 'Apr', loans: 152, members: 1067 },
  { month: 'May', loans: 168, members: 1089 },
  { month: 'Jun', loans: 175, members: 1134 },
  { month: 'Jul', loans: 189, members: 1156 },
  { month: 'Aug', loans: 172, members: 1178 },
  { month: 'Sep', loans: 195, members: 1203 },
  { month: 'Oct', loans: 182, members: 1225 },
  { month: 'Nov', loans: 201, members: 1238 },
  { month: 'Dec', loans: 183, members: 1247 },
];

const riskAnalysisData = [
  { category: 'Low Risk', count: 142, percentage: 77.6 },
  { category: 'Medium Risk', count: 34, percentage: 18.6 },
  { category: 'High Risk', count: 7, percentage: 3.8 },
];

const collectionTrendsData = [
  { week: 'Week 1', target: 350000, actual: 380000 },
  { week: 'Week 2', target: 400000, actual: 385000 },
  { week: 'Week 3', target: 380000, actual: 420000 },
  { week: 'Week 4', target: 290000, actual: 315000 },
];

const Analytics: React.FC = () => {

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
                <p className="text-3xl font-bold text-success">+26.5%</p>
                <p className="text-xs text-success mt-1">+8.2% from last month</p>
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
                <p className="text-3xl font-bold text-primary">92.8%</p>
                <p className="text-xs text-success mt-1">+3.1% from last month</p>
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
                <p className="text-3xl font-bold text-warning">Low</p>
                <p className="text-xs text-success mt-1">3.8% high risk loans</p>
              </div>
              <div className="h-12 w-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency</p>
                <p className="text-3xl font-bold text-success">89.4%</p>
                <p className="text-xs text-success mt-1">+2.3% operational efficiency</p>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid-charts mb-6 sm:mb-8">
        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Performance Trends</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorLoans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
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
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px'
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
          {performanceData.length === 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-center text-muted-foreground text-sm">No data available</p>
            </div>
          )}
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Collection vs Target</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={collectionTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
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
                  formatter={(value) => [`₱${value.toLocaleString()}`, '']}
                />
                <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="hsl(var(--success))" name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
          {collectionTrendsData.length === 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-center text-muted-foreground text-sm">No data available</p>
            </div>
          )}
        </Card>
      </div>

      {/* Risk Analysis & Member Growth */}
      <div className="grid-charts mb-6">
        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            {riskAnalysisData.length === 0 ? (
              <div className="py-6 sm:py-8 text-center">
                <p className="text-muted-foreground text-sm">No data available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {riskAnalysisData.map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        risk.category === 'Low Risk' ? 'bg-success' :
                        risk.category === 'Medium Risk' ? 'bg-warning' : 'bg-destructive'
                      }`} />
                      <span className="font-medium text-sm sm:text-base">{risk.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm sm:text-base">{risk.count}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{risk.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader className="pb-4">
            <CardTitle className="text-base sm:text-lg">Member Growth</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
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
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="members" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
          {performanceData.length === 0 && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-center text-muted-foreground text-sm">No data available</p>
            </div>
          )}
        </Card>
      </div>

      {/* Key Insights */}
      <Card className="card-dashboard">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 sm:py-8">
            <p className="text-muted-foreground">No insights available</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Insights will appear here once you have data in the system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;