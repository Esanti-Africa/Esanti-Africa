import { useState } from 'react';
import { Search, Download, Play, Heart, BookOpen, Headphones, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  language: string;
  isFree: boolean;
  price?: number;
  hasAudiobook: boolean;
  coverImage: string;
  downloads: number;
}

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    description: 'A classic novel about pre-colonial life in Nigeria and the arrival of European colonizers',
    genre: 'Fiction',
    language: 'English',
    isFree: true,
    hasAudiobook: true,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 12453,
  },
  {
    id: '2',
    title: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    description: 'A powerful story of the Biafran War through the eyes of three characters',
    genre: 'Historical Fiction',
    language: 'English',
    isFree: false,
    price: 1200,
    hasAudiobook: true,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 8234,
  },
  {
    id: '3',
    title: 'The African Origin of Civilization',
    author: 'Cheikh Anta Diop',
    description: 'Groundbreaking work on the African roots of civilization and culture',
    genre: 'Non-Fiction',
    language: 'English',
    isFree: true,
    hasAudiobook: false,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 15678,
  },
  {
    id: '4',
    title: 'Nervous Conditions',
    author: 'Tsitsi Dangarembga',
    description: 'Coming-of-age story set in post-colonial Rhodesia (Zimbabwe)',
    genre: 'Fiction',
    language: 'English',
    isFree: true,
    hasAudiobook: true,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 6543,
  },
  {
    id: '5',
    title: 'Born a Crime',
    author: 'Trevor Noah',
    description: 'Stories from a South African childhood during and after apartheid',
    genre: 'Memoir',
    language: 'English',
    isFree: false,
    price: 1500,
    hasAudiobook: true,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 21345,
  },
  {
    id: '6',
    title: 'Americanah',
    author: 'Chimamanda Ngozi Adichie',
    description: 'A love story that explores race, identity, and immigration',
    genre: 'Fiction',
    language: 'English',
    isFree: false,
    price: 1400,
    hasAudiobook: true,
    coverImage: 'https://images.unsplash.com/photo-1567537146932-6f80e0b71a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc1OTU4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    downloads: 9876,
  },
];

interface BooksPageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function BooksPage({ onBack = () => {}, canGoBack = false }: BooksPageProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFreeOnly, setShowFreeOnly] = useState<boolean>(false);
  const [partnershipDialogOpen, setPartnershipDialogOpen] = useState<boolean>(false);

  const filteredBooks = mockBooks.filter((book) => {
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFree = !showFreeOnly || book.isFree;
    return matchesGenre && matchesSearch && matchesFree;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-3">Esanti Books</h1>
          <p className="text-xl text-gray-700 mb-2 italic max-w-3xl mx-auto" style={{ color: 'var(--esanti-dark-green)' }}>
            "Our identity. Our story. Written and told by Africans, for the world."
          </p>
          <p className="text-gray-600">Free African book library with author support programs</p>
        </div>

        {/* Partnership Banner */}
        <Card className="mb-8 overflow-hidden border-0">
          <div className="bg-gradient-to-r from-[var(--esanti-orange)] to-[var(--esanti-red)] p-8 text-white">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="w-6 h-6" />
                    <h2>Author Partnership Program</h2>
                  </div>
                  <p className="text-white/90 mb-4">
                    We partner with African authors to sponsor, publish, and market your book. Get professional editing, cover design, audiobook production, and global distribution support.
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Free Publishing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Marketing Support</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Headphones className="w-4 h-4" />
                      <span>Audiobook Production</span>
                    </div>
                  </div>
                </div>
                <Dialog open={partnershipDialogOpen} onOpenChange={setPartnershipDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-white text-[var(--esanti-red)] hover:bg-white/90 shrink-0">
                      Apply for Partnership
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Author Partnership Application</DialogTitle>
                    </DialogHeader>
                    <PartnershipForm onClose={() => setPartnershipDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4" style={{ borderLeftColor: 'var(--esanti-orange)' }}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <BookOpen className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-orange)' }} />
                <div>
                  <h3>Free Library Access</h3>
                  <p className="text-gray-600 mt-1">
                    Download and read thousands of African books for free. Support authors through donations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4" style={{ borderLeftColor: 'var(--esanti-green)' }}>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Headphones className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-green)' }} />
                <div>
                  <h3>Commission-Based Sales</h3>
                  <p className="text-gray-600 mt-1">
                    Authors earn commissions on book sales. We handle distribution, payments, and formatting.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Fiction">Fiction</SelectItem>
                <SelectItem value="Historical Fiction">Historical Fiction</SelectItem>
                <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                <SelectItem value="Memoir">Memoir</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showFreeOnly ? "default" : "outline"}
              onClick={() => setShowFreeOnly(!showFreeOnly)}
              className={showFreeOnly ? "bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white" : ""}
            >
              Free Books Only
            </Button>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-64">
                  <ImageWithFallback
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {book.isFree && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white border-0">
                      FREE
                    </Badge>
                  )}
                  {book.hasAudiobook && (
                    <Badge className="absolute top-3 right-3 bg-white text-gray-700 border-0 flex items-center">
                      <Headphones className="w-3 h-3 mr-1" />
                      Audiobook
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <Badge className="mb-2 text-xs" style={{ backgroundColor: 'var(--esanti-yellow)', color: 'var(--esanti-dark-green)' }}>
                  {book.genre}
                </Badge>
                <h3 className="mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{book.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{book.downloads.toLocaleString()} downloads</span>
                  {!book.isFree && (
                    <span className="font-medium" style={{ color: 'var(--esanti-dark-green)' }}>
                      KES {book.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90">
                  <Download className="w-4 h-4 mr-2" />
                  {book.isFree ? 'Download' : 'Purchase'}
                </Button>
                {book.hasAudiobook && (
                  <Button variant="outline" size="icon">
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon" style={{ color: 'var(--esanti-red)' }}>
                  <Heart className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No books found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PartnershipForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    authorName: '',
    email: '',
    phone: '',
    bookTitle: '',
    genre: '',
    description: '',
    manuscriptStatus: '',
    previousPublications: '',
    targetAudience: '',
    marketingPlan: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the partnership application
    alert('Thank you for your application! Our team will review it and get back to you within 5 business days.');
    onClose();
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="bg-gradient-to-r from-[var(--esanti-yellow)]/10 to-[var(--esanti-orange)]/10 p-4 rounded-lg">
        <h4 className="mb-2" style={{ color: 'var(--esanti-dark-green)' }}>What We Offer</h4>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Professional editing and proofreading</li>
          <li>• Cover design and formatting (ebook & print)</li>
          <li>• Audiobook production with professional narrators</li>
          <li>• Marketing campaigns and social media promotion</li>
          <li>• Distribution on Esanti platform and partner stores</li>
          <li>• Author dashboard with sales analytics</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="authorName">Author Name *</Label>
          <Input
            id="authorName"
            value={formData.authorName}
            onChange={(e) => updateField('authorName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bookTitle">Book Title *</Label>
          <Input
            id="bookTitle"
            value={formData.bookTitle}
            onChange={(e) => updateField('bookTitle', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Genre *</Label>
          <Select value={formData.genre} onValueChange={(value) => updateField('genre', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiction">Fiction</SelectItem>
              <SelectItem value="non-fiction">Non-Fiction</SelectItem>
              <SelectItem value="memoir">Memoir/Biography</SelectItem>
              <SelectItem value="poetry">Poetry</SelectItem>
              <SelectItem value="children">Children's Literature</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Book Description/Synopsis *</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Provide a brief synopsis of your book (200-500 words)"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="manuscriptStatus">Manuscript Status *</Label>
        <Select value={formData.manuscriptStatus} onValueChange={(value) => updateField('manuscriptStatus', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="complete">Complete and ready</SelectItem>
            <SelectItem value="editing">Complete, needs editing</SelectItem>
            <SelectItem value="draft">First draft completed</SelectItem>
            <SelectItem value="progress">Work in progress</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="previousPublications">Previous Publications (Optional)</Label>
        <Textarea
          id="previousPublications"
          rows={3}
          value={formData.previousPublications}
          onChange={(e) => updateField('previousPublications', e.target.value)}
          placeholder="List any previously published works or relevant writing experience"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience *</Label>
        <Input
          id="targetAudience"
          value={formData.targetAudience}
          onChange={(e) => updateField('targetAudience', e.target.value)}
          placeholder="e.g., Young adults, African diaspora, business professionals"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="marketingPlan">Your Marketing Ideas (Optional)</Label>
        <Textarea
          id="marketingPlan"
          rows={3}
          value={formData.marketingPlan}
          onChange={(e) => updateField('marketingPlan', e.target.value)}
          placeholder="Do you have any ideas for promoting your book? Existing platform or audience?"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-[var(--esanti-orange)] to-[var(--esanti-red)] text-white hover:opacity-90"
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
}
