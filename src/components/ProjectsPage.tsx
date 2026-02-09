import { useState, useEffect } from 'react';
import { Search, MapPin, Users, Target, CheckCircle, Clock, ArrowLeft, Heart, Shield, Play, Check, Lock, Camera, Info, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getProjects, Project } from '../data/projects';

interface ProjectsPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function ProjectsPage({ onBack = () => { }, canGoBack = false }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
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

  // Calculate percentage
  const getPercentage = (p: Project) => Math.min(100, Math.round((p.raisedAmount / p.targetAmount) * 100));

  // Detail View
  const [currentSlide, setCurrentSlide] = useState(0);

  if (selectedProject) {
    const percentComplete = Math.min(100, Math.round((selectedProject.raisedAmount / selectedProject.targetAmount) * 100));

    // Prepare slides: Video (if exists) + Image + Gallery
    const slides = [];
    if (selectedProject.videoUrl) slides.push({ type: 'video', url: selectedProject.videoUrl });
    slides.push({ type: 'image', url: selectedProject.image });
    if (selectedProject.gallery) {
      selectedProject.gallery.forEach(img => slides.push({ type: 'image', url: img }));
    }

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
      <div className="min-h-screen bg-gray-50 pt-16 pb-16">

        {/* TOP: Project Slide (Carousel) */}
        <div className="w-full bg-black relative h-[50vh] md:h-[60vh] group">
          <Button variant="ghost" className="absolute top-4 left-4 z-20 text-white hover:bg-white/20" onClick={() => setSelectedProject(null)}>
            <ArrowLeft className="w-6 h-6 mr-2" /> Back
          </Button>

          <div className="w-full h-full relative overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                {slide.type === 'video' ? (
                  <iframe
                    src={`${slide.url}?autoplay=0&mute=0&controls=1`}
                    className="w-full h-full object-cover"
                    title="Project Video"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <ImageWithFallback src={slide.url} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <Button variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10" onClick={prevSlide}>
                <ArrowLeft className="w-8 h-8" />
              </Button>
              <Button variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-10" onClick={nextSlide}>
                <ArrowLeft className="w-8 h-8 rotate-180" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-4' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* INTRO SECTION */}
          <div className="py-8 border-b border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{selectedProject.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-gray-400" /> {selectedProject.location}</span>
                  <span className="flex items-center gap-2"><Users className="w-5 h-5 text-gray-400" /> {selectedProject.backers} Backers</span>
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-gray-400" /> Duration: {Math.round(selectedProject.daysLeft * 1.5)} Days</span>
                  <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" /> Started: Oct 1, 2025</span>
                </div>
              </div>
              <Badge className="text-lg py-1 px-4 bg-green-100 text-green-800 border-green-200">{selectedProject.category}</Badge>
            </div>
          </div>

          {/* MAIN CONTENT GRID (25% - 45% - 25%) */}
          <div className="flex flex-col md:flex-row gap-8 relative items-start">

            {/* LEFT COLUMN (15%) - Sticky on Desktop, Stacked on Mobile */}
            <div className="w-full md:w-[15%] space-y-8 md:sticky md:top-24 md:self-start">

              {/* Funding Overview */}
              <Card className="shadow-md border-t-4 border-green-500">
                <CardHeader>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" /> Funding Overview
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Raised</span>
                      <span className="font-bold text-gray-900">{selectedProject.raisedAmount.toLocaleString()} FCFA</span>
                    </div>
                    <Progress value={percentComplete} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{percentComplete}%</span>
                      <span>Goal: {selectedProject.targetAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Remaining</span>
                      <span className="font-bold text-orange-600">{(selectedProject.targetAmount - selectedProject.raisedAmount).toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Roadmap */}
              <Card className="shadow-md">
                <CardHeader>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" /> Roadmap
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                    {selectedProject.milestones.map((milestone, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className={`absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white ${milestone.status === 'completed' ? 'bg-green-500' : milestone.status === 'in-progress' ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{milestone.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{milestone.amount.toLocaleString()} FCFA</p>
                        <Badge variant="outline" className="mt-1 text-[10px] px-1 py-0 h-5">{milestone.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* CENTER COLUMN (70%) - Scrollable */}
            <div className="w-full md:w-[70%] space-y-8">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <h2 className="text-3xl font-bold text-gray-900">The Story</h2>
                </CardHeader>
                <CardContent className="prose prose-lg text-gray-700 max-w-none">
                  <p className="lead text-xl text-gray-600 italic border-l-4 border-green-500 pl-4 py-2 bg-gray-50 mb-8 rounded-r-lg">
                    {selectedProject.description}
                  </p>

                  {selectedProject.detailedDescription ? (
                    <div className="whitespace-pre-line space-y-4">
                      {selectedProject.detailedDescription}
                    </div>
                  ) : (
                    <p>No detailed description available.</p>
                  )}

                  <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <h3 className="text-lg font-bold text-blue-900 mb-2">Why this matters</h3>
                    <p className="text-blue-800">
                      This project directly impacts the local community by providing sustainable resources and empowering local leadership.
                      Your support ensures that these milestones are met with transparency and efficiency.
                    </p>
                  </div>


                </CardContent>
              </Card>
            </div>

            {/* RIGHT COLUMN (15%) - Sticky on Desktop, Stacked on Mobile */}
            <div className="w-full md:w-[15%] space-y-8 md:sticky md:top-24 md:self-start">
              {/* Support Project */}
              <Card className="shadow-xl border-green-500 border-t-2">
                <CardHeader className="bg-green-50 border-b border-green-100">
                  <h3 className="text-lg font-bold text-green-900">Support this Project</h3>
                  <p className="text-xs text-green-700">Help us reach the next milestone</p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-2">
                    {[2000, 5000, 10000, 25000].map(amt => (
                      <Button key={amt} variant="outline" className="text-xs hover:bg-green-50 hover:text-green-700 hover:border-green-300">
                        {amt.toLocaleString()}
                      </Button>
                    ))}
                  </div>

                  <Button className="w-full h-12 text-lg font-bold bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200">
                    Donate Now
                  </Button>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-[10px]">MTN</div>
                      <div>
                        <div className="font-bold text-xs text-gray-900">MTN Mobile Money</div>
                        <div className="text-[10px] text-gray-500">Tap to copy number</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-[10px] text-white">OM</div>
                      <div>
                        <div className="font-bold text-xs text-gray-900">Orange Money</div>
                        <div className="text-[10px] text-gray-500">Tap to copy number</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400">
                    <Shield className="w-3 h-3" /> Secure SSL Payment
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>

          {/* BOTTOM: Email Updates */}
          <div className="mt-16 mb-8">
            <div className="bg-gray-100 border border-gray-200 rounded-2xl p-8 md:p-12 text-center text-gray-900 relative overflow-hidden">
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <Badge className="bg-green-600 text-white hover:bg-green-700 border-0">Stay Updated</Badge>
                <h2 className="text-3xl font-bold text-black">Follow this project's journey</h2>
                <p className="text-gray-900 font-medium">
                  Receive real-time notifications when milestones are achieved are verified by our team.
                  No spam, just impact.
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input placeholder="Enter your email address" className="bg-white border-gray-300 text-black placeholder:text-gray-500" />
                  <Button className="bg-black hover:bg-gray-800 text-white">Subscribe</Button>
                </div>
              </div>

              {/* Background decorations */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
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

        {/* Header Section */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Community Projects</h1>
          <p className="text-gray-600 text-lg mb-4">
            Invest in verified initiatives transforming our digital nation.
            We take responsibility to solve the problems in our community and Cameroon.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-green-600 text-green-700">Transparency</Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">Accountability</Badge>
            <Badge variant="outline" className="border-green-600 text-green-700">Community Driven</Badge>
          </div>
        </div>

        {/* Info Card - Transparency */}
        <Card className="mb-8 border-l-4 bg-gradient-to-r from-green-50 to-transparent border-green-600">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 mt-1 text-green-600" />
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
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto bg-gray-100 p-1">
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
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full"
                onClick={() => {
                  setSelectedProject(project);
                  window.scrollTo(0, 0);
                }}
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm shadow-sm hover:bg-white">{project.category}</Badge>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-green-700 transition-colors">{project.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Raised</span>
                      <span className="font-bold text-green-700">{project.raisedAmount.toLocaleString()} FCFA</span>
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
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
