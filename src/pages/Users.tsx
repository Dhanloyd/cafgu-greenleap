import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Empty data - ready for database integration  
const users: any[] = [];

const roleOptions = ['Admin', 'Manager', 'Staff', 'Viewer'];

const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.username || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User Created",
      description: "New user has been successfully added",
    });
    
    setFormData({
      name: '',
      username: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
    setIsFormOpen(false);
  };

  const handleEdit = (user: any) => {
    toast({
      title: "Edit User",
      description: `Editing user: ${user.name}`,
    });
  };

  const handleDelete = (user: any) => {
    if (user.username === 'admin') {
      toast({
        title: "Cannot Delete",
        description: "Administrator account cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User Deleted",
      description: `${user.name} has been removed`,
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? <Badge className="status-active">Active</Badge>
      : <Badge className="status-rejected">Inactive</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const roleColors: { [key: string]: string } = {
      'Admin': 'bg-destructive/10 text-destructive border-destructive/20',
      'Manager': 'bg-warning/10 text-warning border-warning/20',
      'Staff': 'bg-primary/10 text-primary border-primary/20',
      'Viewer': 'bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20',
    };
    return (
      <Badge className={`${roleColors[role] || 'bg-muted'} px-2 py-1 rounded-full text-xs font-medium`}>
        <Shield className="h-3 w-3 mr-1" />
        {role}
      </Badge>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">User Management</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            ₱0.00 Collectibles this month (August)
          </div>
          <Button onClick={() => setIsFormOpen(!isFormOpen)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New User
          </Button>
        </div>
      </div>

      {/* New User Form */}
      {isFormOpen && (
        <Card className="card-dashboard mb-6">
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="Enter username"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  Create User
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card className="card-dashboard">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="font-mono">{user.username}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(user)}
                          disabled={user.username === 'admin'}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Active: {users.filter(u => u.status === 'Active').length}</span>
              <span>Inactive: {users.filter(u => u.status === 'Inactive').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;