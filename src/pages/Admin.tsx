import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield,
  Users,
  AlertTriangle,
  Download,
  Ban,
  CheckCircle,
  XCircle,
  MessageSquare,
  BarChart3,
  Search,
  Filter,
  ArrowLeft,
  Handshake
} from "lucide-react";

// Mock data for admin dashboard
const mockStats = {
  totalUsers: 1247,
  activeSwaps: 89,
  completedSwaps: 524,
  pendingReports: 12
};

const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    status: "active",
    joinDate: "2024-01-15",
    swapsCompleted: 15,
    rating: 4.9,
    reportCount: 0
  },
  {
    id: 2,
    name: "Marcus Rodriguez", 
    email: "marcus@example.com",
    status: "active",
    joinDate: "2024-02-01",
    swapsCompleted: 12,
    rating: 4.8,
    reportCount: 1
  },
  {
    id: 3,
    name: "Spam User",
    email: "spam@example.com", 
    status: "reported",
    joinDate: "2024-03-10",
    swapsCompleted: 2,
    rating: 2.1,
    reportCount: 5
  }
];

const mockReports = [
  {
    id: 1,
    reportedUser: "Spam User",
    reportedBy: "Sarah Chen",
    reason: "Inappropriate skill descriptions",
    description: "User is posting fake skills and inappropriate content in skill descriptions.",
    date: "2024-03-15",
    status: "pending"
  },
  {
    id: 2,
    reportedUser: "Marcus Rodriguez",
    reportedBy: "Anonymous",
    reason: "No-show for scheduled swap",
    description: "User didn't show up for the scheduled skill swap session.",
    date: "2024-03-14",
    status: "pending"
  }
];

const Admin = () => {
  const [users, setUsers] = useState(mockUsers);
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformMessage, setPlatformMessage] = useState("");
  const { toast } = useToast();

  const handleBanUser = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: "banned" } : user
      )
    );
    toast({
      title: "User Banned",
      description: "The user has been banned from the platform.",
    });
  };

  const handleUnbanUser = (userId: number) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: "active" } : user
      )
    );
    toast({
      title: "User Unbanned",
      description: "The user has been unbanned and can access the platform again.",
    });
  };

  const handleResolveReport = (reportId: number, action: "approve" | "reject") => {
    setReports(prev => 
      prev.map(report => 
        report.id === reportId ? { ...report, status: action === "approve" ? "resolved" : "rejected" } : report
      )
    );
    toast({
      title: action === "approve" ? "Report Approved" : "Report Rejected",
      description: `The report has been ${action === "approve" ? "approved and action taken" : "rejected"}.`,
    });
  };

  const handleSendPlatformMessage = () => {
    if (!platformMessage.trim()) return;
    
    toast({
      title: "Platform Message Sent",
      description: "Your message has been sent to all users.",
    });
    setPlatformMessage("");
  };

  const downloadReport = (type: string) => {
    toast({
      title: "Report Downloaded",
      description: `${type} report has been downloaded.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "banned":
        return <Badge variant="destructive">Banned</Badge>;
      case "reported":
        return <Badge className="bg-yellow-100 text-yellow-800">Reported</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/browse">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
          </div>
          
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Handshake className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
              <Handshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.activeSwaps}</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Swaps</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.completedSwaps}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{mockStats.pendingReports}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="messages">Platform Messages</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users, view their activity, and take moderation actions.</CardDescription>
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          <div className="text-xs text-muted-foreground">
                            Joined {user.joinDate} • {user.swapsCompleted} swaps • {user.rating}★
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(user.status)}
                        {user.reportCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {user.reportCount} reports
                          </Badge>
                        )}
                        {user.status === "active" ? (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleBanUser(user.id)}
                          >
                            <Ban className="h-3 w-3 mr-1" />
                            Ban
                          </Button>
                        ) : user.status === "banned" ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleUnbanUser(user.id)}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Unban
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>User Reports</CardTitle>
                <CardDescription>Review and moderate user reports and inappropriate content.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Report against {report.reportedUser}</div>
                          <div className="text-sm text-muted-foreground">
                            Reported by {report.reportedBy} on {report.date}
                          </div>
                        </div>
                        <Badge 
                          variant={report.status === "pending" ? "secondary" : "outline"}
                          className={report.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                        >
                          {report.status}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-destructive">Reason: {report.reason}</div>
                        <div className="text-sm text-muted-foreground mt-1">{report.description}</div>
                      </div>
                      {report.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            onClick={() => handleResolveReport(report.id, "approve")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Take Action
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResolveReport(report.id, "reject")}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Platform Messages</CardTitle>
                <CardDescription>Send announcements and updates to all users.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message to all users:</label>
                  <Textarea
                    placeholder="Enter your platform-wide message here..."
                    value={platformMessage}
                    onChange={(e) => setPlatformMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <Button 
                  onClick={handleSendPlatformMessage}
                  disabled={!platformMessage.trim()}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send to All Users
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Download detailed reports about platform activity and user engagement.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => downloadReport("User Activity")}
                  >
                    <Download className="h-5 w-5" />
                    <span>User Activity Report</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => downloadReport("Swap Statistics")}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Swap Statistics</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => downloadReport("Feedback Logs")}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Feedback Logs</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                    onClick={() => downloadReport("Platform Analytics")}
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Platform Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;