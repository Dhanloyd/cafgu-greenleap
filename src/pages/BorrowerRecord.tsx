import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Eye, Download, Edit, Trash2 } from 'lucide-react';

// Mock data - replace with real data from your backend
const mockMember = {
  id: 1,
  tin: "123-456-789",
  fullName: "John Doe",
  birthdate: "1990-01-15",
  age: 34,
  gender: "Male",
  address: "123 Main St, Tungawan",
  contactNumber: "+63 912 345 6789",
  patrolBase: "DCAO",
  memberSince: "2020-01-01"
};

const mockLoanHistory = [
  {
    id: 1,
    loanId: "LN-2024-001",
    amount: "₱5,000.00",
    status: "Active",
    dateApplied: "2024-01-15",
    dateApproved: "2024-01-20",
    dueDate: "2024-07-20",
    monthlyPayment: "₱850.00",
    remainingBalance: "₱2,500.00"
  },
  {
    id: 2,
    loanId: "LN-2023-045",
    amount: "₱3,000.00",
    status: "Completed",
    dateApplied: "2023-06-10",
    dateApproved: "2023-06-15",
    dueDate: "2023-12-15",
    monthlyPayment: "₱520.00",
    remainingBalance: "₱0.00"
  }
];

const getStatusBadge = (status: string) => {
  const variants: { [key: string]: string } = {
    'Active': 'status-active',
    'Pending': 'status-pending',
    'Completed': 'status-success',
    'Overdue': 'status-rejected',
  };
  return <Badge className={variants[status] || 'status-pending'}>{status}</Badge>;
};

const BorrowerRecord: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you would fetch the member data based on the id
  const member = mockMember;
  const loanHistory = mockLoanHistory;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/borrowers')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Borrowers
          </Button>
          <div>
            <h1 className="page-title">Borrower Record</h1>
            <div className="text-sm text-muted-foreground">
              View detailed information and loan history
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Member Information */}
        <div className="lg:col-span-1">
          <Card className="card-dashboard">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Member Information
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="font-medium">{member.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">TIN</label>
                <p className="font-mono">{member.tin}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Birthdate</label>
                <p>{member.birthdate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Age</label>
                <p>{member.age} years old</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <p>{member.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Patrol Base</label>
                <p>{member.patrolBase}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p>{member.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Contact Number</label>
                <p>{member.contactNumber}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                <p>{member.memberSince}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan History */}
        <div className="lg:col-span-2">
          <Card className="card-dashboard">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Loan History</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button size="sm" className="btn-primary">
                    New Loan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Loan ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Applied</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Monthly Payment</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanHistory.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <p className="text-muted-foreground">No loan history found</p>
                          <p className="text-sm text-muted-foreground mt-1">This member has no loan records yet</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      loanHistory.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-mono">{loan.loanId}</TableCell>
                          <TableCell className="font-medium">{loan.amount}</TableCell>
                          <TableCell>{getStatusBadge(loan.status)}</TableCell>
                          <TableCell>{loan.dateApplied}</TableCell>
                          <TableCell>{loan.dueDate}</TableCell>
                          <TableCell>{loan.monthlyPayment}</TableCell>
                          <TableCell className="font-medium">{loan.remainingBalance}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {loan.status === 'Active' && (
                                <Button variant="outline" size="sm">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card className="card-dashboard">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Loans</div>
                <div className="text-2xl font-bold">{loanHistory.length}</div>
              </CardContent>
            </Card>
            <Card className="card-dashboard">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Active Loans</div>
                <div className="text-2xl font-bold text-primary">
                  {loanHistory.filter(loan => loan.status === 'Active').length}
                </div>
              </CardContent>
            </Card>
            <Card className="card-dashboard">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Outstanding</div>
                <div className="text-2xl font-bold text-destructive">₱2,500.00</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerRecord;