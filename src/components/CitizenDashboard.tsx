import { ShoppingBag, BookOpen, Newspaper, Briefcase, Heart, Award, CreditCard, Store } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BackButton } from './BackButton';

interface CitizenDashboardProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function CitizenDashboard({ onBack = () => {}, canGoBack = false }: CitizenDashboardProps) {
  const citizenData = {
    id: 'ES-2025-00234',
    name: 'Amara Okafor',
    joinDate: 'January 15, 2025',
    donorRank: 'Gold',
    totalDonations: 45000,
    credits: 1250,
    projectsBacked: 8,
    booksDownloaded: 23,
    newsSubscriptions: 5,
  };

  const donorRanks = [
    { name: 'Bronze', min: 0, max: 10000, color: 'bg-amber-700' },
    { name: 'Silver', min: 10000, max: 25000, color: 'bg-gray-400' },
    { name: 'Gold', min: 25000, max: 50000, color: 'bg-yellow-500' },
    { name: 'Platinum', min: 50000, max: Infinity, color: 'bg-purple-600' },
  ];

  const currentRank = donorRanks.find(r => r.name === citizenData.donorRank);
  const nextRank = donorRanks[donorRanks.findIndex(r => r.name === citizenData.donorRank) + 1];
  const progressToNextRank = nextRank 
    ? ((citizenData.totalDonations - (currentRank?.min || 0)) / (nextRank.min - (currentRank?.min || 0))) * 100
    : 100;

  const backedProjects = [
    { id: '1', title: 'Clean Water Well - Kitui', status: 'In Progress', contribution: 5000 },
    { id: '2', title: 'Girls Education Fund', status: 'Completed', contribution: 10000 },
    { id: '3', title: 'Mobile Health Clinic', status: 'In Progress', contribution: 7500 },
  ];

  const recentActivity = [
    { type: 'donation', title: 'Donated to Clean Water Well', date: 'Oct 3, 2025', amount: 5000 },
    { type: 'book', title: 'Downloaded "Things Fall Apart"', date: 'Oct 2, 2025' },
    { type: 'purchase', title: 'Purchased Premium Templates', date: 'Oct 1, 2025', amount: 2500 },
    { type: 'subscription', title: 'Subscribed to Tech News Channel', date: 'Sep 30, 2025' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Citizen Dashboard</h1>
          <p className="text-gray-600">Welcome back, {citizenData.name}</p>
        </div>

        {/* Citizen ID Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-br from-[var(--esanti-red)] via-[var(--esanti-yellow)] to-[var(--esanti-green)] p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm opacity-90 mb-1">Citizen ID</div>
                <div className="text-3xl mb-4">{citizenData.id}</div>
                <div className="text-xl mb-1">{citizenData.name}</div>
                <div className="text-sm opacity-90">Member since {citizenData.joinDate}</div>
              </div>
              <div className="flex flex-col items-end">
                <Badge className={`${currentRank?.color} text-white border-0 mb-2 text-lg px-4 py-2`}>
                  {citizenData.donorRank}
                </Badge>
                <div className="text-sm opacity-90">Donor Rank</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Heart className="w-8 h-8" style={{ color: 'var(--esanti-red)' }} />
                <span className="text-2xl">KES {citizenData.totalDonations.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-600">Total Donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <CreditCard className="w-8 h-8" style={{ color: 'var(--esanti-yellow)' }} />
                <span className="text-2xl">{citizenData.credits}</span>
              </div>
              <p className="text-sm text-gray-600">Available Credits</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-8 h-8" style={{ color: 'var(--esanti-green)' }} />
                <span className="text-2xl">{citizenData.projectsBacked}</span>
              </div>
              <p className="text-sm text-gray-600">Projects Backed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8" style={{ color: 'var(--esanti-orange)' }} />
                <span className="text-2xl">{citizenData.booksDownloaded}</span>
              </div>
              <p className="text-sm text-gray-600">Books Downloaded</p>
            </CardContent>
          </Card>
        </div>

        {/* Donor Progress */}
        {nextRank && (
          <Card className="mb-8">
            <CardHeader>
              <h3>Donor Rank Progress</h3>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Progress to {nextRank.name}</span>
                  <span className="text-sm" style={{ color: 'var(--esanti-green)' }}>
                    {progressToNextRank.toFixed(0)}%
                  </span>
                </div>
                <Progress value={progressToNextRank} className="h-3 mb-2" />
                <p className="text-xs text-gray-600">
                  KES {(nextRank.min - citizenData.totalDonations).toLocaleString()} more to reach {nextRank.name} rank
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="projects" className="mb-8">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="projects">Backed Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="store">My Store</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <div className="space-y-4">
              {backedProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="mb-1">{project.title}</h4>
                        <p className="text-sm text-gray-600">
                          Your contribution: KES {project.contribution.toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        className={
                          project.status === 'Completed'
                            ? 'bg-green-500 text-white'
                            : 'bg-yellow-500 text-white'
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--esanti-green)] to-[var(--esanti-dark-green)] flex items-center justify-center text-white">
                        {activity.type === 'donation' && <Heart className="w-5 h-5" />}
                        {activity.type === 'book' && <BookOpen className="w-5 h-5" />}
                        {activity.type === 'purchase' && <ShoppingBag className="w-5 h-5" />}
                        {activity.type === 'subscription' && <Newspaper className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{activity.title}</h4>
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                      {activity.amount && (
                        <div className="text-right">
                          <p className="font-medium" style={{ color: 'var(--esanti-dark-green)' }}>
                            KES {activity.amount.toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Newspaper className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h4 className="mb-2">News Subscriptions</h4>
                  <p className="text-gray-600 mb-4">
                    You are subscribed to {citizenData.newsSubscriptions} news channels
                  </p>
                  <Button className="bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white">
                    Manage Subscriptions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="store" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Store className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h4 className="mb-2">Your Marketplace Store</h4>
                  <p className="text-gray-600 mb-4">
                    Create a verified store to sell your products and services
                  </p>
                  <Button className="bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white">
                    Create Store
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
