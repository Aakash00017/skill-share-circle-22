import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star,
  Handshake,
  Settings,
  LogOut,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    location: "New York, NY",
    avatar: "",
    rating: 4.9,
    skillsOffered: ["React", "TypeScript", "UI/UX Design"],
    skillsWanted: ["Machine Learning", "Data Science"],
    availability: "Weekends",
    completedSwaps: 15
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    location: "San Francisco, CA",
    avatar: "",
    rating: 4.8,
    skillsOffered: ["Python", "Machine Learning", "Data Analysis"],
    skillsWanted: ["Web Development", "React"],
    availability: "Evenings",
    completedSwaps: 12
  },
  {
    id: 3,
    name: "Emily Johnson",
    location: "Austin, TX",
    avatar: "",
    rating: 5.0,
    skillsOffered: ["Photography", "Video Editing", "Adobe Creative Suite"],
    skillsWanted: ["Web Design", "Branding"],
    availability: "Flexible",
    completedSwaps: 8
  },
  {
    id: 4,
    name: "David Kim",
    location: "Seattle, WA",
    avatar: "",
    rating: 4.7,
    skillsOffered: ["Mobile Development", "Flutter", "iOS"],
    skillsWanted: ["Backend Development", "DevOps"],
    availability: "Weekdays after 6PM",
    completedSwaps: 20
  },
  {
    id: 5,
    name: "Lisa Patel",
    location: "Boston, MA",
    avatar: "",
    rating: 4.9,
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy"],
    skillsWanted: ["Analytics", "Social Media Management"],
    availability: "Weekends",
    completedSwaps: 18
  },
  {
    id: 6,
    name: "Alex Thompson",
    location: "Chicago, IL",
    avatar: "",
    rating: 4.6,
    skillsOffered: ["3D Modeling", "Animation", "Blender"],
    skillsWanted: ["Game Development", "Unity"],
    availability: "Evenings and weekends",
    completedSwaps: 10
  }
];

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  
  const allSkills = Array.from(
    new Set(mockUsers.flatMap(user => [...user.skillsOffered, ...user.skillsWanted]))
  ).sort();

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === "" ||
      user.skillsOffered.some(skill => skill === selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Handshake className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-primary font-medium">
              Browse Skills
            </Link>
            <Link to="/profile" className="text-foreground/80 hover:text-foreground transition-colors">
              My Profile
            </Link>
            <Link to="/requests" className="text-foreground/80 hover:text-foreground transition-colors">
              My Requests
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Browse Skills & People</h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, location, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="pl-10 pr-4 py-2 border border-input rounded-md bg-card text-foreground min-w-[200px]"
              >
                <option value="">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Popular Skills */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Popular Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 8).map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkill === skill ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedSkill(selectedSkill === skill ? "" : skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredUsers.length} of {mockUsers.length} people
          </p>
        </div>

        {/* User Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{user.location}</span>
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium">{user.rating}</span>
                    <span className="text-muted-foreground">({user.completedSwaps} swaps)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{user.availability}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 text-primary">Offers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill) => (
                      <Badge key={skill} variant="default" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2 text-secondary-foreground">Wants:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-2">
                  <Button variant="hero" size="sm" className="flex-1" asChild>
                    <Link to={`/request/${user.id}`}>
                      <Handshake className="h-4 w-4 mr-1" />
                      Request Swap
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;