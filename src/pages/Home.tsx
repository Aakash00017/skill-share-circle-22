import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Search, Star, ArrowRight, Handshake, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Find Skills",
      description: "Discover talented people with the skills you need to learn or collaborate with."
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Skill Exchange",
      description: "Trade your expertise for new knowledge in a mutually beneficial way."
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Build Reputation",
      description: "Get rated and build your reputation as a reliable skill-swap partner."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Safe Platform",
      description: "Our moderated platform ensures quality interactions and user safety."
    }
  ];

  const popularSkills = [
    "Web Development", "Graphic Design", "Photography", "Writing", 
    "Digital Marketing", "Data Analysis", "Language Learning", "Music Production"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Handshake className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SkillSwap
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-foreground/80 hover:text-foreground transition-colors">
              Browse Skills
            </Link>
            <Link to="/how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
              How it Works
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              🚀 Join 10,000+ skill swappers worldwide
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Exchange Skills,{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Grow Together
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with talented individuals to trade skills, learn new expertise, 
              and build meaningful professional relationships through our secure platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button variant="hero" size="lg" className="text-lg px-8" asChild>
                <Link to="/register">
                  Start Swapping Skills
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8" asChild>
                <Link to="/browse">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Skills
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Skills</h2>
            <p className="text-muted-foreground">Discover what people are learning and teaching</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {popularSkills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose SkillSwap?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform makes skill exchange simple, safe, and rewarding for everyone involved.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Skill Journey?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of learners and teachers who are already growing their skills together.
          </p>
          <Button variant="outline" size="lg" className="bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90" asChild>
            <Link to="/register">
              Create Your Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                  <Handshake className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold">SkillSwap</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting learners and teachers worldwide through skill exchange.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/browse" className="hover:text-foreground transition-colors">Browse Skills</Link></li>
                <li><Link to="/how-it-works" className="hover:text-foreground transition-colors">How it Works</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/safety" className="hover:text-foreground transition-colors">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 SkillSwap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;