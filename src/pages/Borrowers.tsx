import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Plus, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Empty data - ready for database integration
const members: any[] = [];
const loanRecords: any[] = [];
const patrolBases: string[] = [];

const Borrowers: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedPatrolBase, setSelectedPatrolBase] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredMembers = members.filter(member =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.tin.includes(searchTerm)
  );

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

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      'Pending': 'status-pending',
      'Approved': 'status-active',
      'Rejected': 'status-rejected',
    };
    return <Badge className={variants[status] || 'status-pending'}>{status}</Badge>;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Borrowers Management</h1>
        <div className="text-sm text-muted-foreground">
          ₱0.00 Collectibles this month (August)
        </div>
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

      {/* Members Table */}
      <Card className="card-dashboard mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Members</CardTitle>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/borrowers/${member.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Record
                        </Button>
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

      {/* Loan Records Section */}
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
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loanRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
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
                      <TableCell className="font-medium">{record.amount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
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
    </div>
  );
};

export default Borrowers;