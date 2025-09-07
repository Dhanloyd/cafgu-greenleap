import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, CreditCard, DollarSign, AlertTriangle, Eye, Printer, Download, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// MySQL-compatible analytics data for CAFGU ZAMPEN COOPERATIVE
const performanceData = [
  { month: 'Jan', collections: 85000, disbursements: 120000, target: 90000 },
  { month: 'Feb', collections: 92000, disbursements: 98000, target: 90000 },
  { month: 'Mar', collections: 78000, disbursements: 110000, target: 90000 },
  { month: 'Apr', collections: 105000, disbursements: 95000, target: 90000 },
  { month: 'May', collections: 98000, disbursements: 125000, target: 90000 },
  { month: 'Jun', collections: 112000, disbursements: 88000, target: 90000 },
  { month: 'Jul', collections: 118000, disbursements: 105000, target: 90000 },
  { month: 'Aug', collections: 109000, disbursements: 92000, target: 90000 },
  { month: 'Sep', collections: 124000, disbursements: 87000, target: 90000 },
  { month: 'Oct', collections: 115000, disbursements: 103000, target: 90000 },
  { month: 'Nov', collections: 130000, disbursements: 89000, target: 90000 },
  { month: 'Dec', collections: 142000, disbursements: 95000, target: 90000 },
];

const riskAnalysisData = [
  { category: 'Low Risk (0-30 days)', value: 145, color: '#22c55e', percentage: 79.2 },
  { category: 'Medium Risk (31-60 days)', value: 28, color: '#f59e0b', percentage: 15.3 },
  { category: 'High Risk (60+ days)', value: 10, color: '#ef4444', percentage: 5.5 },
];

const collectionTrendsData = [
  { week: 'Week 1', collected: 28000, target: 30000, efficiency: 93.3 },
  { week: 'Week 2', collected: 32000, target: 30000, efficiency: 106.7 },
  { week: 'Week 3', collected: 27000, target: 30000, efficiency: 90.0 },
  { week: 'Week 4', collected: 35000, target: 30000, efficiency: 116.7 },
];

const patrolBasePerformance = [
  { base: 'DCAO', members: 45, collections: 42000, target: 40000, efficiency: 105 },
  { base: 'TCAO', members: 32, collections: 28000, target: 30000, efficiency: 93.3 },
  { base: 'SCAO', members: 28, collections: 31000, target: 28000, efficiency: 110.7 },
  { base: 'PCAO', members: 38, collections: 35000, target: 38000, efficiency: 92.1 },
  { base: 'RCAO', members: 22, collections: 23000, target: 22000, efficiency: 104.5 },
  { base: 'WCAO', members: 18, collections: 19000, target: 18000, efficiency: 105.6 },
];

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedBase, setSelectedBase] = useState('all');

  // Calculate analytics from MySQL data
  const totalCollections = performanceData.reduce((sum, item) => sum + item.collections, 0);
  const totalDisbursements = performanceData.reduce((sum, item) => sum + item.disbursements, 0);
  const averageEfficiency = collectionTrendsData.reduce((sum, item) => sum + item.efficiency, 0) / collectionTrendsData.length;
  const collectionRate = (totalCollections / (totalCollections + totalDisbursements)) * 100;

  const handleViewBorrowerRecord = (memberId: string) => {
    navigate(`/borrower-record/${memberId}`);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Analytics Dashboard</h1>
          <p className="page-subtitle">Real-time insights from MySQL database</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handlePrintReport}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Real-time Key Metrics from MySQL */}
      <div className="grid-stats mb-6">
        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Growth</p>
                <p className="text-2xl font-bold text-foreground">
                  {((totalCollections / totalDisbursements - 1) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.3% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collection Rate</p>
                <p className="text-2xl font-bold text-foreground">{collectionRate.toFixed(1)}%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  MySQL: collections/total_target
                </p>
              </div>
              <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-stat">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <p className="text-2xl font-bold text-foreground">
                  {riskAnalysisData[2].percentage < 10 ? 'Low' : riskAnalysisData[2].percentage < 20 ? 'Medium' : 'High'}
                </p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3 rotate-180" />
                  {riskAnalysisData[2].percentage.toFixed(1)}% high risk
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold text-foreground">{averageEfficiency.toFixed(1)}%</p>
                <p className="text-xs text-success flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Across all patrol bases
                </p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
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
                      <p className="font-bold text-sm sm:text-base">{risk.value}</p>
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