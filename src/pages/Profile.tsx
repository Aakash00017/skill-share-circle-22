import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Plus, 
  X, 
  Clock,
  Eye,
  EyeOff,
  Star,
  Handshake,
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    location: "San Francisco, CA",
    bio: "Passionate developer and designer looking to expand my skills through collaboration.",
    skillsOffered: ["React", "UI/UX Design", "Python"],
    skillsWanted: ["Machine Learning", "Data Science", "Mobile Development"],
    availability: "Weekends and evenings",
    isPublic: true
  });
  
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (type: 'offered' | 'wanted') => {
    const newSkill = type === 'offered' ? newSkillOffered : newSkillWanted;
    if (!newSkill.trim()) return;

    const skillsKey = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    const currentSkills = profileData[skillsKey];
    
    if (!currentSkills.includes(newSkill.trim())) {
      handleInputChange(skillsKey, [...currentSkills, newSkill.trim()]);
    }
    
    if (type === 'offered') {
      setNewSkillOffered("");
    } else {
      setNewSkillWanted("");
    }
  };

  const removeSkill = (type: 'offered' | 'wanted', skillToRemove: string) => {
    const skillsKey = type === 'offered' ? 'skillsOffered' : 'skillsWanted';
    const currentSkills = profileData[skillsKey];
    handleInputChange(skillsKey, currentSkills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
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
            <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors">
              Browse Skills
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Profile Header */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg font-semibold bg-gradient-primary text-primary-foreground">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1 text-base">
                      <MapPin className="h-4 w-4" />
                      <span>{profileData.location}</span>
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {profileData.isPublic ? (
                      <Eye className="h-4 w-4 text-primary" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm text-muted-foreground">
                      {profileData.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  
                  <Button
                    variant={isEditing ? "outline" : "hero"}
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., New York, NY"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell others about yourself..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={profileData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Weekends, Evenings"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Visibility</Label>
                    <div className="text-sm text-muted-foreground">
                      Make your profile visible to other users
                    </div>
                  </div>
                  <Switch
                    checked={profileData.isPublic}
                    onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="space-y-6">
              {/* Skills Offered */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Skills I Offer</CardTitle>
                  <CardDescription>Skills you can teach to others</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.skillsOffered.map((skill) => (
                      <Badge key={skill} variant="default" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeSkill('offered', skill)}
                            className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newSkillOffered}
                        onChange={(e) => setNewSkillOffered(e.target.value)}
                        placeholder="Add a skill you offer"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill('offered')}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => addSkill('offered')}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills Wanted */}
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Skills I Want</CardTitle>
                  <CardDescription>Skills you want to learn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeSkill('wanted', skill)}
                            className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        value={newSkillWanted}
                        onChange={(e) => setNewSkillWanted(e.target.value)}
                        placeholder="Add a skill you want to learn"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill('wanted')}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => addSkill('wanted')}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-card border-0 shadow-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Skills Offered</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card text-center">
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-sm text-muted-foreground">Successful Swaps</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-0 shadow-card text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center space-x-1 text-2xl font-bold text-primary">
                  <Star className="h-6 w-6 fill-current" />
                  <span>4.9</span>
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;