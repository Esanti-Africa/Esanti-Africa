import { useState } from 'react';
import { Search, MapPin, Users, Target, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';

interface Milestone {
  id: string;
  title: string;
  amount: number;
  status: 'pending' | 'in-progress' | 'completed' | 'verified';
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  backers: number;
  image: string;
  creator: string;
  milestones: Milestone[];
  daysLeft: number;
  isVerified: boolean;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Clean Water Well for Kitui Village',
    description: 'Building a sustainable water well to provide clean drinking water for 500 families in rural Kenya.',
    category: 'Infrastructure',
    location: 'Kitui, Kenya',
    targetAmount: 500000,
    raisedAmount: 327500,
    backers: 234,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: 'Kitui Community Development',
    milestones: [
      { id: '1', title: 'Site survey and permits', amount: 50000, status: 'completed' },
      { id: '2', title: 'Drilling equipment', amount: 200000, status: 'completed' },
      { id: '3', title: 'Well construction', amount: 150000, status: 'in-progress' },
      { id: '4', title: 'Water quality testing', amount: 100000, status: 'pending' },
    ],
    daysLeft: 45,
    isVerified: true,
  },
  {
    id: '2',
    title: 'Girls Education Fund - Lagos',
    description: 'Providing school fees, uniforms, and supplies for 100 girls from low-income families.',
    category: 'Education',
    location: 'Lagos, Nigeria',
    targetAmount: 300000,
    raisedAmount: 285000,
    backers: 456,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: 'Educate Her Initiative',
    milestones: [
      { id: '1', title: 'Student selection', amount: 30000, status: 'completed' },
      { id: '2', title: 'School fees (Term 1)', amount: 120000, status: 'completed' },
      { id: '3', title: 'Uniforms and supplies', amount: 80000, status: 'verified' },
      { id: '4', title: 'School fees (Term 2)', amount: 70000, status: 'pending' },
    ],
    daysLeft: 60,
    isVerified: true,
  },
  {
    id: '3',
    title: 'Organic Farming Cooperative',
    description: 'Establishing a farmer-owned cooperative for organic vegetable production and local market distribution.',
    category: 'Agriculture',
    location: 'Kumasi, Ghana',
    targetAmount: 400000,
    raisedAmount: 165000,
    backers: 89,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: 'Kumasi Farmers Alliance',
    milestones: [
      { id: '1', title: 'Land lease and preparation', amount: 100000, status: 'completed' },
      { id: '2', title: 'Seeds and organic fertilizer', amount: 80000, status: 'in-progress' },
      { id: '3', title: 'Irrigation system', amount: 120000, status: 'pending' },
      { id: '4', title: 'Market infrastructure', amount: 100000, status: 'pending' },
    ],
    daysLeft: 90,
    isVerified: true,
  },
  {
    id: '4',
    title: 'Mobile Health Clinic - Rural Tanzania',
    description: 'Equipping a mobile clinic to serve remote villages with basic healthcare and maternal services.',
    category: 'Healthcare',
    location: 'Mwanza, Tanzania',
    targetAmount: 750000,
    raisedAmount: 423000,
    backers: 312,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    creator: 'Mwanza Health Partners',
    milestones: [
      { id: '1', title: 'Vehicle purchase', amount: 300000, status: 'completed' },
      { id: '2', title: 'Medical equipment', amount: 200000, status: 'in-progress' },
      { id: '3', title: 'Staff training', amount: 150000, status: 'pending' },
      { id: '4', title: 'First quarter operations', amount: 100000, status: 'pending' },
    ],
    daysLeft: 75,
    isVerified: true,
  },
];

interface ProjectsPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function ProjectsPage({ onBack = () => {}, canGoBack = false }: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || project.category === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'verified':
        return 'bg-blue-500';
      case 'in-progress':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Esanti Projects</h1>
          <p className="text-gray-600">Result-based crowdfunding for community development</p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: 'var(--esanti-green)' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-green)' }} />
              <div>
                <h3>Result-Based Funding</h3>
                <p className="text-gray-600 mt-1">
                  Funds are released after milestone verification with proof of delivery. Track every step of your backed
                  projects with transparency reports and community verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Tabs */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Education">Education</TabsTrigger>
              <TabsTrigger value="Healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="Infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="Agriculture">Agriculture</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const percentComplete = (project.raisedAmount / project.targetAmount) * 100;
            const completedMilestones = project.milestones.filter(m => m.status === 'completed' || m.status === 'verified').length;

            return (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-56">
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-gray-700 border-0">
                      {project.category}
                    </Badge>
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white border-0">
                      Verified
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <h3 className="mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {project.backers} backers
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.daysLeft} days
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        KES {project.raisedAmount.toLocaleString()} raised
                      </span>
                      <span className="text-sm" style={{ color: 'var(--esanti-green)' }}>
                        {percentComplete.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={percentComplete} className="h-2" />
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        Goal: KES {project.targetAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm">Milestones</span>
                      <span className="text-sm text-gray-600">
                        {completedMilestones} of {project.milestones.length} completed
                      </span>
                    </div>
                    <div className="space-y-2">
                      {project.milestones.map((milestone, idx) => (
                        <div key={milestone.id} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${getMilestoneStatusColor(milestone.status)}`}></div>
                          <span className="text-sm flex-1">{milestone.title}</span>
                          {milestone.status === 'verified' && (
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                          )}
                          {milestone.status === 'completed' && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0 flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90">
                    Back This Project
                  </Button>
                  <Button variant="outline">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No projects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
