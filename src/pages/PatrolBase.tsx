import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Empty data - ready for database integration
const patrolBases: any[] = [];

const PatrolBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    commandOfficer: '',
  });
  const { toast } = useToast();

  const filteredBases = patrolBases.filter(base =>
    base.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    base.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter patrol base name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Patrol Base Added",
      description: "New patrol base has been successfully created",
    });
    
    setFormData({ name: '', location: '', commandOfficer: '' });
    setIsFormOpen(false);
  };

  const handleEdit = (base: any) => {
    toast({
      title: "Edit Patrol Base",
      description: `Editing ${base.name}`,
    });
  };

  const handleDelete = (base: any) => {
    toast({
      title: "Patrol Base Deleted",
      description: `${base.name} has been removed`,
      variant: "destructive",
    });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Patrol Base Management</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            ₱0.00 Collectibles this month (August)
          </div>
          <Button onClick={() => setIsFormOpen(!isFormOpen)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            New Patrol Base
          </Button>
        </div>
      </div>

      {/* New Patrol Base Form */}
      {isFormOpen && (
        <Card className="card-dashboard mb-6">
          <CardHeader>
            <CardTitle>New Patrol Base</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Base Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter patrol base name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Enter location/sector"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="commandOfficer">Command Officer</Label>
                  <Input
                    id="commandOfficer"
                    value={formData.commandOfficer}
                    onChange={(e) => handleInputChange('commandOfficer', e.target.value)}
                    placeholder="Enter officer name"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="btn-primary">
                  Create Patrol Base
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Patrol Base Table */}
      <Card className="card-dashboard">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Patrol Bases</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search patrol bases..."
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
                  <TableHead>Base Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Command Officer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBases.map((base) => (
                  <TableRow key={base.id}>
                    <TableCell className="font-medium">{base.name}</TableCell>
                    <TableCell>{base.location}</TableCell>
                    <TableCell>{base.commandOfficer}</TableCell>
                    <TableCell>
                      <span className="status-active">Active</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(base)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(base)}
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
              Showing {filteredBases.length} of {patrolBases.length} patrol bases
            </div>
            <div className="text-sm text-muted-foreground">
              Total Active Bases: {patrolBases.length}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatrolBase;