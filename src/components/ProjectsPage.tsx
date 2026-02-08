import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Target, CheckCircle, Clock, ArrowLeft, Heart, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';
import { getProjects, Project } from '../data/projects'; // Import data service

interface ProjectsPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function ProjectsPage({ onBack = () => { }, canGoBack = false }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || project.category === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'verified': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      default: return 'bg-gray-300';
    }
  };

  // Detail View
  if (selectedProject) {
    const percentComplete = (selectedProject.raisedAmount / selectedProject.targetAmount) * 100;

    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => setSelectedProject(null)}>
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Button>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-96 w-full">
              <ImageWithFallback
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                <div className="p-8 text-white w-full">
                  <Badge className="mb-2 bg-green-600 hover:bg-green-700 pointer-events-none">{selectedProject.category}</Badge>
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">{selectedProject.title}</h1>
                  <div className="flex items-center gap-6 text-sm md:text-base font-medium opacity-90">
                    <span className="flex items-center gap-1.5"><MapPin className="w-5 h-5 text-[var(--esanti-yellow)]" /> {selectedProject.location}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-5 h-5 text-[var(--esanti-orange)]" /> {selectedProject.backers} backers</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-5 h-5 text-[var(--esanti-red)]" /> {selectedProject.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-700" />
                    About this Project
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {selectedProject.detailedDescription || selectedProject.description}
                  </p>

                  {/* Video Section */}
                  {selectedProject.videoUrl && (
                    <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="aspect-w-16 aspect-h-9 bg-black">
                        {/* Using iframe for demo purposes, in production use a proper video component */}
                        <iframe
                          width="100%"
                          height="450"
                          src={selectedProject.videoUrl}
                          title="Project Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-700" />
                    Milestones & Progress
                  </h3>
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {selectedProject.milestones.map((milestone, index) => (
                      <div key={milestone.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Dot */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 
                            ${milestone.status === 'verified' ? 'bg-green-500' :
                            milestone.status === 'completed' ? 'bg-blue-500' :
                              milestone.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-300'}
                        `}>
                          {milestone.status === 'verified' && <CheckCircle className="w-4 h-4 text-white" />}
                          {milestone.status === 'in-progress' && <Clock className="w-4 h-4 text-white animate-pulse" />}
                        </div>

                        {/* Content */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-gray-900">{milestone.title}</h4>
                            <Badge variant={milestone.status === 'verified' ? 'default' : 'secondary'} className={`
                                ${getMilestoneStatusColor(milestone.status).replace('bg-', 'bg-')}/10 text-${getMilestoneStatusColor(milestone.status).replace('bg-', '')}-700 border-0
                             `}>
                              {milestone.status.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 font-mono mb-2">{milestone.amount.toLocaleString()} FCFA</p>
                          {milestone.description && (
                            <p className="text-sm text-gray-600 border-t pt-2 mt-2">{milestone.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="bg-blue-50 p-6 rounded-lg text-blue-800 border-l-4 border-blue-600">
                  <h4 className="font-bold flex items-center gap-2 mb-2"><CheckCircle className="w-5 h-5" /> Radical Transparency</h4>
                  <p className="text-sm">
                    We update all donation amounts daily at <strong>9:00 PM GMT+1</strong>.
                    Every transaction is logged and publicly visible.
                    Any funds raised exceeding a specific milestone requirement are strictly
                    protected and automatically allocated to the next subsequent project milestone.
                  </p>
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="bg-gray-50 p-6 rounded-xl sticky top-24 border border-gray-200 shadow-sm">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Raised</span>
                      <span>Target</span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="text-2xl font-bold text-green-700">{selectedProject.raisedAmount.toLocaleString()} FCFA</span>
                      <span className="text-sm text-gray-500">of {selectedProject.targetAmount.toLocaleString()} FCFA</span>
                    </div>
                    <Progress value={percentComplete} className="h-3 mb-2" />
                    <p className="text-xs text-right text-gray-500">{percentComplete.toFixed(0)}% Funded</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-[#ff7900] text-white p-6 rounded-xl text-center shadow-lg transform hover:-translate-y-1 transition-transform border-2 border-white/20">
                      <div className="mb-2 bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Phone className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-xl mb-2">Orange Money</p>
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold font-mono tracking-wider bg-black/20 py-2 rounded-lg">
                        +237 69x xxx xxx
                      </div>
                    </div>

                    <div className="bg-[#ffcc00] text-black p-6 rounded-xl text-center shadow-lg transform hover:-translate-y-1 transition-transform border-2 border-black/10">
                      <div className="mb-2 bg-black/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                        <Phone className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-xl mb-2">MTN Mobile Money</p>
                      <div className="flex items-center justify-center gap-2 text-2xl font-bold font-mono tracking-wider bg-white/40 py-2 rounded-lg">
                        +237 67x xxx xxx
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                    <strong>Important:</strong> When sending money, please specify the project name in the reference/message field so funds are allocated correctly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />

        {/* Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Community Projects</h1>
          <p className="text-gray-600 text-lg mb-4">
            Community backed, funded, and supported projects are what make the difference.
            We take responsibility to solve the problems in our community and Cameroon.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-green-600 text-green-700">Transparency</Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">Accountability</Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">Community Driven</Badge>
          </div>
        </div>

        {/* Info Card - Transparency */}
        <Card className="mb-8 border-l-4 bg-gradient-to-r from-green-50 to-transparent" style={{ borderLeftColor: 'var(--esanti-green)' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-green)' }} />
              <div>
                <h3 className="font-bold text-lg">Radical Transparency & Accountability</h3>
                <p className="text-gray-600 mt-1">
                  We value transparency. All transaction logs and fund usage are publicly shown for donors and potential donors.
                  Donated amounts are updated every day at <strong>9:00 PM GMT+1</strong>.
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
                placeholder="Search projects by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Education">Education</TabsTrigger>
              <TabsTrigger value="Healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="Infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="Agriculture">Agriculture</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const percentComplete = (project.raisedAmount / project.targetAmount) * 100;

            return (
              <div
                key={project.id}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-gray-800 backdrop-blur-sm shadow-sm">{project.category}</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-green-700 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Raised</span>
                      <span className="font-bold">{project.raisedAmount.toLocaleString()} FCFA</span>
                    </div>
                    <Progress value={percentComplete} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{percentComplete.toFixed(0)}%</span>
                      <span>Goal: {project.targetAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {project.daysLeft} days left</span>
                  </div>
                </div>

                {/* Hover Overlay Effect */}
                <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/5 transition-colors duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
