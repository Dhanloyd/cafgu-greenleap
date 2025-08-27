import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Calculator, FileText, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const members = [
  { id: 1, name: 'Juan Dela Cruz', membershipNumber: 'M001' },
  { id: 2, name: 'Maria Santos', membershipNumber: 'M002' },
  { id: 3, name: 'Pedro Rodriguez', membershipNumber: 'M003' },
];

const patrolBases = ['Alpha Base', 'Bravo Base', 'Charlie Base', 'Delta Base', 'Echo Base'];

const loans = [
  {
    id: 1,
    loanId: 'LOAN-001',
    member: 'Juan Dela Cruz',
    patrolBase: 'Alpha Base',
    principal: 50000,
    monthlyPayment: 5000,
    status: 'Active',
    dateApproved: '2024-08-01',
    maturityDate: '2024-10-01'
  },
  {
    id: 2,
    loanId: 'LOAN-002',
    member: 'Maria Santos',
    patrolBase: 'Bravo Base',
    principal: 35000,
    monthlyPayment: 3500,
    status: 'Pending',
    dateApproved: '',
    maturityDate: ''
  },
];

const Loans: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    member: '',
    patrolBase: '',
    principal: '',
    interestRate: '3',
    term: '2',
    zampenBenefits: '1000',
    processingFee: '500',
  });
  const [calculations, setCalculations] = useState({
    principalDeduction: 0,
    monthlyInterest: 0,
    unpaidShareCapital: 0,
    totalDeductions: 0,
    netAmount: 0,
    monthlyPayment: 0,
  });
  const { toast } = useToast();

  const filteredLoans = loans.filter(loan =>
    loan.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate when principal amount changes
    if (field === 'principal' && value) {
      calculateLoan(value);
    }
  };

  const calculateLoan = (principalStr: string) => {
    const principal = parseFloat(principalStr) || 0;
    const term = parseInt(formData.term) || 2;
    const interestRate = parseFloat(formData.interestRate) || 3;
    const zampenBenefits = parseFloat(formData.zampenBenefits) || 1000;
    const processingFee = parseFloat(formData.processingFee) || 500;

    // Principal Deduction: 20%/month for 2 months = 40%
    const principalDeduction = principal * 0.20 * term;
    
    // Monthly Interest: 3%
    const monthlyInterest = principal * (interestRate / 100) * term;
    
    // Unpaid Share Capital: 2%/month for 2 months = 4%
    const unpaidShareCapital = principal * 0.02 * term;
    
    // Total Deductions
    const totalDeductions = principalDeduction + monthlyInterest + unpaidShareCapital + zampenBenefits + processingFee;
    
    // Net Amount
    const netAmount = principal - totalDeductions;
    
    // Monthly Payment (Principal + Interest) / Term
    const monthlyPayment = (principal + monthlyInterest) / term;

    setCalculations({
      principalDeduction,
      monthlyInterest,
      unpaidShareCapital,
      totalDeductions,
      netAmount,
      monthlyPayment,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.member || !formData.patrolBase || !formData.principal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Loan Application Created",
      description: "Loan application has been submitted for approval",
    });
    
    setFormData({
      member: '',
      patrolBase: '',
      principal: '',
      interestRate: '3',
      term: '2',
      zampenBenefits: '1000',
      processingFee: '500',
    });
    setCalculations({
      principalDeduction: 0,
      monthlyInterest: 0,
      unpaidShareCapital: 0,
      totalDeductions: 0,
      netAmount: 0,
      monthlyPayment: 0,
    });
    setIsFormOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Active': 'status-active',
      'Pending': 'status-pending',
      'Completed': 'bg-muted text-muted-foreground',
      'Overdue': 'status-rejected',
    };
    return <Badge className={variants[status] || 'status-pending'}>{status}</Badge>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Loan Management</h1>
        <Button onClick={() => setIsFormOpen(!isFormOpen)} className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Loan
        </Button>
      </div>

      {/* New Loan Form */}
      {isFormOpen && (
        <Card className="card-dashboard mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Loan Application
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Loan Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="member">Member *</Label>
                    <Select value={formData.member} onValueChange={(value) => handleInputChange('member', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select member" />
                      </SelectTrigger>
                      <SelectContent>
                        {members.map((member) => (
                          <SelectItem key={member.id} value={member.id.toString()}>
                            {member.name} ({member.membershipNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="patrolBase">Patrol Base *</Label>
                    <Select value={formData.patrolBase} onValueChange={(value) => handleInputChange('patrolBase', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patrol base" />
                      </SelectTrigger>
                      <SelectContent>
                        {patrolBases.map((base) => (
                          <SelectItem key={base} value={base}>
                            {base}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="principal">Principal Amount *</Label>
                    <Input
                      id="principal"
                      type="number"
                      value={formData.principal}
                      onChange={(e) => handleInputChange('principal', e.target.value)}
                      placeholder="₱0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Monthly Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="term">Loan Term (Months)</Label>
                    <Select value={formData.term} onValueChange={(value) => handleInputChange('term', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Month</SelectItem>
                        <SelectItem value="2">2 Months</SelectItem>
                        <SelectItem value="3">3 Months</SelectItem>
                        <SelectItem value="6">6 Months</SelectItem>
                        <SelectItem value="12">12 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zampenBenefits">Zampen Benefits</Label>
                    <Input
                      id="zampenBenefits"
                      type="number"
                      value={formData.zampenBenefits}
                      onChange={(e) => handleInputChange('zampenBenefits', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="processingFee">Processing Fee</Label>
                    <Input
                      id="processingFee"
                      type="number"
                      value={formData.processingFee}
                      onChange={(e) => handleInputChange('processingFee', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Auto Calculations */}
              {formData.principal && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Auto Calculations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Principal Deduction (20%/month):</span>
                        <span className="font-mono">₱{calculations.principalDeduction.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Monthly Interest (3%):</span>
                        <span className="font-mono">₱{calculations.monthlyInterest.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Unpaid Share Capital (2%/month):</span>
                        <span className="font-mono">₱{calculations.unpaidShareCapital.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Zampen Benefits:</span>
                        <span className="font-mono">₱{parseFloat(formData.zampenBenefits || '0').toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm font-medium">Processing Fee:</span>
                        <span className="font-mono">₱{parseFloat(formData.processingFee || '0').toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <span className="text-sm font-medium">Total Deductions:</span>
                        <span className="font-mono font-bold">₱{calculations.totalDeductions.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-success/5 border border-success/20 rounded-lg">
                        <span className="text-sm font-medium">Net Amount to Receive:</span>
                        <span className="font-mono font-bold text-success">₱{calculations.netAmount.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 bg-warning/5 border border-warning/20 rounded-lg">
                        <span className="text-sm font-medium">Monthly Payment:</span>
                        <span className="font-mono font-bold text-warning">₱{calculations.monthlyPayment.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  Submit Loan Application
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
                {formData.principal && (
                  <Button type="button" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Amortization Schedule
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Loans Table */}
      <Card className="card-dashboard">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Loan Records</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Patrol Base</TableHead>
                  <TableHead>Principal</TableHead>
                  <TableHead>Monthly Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Approved</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-mono">{loan.loanId}</TableCell>
                    <TableCell className="font-medium">{loan.member}</TableCell>
                    <TableCell>{loan.patrolBase}</TableCell>
                    <TableCell className="font-mono">₱{loan.principal.toLocaleString()}</TableCell>
                    <TableCell className="font-mono">₱{loan.monthlyPayment.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(loan.status)}</TableCell>
                    <TableCell>{loan.dateApproved || 'Pending'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {loan.status === 'Pending' && (
                          <Button size="sm" className="btn-success">
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loans;