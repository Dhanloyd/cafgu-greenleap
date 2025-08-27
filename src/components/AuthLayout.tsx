import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import authBg from '@/assets/auth-background.jpg';

const AuthLayout: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
  });
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const success = login(formData.username, formData.password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome to CAFGU Lending System",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } else {
      // Sign up validation
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password mismatch",
          description: "Please ensure passwords match",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Sign up successful",
        description: "Please contact admin for account activation",
      });
      
      // Switch to login after successful signup
      setIsLogin(true);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        name: '',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary-dark/60" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <h1 className="text-4xl font-bold mb-4">CAFGU Lending System</h1>
          <p className="text-xl opacity-90 mb-6">
            Empowering CAFGU members through financial cooperation and support
          </p>
          <div className="space-y-3 text-sm opacity-80">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Secure and reliable lending platform</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Easy loan management and tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>Comprehensive member services</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-2">CZMPC</h2>
            <p className="text-muted-foreground">
              Central Zambales Multi-Purpose Cooperative
            </p>
          </div>

          <Card className="border-border/50 shadow-[var(--shadow-soft)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <CardDescription>
                {isLogin 
                  ? 'Sign in to access your account' 
                  : 'Join our cooperative lending system'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input-enhanced"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-enhanced"
                        placeholder="Enter your email"
                      />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-enhanced"
                    placeholder="Enter your username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input-enhanced"
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="input-enhanced"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  size="lg"
                >
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </Button>
              </form>

              {isLogin && (
                <div className="text-center mb-4">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                    onClick={() => {
                      toast({
                        title: "Password Reset",
                        description: "Please contact your administrator for password reset assistance.",
                      });
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-primary hover:text-primary-dark transition-colors"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"
                  }
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;