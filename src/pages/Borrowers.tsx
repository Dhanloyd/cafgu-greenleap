import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Plus, Search, Trash2, Calendar, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConfirmationModal from '@/components/ConfirmationModal';

// Mock data for demonstration
const members = [
  {
    id: 1,
    tin: "123-456-789",
    fullName: "Juan Cruz",
    birthdate: "1985-03-15",
    age: 39,
    gender: "Male"
  },
  {
    id: 2,
    tin: "987-654-321",
    fullName: "Maria Santos",
    birthdate: "1990-07-22",
    age: 34,
    gender: "Female"
  },
  {
    id: 3,
    tin: "456-789-123",
    fullName: "Pedro Reyes",
    birthdate: "1988-11-10",
    age: 36,
    gender: "Male"
  },
  {
    id: 4,
    tin: "789-123-456",
    fullName: "Ana Garcia",
    birthdate: "1992-05-08",
    age: 32,
    gender: "Female"
  },
  {
    id: 5,
    tin: "321-654-987",
    fullName: "Carlos Mendoza",
    birthdate: "1987-09-18",
    age: 37,
    gender: "Male"
  }
];

const loanRecords = [
  {
    id: 1,
    borrower: "Juan Cruz",
    borrowerId: 1,
    loanId: "LN-2024-001",
    amount: 5000,
    principalAmount: 5000,
    interestRate: 12,
    remainingBalance: 3500,
    totalInterest: 600,
    yearlyInterest: 600,
    status: "Active",
    dateApproved: "2024-01-15",
    dueDate: "2024-12-15",
    payments: [
      { id: 1, amount: 1500, date: "2024-03-15", type: "principal" }
    ]
  },
  {
    id: 2,
    borrower: "Maria Santos", 
    borrowerId: 2,
    loanId: "LN-2024-002",
    amount: 3000,
    principalAmount: 3000,
    interestRate: 10,
    remainingBalance: 3000,
    totalInterest: 300,
    yearlyInterest: 300,
    status: "Pending",
    dateApproved: null,
    dueDate: "2024-12-15",
    payments: []
  },
  {
    id: 3,
    borrower: "Pedro Reyes",
    borrowerId: 3,
    loanId: "LN-2024-003", 
    amount: 7500,
    principalAmount: 7500,
    interestRate: 15,
    remainingBalance: 5000,
    totalInterest: 1125,
    yearlyInterest: 1125,
    status: "Active",
    dateApproved: "2024-02-01",
    dueDate: "2024-12-31",
    payments: [
      { id: 2, amount: 2500, date: "2024-04-01", type: "principal" }
    ]
  },
  {
    id: 4,
    borrower: "Ana Garcia",
    borrowerId: 4,
    loanId: "LN-2024-004",
    amount: 2000,
    principalAmount: 2000,
    interestRate: 8,
    remainingBalance: 0,
    totalInterest: 160,
    yearlyInterest: 160,
    status: "Completed",
    dateApproved: "2024-01-01",
    dueDate: "2024-06-01",
    payments: [
      { id: 3, amount: 2000, date: "2024-05-15", type: "principal" },
      { id: 4, amount: 160, date: "2024-05-15", type: "interest" }
    ]
  }
];

const patrolBases = ["DCAO", "Base Alpha", "Base Bravo", "Base Charlie"];

const Borrowers: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedPatrolBase, setSelectedPatrolBase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all-members');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, recordId: null, recordType: '' });
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredMembers = members.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.tin.includes(searchTerm)
  );

  // Separate members with and without loans
  const membersWithLoans = members.filter(member => 
    loanRecords.some(loan => loan.borrowerId === member.id)
  );
  
  const membersWithoutLoans = members.filter(member => 
    !loanRecords.some(loan => loan.borrowerId === member.id)
  );

  // Calculate yearly totals
  const currentYear = new Date().getFullYear();
  const yearlyTotals = {
    totalLoans: loanRecords.reduce((sum, loan) => sum + loan.amount, 0),
    totalPrincipal: loanRecords.reduce((sum, loan) => sum + loan.principalAmount, 0),
    totalInterest: loanRecords.reduce((sum, loan) => sum + loan.yearlyInterest, 0),
    totalUnpaid: loanRecords.reduce((sum, loan) => sum + loan.remainingBalance, 0),
    activeLoanCount: loanRecords.filter(loan => loan.status === 'Active').length,
    completedLoanCount: loanRecords.filter(loan => loan.status === 'Completed').length
  };

  const handleCreateRecord = () => {
    if (!selectedMember || !selectedPatrolBase) {
      toast({
        title: "Missing Information",
        description: "Please select both member and patrol base",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Record Created",
      description: "Borrower record has been created successfully",
    });

    setSelectedMember('');
    setSelectedPatrolBase('');
  };

  const handleDeleteRecord = (recordId: any, recordType: string) => {
    setDeleteModal({ isOpen: true, recordId, recordType });
  };

  const confirmDelete = () => {
    toast({
      title: "Record Deleted",
      description: `${deleteModal.recordType} has been deleted successfully`,
    });
    setDeleteModal({ isOpen: false, recordId: null, recordType: '' });
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Pending': 'status-pending',
      'Active': 'status-active',
      'Approved': 'status-active',
      'Completed': 'status-success',
      'Rejected': 'status-rejected',
    };
    return <Badge className={variants[status] || 'status-pending'}>{status}</Badge>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Borrowers Management</h1>
        <div className="text-sm text-muted-foreground">
          ₱{yearlyTotals.totalUnpaid.toLocaleString()} Total Unpaid Capital ({currentYear})
        </div>
      </div>

      {/* Yearly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="card-dashboard">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm text-muted-foreground">Total Loans ({currentYear})</div>
                <div className="text-2xl font-bold">₱{yearlyTotals.totalLoans.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-dashboard">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-sm text-muted-foreground">Total Interest ({currentYear})</div>
                <div className="text-2xl font-bold text-green-600">₱{yearlyTotals.totalInterest.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-dashboard">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-sm text-muted-foreground">Unpaid Capital</div>
                <div className="text-2xl font-bold text-orange-600">₱{yearlyTotals.totalUnpaid.toLocaleString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="card-dashboard">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-muted-foreground">Active Loans</div>
                <div className="text-2xl font-bold text-blue-600">{yearlyTotals.activeLoanCount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Borrower Form */}
      <Card className="card-dashboard mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Borrower
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="member">Member *</Label>
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger>
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="patrolBase">Patrol Base *</Label>
              <Select value={selectedPatrolBase} onValueChange={setSelectedPatrolBase}>
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

            <div className="flex items-end">
              <Button onClick={handleCreateRecord} className="btn-primary w-full">
                Create Record
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-members">All Members</TabsTrigger>
          <TabsTrigger value="with-loans">With Loans ({membersWithLoans.length})</TabsTrigger>
          <TabsTrigger value="without-loans">Without Loans ({membersWithoutLoans.length})</TabsTrigger>
          <TabsTrigger value="loan-records">Loan Records</TabsTrigger>
        </TabsList>

        {/* All Members Tab */}
        <TabsContent value="all-members">
          <Card className="card-dashboard">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Members</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
        <CardContent>
          <div className="table-container">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TIN</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Birthdate</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No members found</p>
                      <p className="text-sm text-muted-foreground mt-1">Add members to start managing borrowers</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-mono">{member.tin}</TableCell>
                      <TableCell className="font-medium">{member.fullName}</TableCell>
                      <TableCell>{member.birthdate}</TableCell>
                      <TableCell>{member.age}</TableCell>
                      <TableCell>{member.gender}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/borrowers/${member.id}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Record
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteRecord(member.id, 'Member record')}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {filteredMembers.length} of {members.length} members
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Per Page:</span>
                <Select defaultValue="10">
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members With Loans Tab */}
        <TabsContent value="with-loans">
          <Card className="card-dashboard">
            <CardHeader>
              <CardTitle>Members with Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Total Loan Amount</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                      <TableHead>Total Interest (Yearly)</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {membersWithLoans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <p className="text-muted-foreground">No members with loans found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      membersWithLoans.map((member) => {
                        const memberLoans = loanRecords.filter(loan => loan.borrowerId === member.id);
                        const totalAmount = memberLoans.reduce((sum, loan) => sum + loan.amount, 0);
                        const totalRemaining = memberLoans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
                        const totalYearlyInterest = memberLoans.reduce((sum, loan) => sum + loan.yearlyInterest, 0);
                        
                        return (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.fullName}</TableCell>
                            <TableCell className="font-medium">₱{totalAmount.toLocaleString()}</TableCell>
                            <TableCell className="font-medium text-orange-600">₱{totalRemaining.toLocaleString()}</TableCell>
                            <TableCell className="font-medium text-green-600">₱{totalYearlyInterest.toLocaleString()}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/borrowers/${member.id}`)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Without Loans Tab */}
        <TabsContent value="without-loans">
          <Card className="card-dashboard">
            <CardHeader>
              <CardTitle>Members without Loans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TIN</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {membersWithoutLoans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <p className="text-muted-foreground">All members have loans</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      membersWithoutLoans.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell className="font-mono">{member.tin}</TableCell>
                          <TableCell className="font-medium">{member.fullName}</TableCell>
                          <TableCell>{member.age}</TableCell>
                          <TableCell>{member.gender}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/borrowers/${member.id}`)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Create Loan
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loan Records Section */}
        <TabsContent value="loan-records">
          <Card className="card-dashboard">

            <CardHeader>
              <CardTitle>Loan Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Borrower</TableHead>
                      <TableHead>Loan ID</TableHead>
                      <TableHead>Principal Amount</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                      <TableHead>Interest Rate</TableHead>
                      <TableHead>Yearly Interest</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanRecords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8">
                          <p className="text-muted-foreground">No loan records found</p>
                          <p className="text-sm text-muted-foreground mt-1">Loan records will appear here once created</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      loanRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{getStatusBadge(record.status)}</TableCell>
                          <TableCell className="font-medium">{record.borrower}</TableCell>
                          <TableCell className="font-mono">{record.loanId}</TableCell>
                          <TableCell className="font-medium">₱{record.principalAmount.toLocaleString()}</TableCell>
                          <TableCell className="font-medium text-orange-600">₱{record.remainingBalance.toLocaleString()}</TableCell>
                          <TableCell className="font-medium">{record.interestRate}%</TableCell>
                          <TableCell className="font-medium text-green-600">₱{record.yearlyInterest.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => navigate(`/borrowers/${record.borrowerId}`)}>
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              {record.status === 'Pending' && (
                                <>
                                  <Button size="sm" className="btn-success">
                                    Approve
                                  </Button>
                                  <Button variant="destructive" size="sm">
                                    Reject
                                  </Button>
                                </>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteRecord(record.id, 'Loan record')}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
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
        </TabsContent>
      </Tabs>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, recordId: null, recordType: '' })}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        description={`Are you sure you want to delete this ${deleteModal.recordType}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default Borrowers;