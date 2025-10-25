import { useState } from 'react';
import { Search, Play, Radio, MessageCircle, Heart, Verified, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  type: 'article' | 'audio' | 'video' | 'live';
  author: string;
  authorAvatar: string;
  isVerified: boolean;
  isDonor: boolean;
  image: string;
  publishedAt: string;
  views: number;
  comments: number;
  category: string;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'The Future of African Tech Startups in 2025',
    excerpt: 'An in-depth analysis of emerging trends in African technology ecosystem and opportunities for growth...',
    type: 'article',
    author: 'Amina Hassan',
    authorAvatar: '',
    isVerified: true,
    isDonor: true,
    image: 'https://images.unsplash.com/photo-1758876202167-f81c995c3fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5NTgzNDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '2 hours ago',
    views: 1234,
    comments: 45,
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Live: Community Discussion on Education Reform',
    excerpt: 'Join us for a live discussion with educators and policy makers about improving education across Africa...',
    type: 'live',
    author: 'Kwame Mensah',
    authorAvatar: '',
    isVerified: true,
    isDonor: false,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: 'Live now',
    views: 532,
    comments: 89,
    category: 'Education',
  },
  {
    id: '3',
    title: 'Agricultural Innovation in West Africa',
    excerpt: 'Exploring new farming techniques and sustainable agriculture practices that are transforming communities...',
    type: 'video',
    author: 'Fatima Okonkwo',
    authorAvatar: '',
    isVerified: true,
    isDonor: true,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '1 day ago',
    views: 2456,
    comments: 67,
    category: 'Agriculture',
  },
  {
    id: '4',
    title: 'Podcast: African Entrepreneurship Stories',
    excerpt: 'Listen to inspiring stories from successful African entrepreneurs who built businesses from scratch...',
    type: 'audio',
    author: 'David Mwangi',
    authorAvatar: '',
    isVerified: false,
    isDonor: false,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '3 days ago',
    views: 3421,
    comments: 102,
    category: 'Business',
  },
  {
    id: '5',
    title: 'Climate Action in East Africa',
    excerpt: 'Communities come together to tackle climate change through local initiatives and sustainable practices...',
    type: 'article',
    author: 'Sarah Njeri',
    authorAvatar: '',
    isVerified: true,
    isDonor: true,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '5 days ago',
    views: 1876,
    comments: 54,
    category: 'Environment',
  },
  {
    id: '6',
    title: 'Cultural Preservation Through Digital Archives',
    excerpt: 'How African communities are using technology to preserve languages, traditions, and cultural heritage...',
    type: 'video',
    author: 'Chinelo Adebayo',
    authorAvatar: '',
    isVerified: true,
    isDonor: false,
    image: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedAt: '1 week ago',
    views: 2987,
    comments: 78,
    category: 'Culture',
  },
];

interface NewsPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function NewsPage({ onBack = () => {}, canGoBack = false }: NewsPageProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'live':
        return <Radio className="w-4 h-4" />;
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'audio':
        return <Play className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'video':
        return 'bg-blue-500 text-white';
      case 'audio':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredNews = mockNews.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || 
                       (selectedTab === 'verified' && news.isVerified) ||
                       (selectedTab === 'live' && news.type === 'live');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Esanti News</h1>
          <p className="text-gray-600">Community-driven news, stories, and live discussions</p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: 'var(--esanti-orange)' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Verified className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-orange)' }} />
              <div>
                <h3>Creator Channels & Verification</h3>
                <p className="text-gray-600 mt-1">
                  Verified creators can share articles, audio, video, and live streams. Viewers can support creators with credits
                  redeemable in the marketplace.
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
                placeholder="Search news and stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="verified">Verified Only</TabsTrigger>
              <TabsTrigger value="live">Live Now</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  {news.type !== 'article' && (
                    <Badge className={`absolute top-3 left-3 ${getTypeBadgeColor(news.type)} border-0 flex items-center`}>
                      {getTypeIcon(news.type)}
                      <span className="ml-1 capitalize">{news.type}</span>
                    </Badge>
                  )}
                  {news.type === 'live' && (
                    <div className="absolute top-3 right-3 flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      <span>LIVE</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs" style={{ backgroundColor: 'var(--esanti-yellow)', color: 'var(--esanti-dark-green)' }}>
                  {news.category}
                </Badge>
                <h3 className="mb-2 line-clamp-2">{news.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{news.excerpt}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{news.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">{news.author}</span>
                        {news.isVerified && (
                          <Verified className="w-3 h-3" style={{ color: 'var(--esanti-green)' }} />
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{news.publishedAt}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{news.views.toLocaleString()} views</span>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {news.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90">
                  {news.type === 'live' ? 'Join Live' : 'Read More'}
                </Button>
                <Button variant="outline" size="icon" style={{ color: 'var(--esanti-orange)' }}>
                  <DollarSign className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No news found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
