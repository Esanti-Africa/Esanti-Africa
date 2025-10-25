import { useState } from 'react';
import { Filter, Search, ShoppingCart, Star, Award, Verified } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BackButton } from './BackButton';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  seller: string;
  sellerRank: string;
  isCitizenOnly: boolean;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium African Design Templates',
    description: 'Beautiful design templates inspired by African art and culture',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Digital Goods',
    seller: 'Kwame Design Studio',
    sellerRank: 'Gold',
    isCitizenOnly: false,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Esanti Africa Branded T-Shirt',
    description: 'Premium cotton t-shirt with Esanti Africa logo',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Merch',
    seller: 'Esanti Official Store',
    sellerRank: 'Platinum',
    isCitizenOnly: false,
    rating: 5.0,
  },
  {
    id: '3',
    title: 'Mobile App Premium Access (1 Year)',
    description: 'Full access to Esanti mobile app premium features',
    price: 5000,
    image: 'https://images.unsplash.com/photo-1758876202167-f81c995c3fdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZGlnaXRhbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5NTgzNDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Subscriptions',
    seller: 'Esanti Official Store',
    sellerRank: 'Platinum',
    isCitizenOnly: true,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'African Business Mentorship Session',
    description: '1-hour mentorship with successful African entrepreneur',
    price: 3000,
    image: 'https://images.unsplash.com/photo-1624695493609-c7cb60e7e583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc1OTU2OTE3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Services',
    seller: 'Amara Consulting',
    sellerRank: 'Silver',
    isCitizenOnly: true,
    rating: 4.7,
  },
  {
    id: '5',
    title: 'African Pattern Graphics Pack',
    description: '100+ high-quality African-inspired graphics and patterns',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Digital Goods',
    seller: 'Nala Creative',
    sellerRank: 'Gold',
    isCitizenOnly: false,
    rating: 4.6,
  },
  {
    id: '6',
    title: 'Esanti Coffee Mug Set',
    description: 'Set of 2 premium ceramic mugs with African designs',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1734255074937-4b446b8dcf18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFya2V0cGxhY2UlMjB2ZW5kb3JzfGVufDF8fHx8MTc1OTU4MzQyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Merch',
    seller: 'Esanti Official Store',
    sellerRank: 'Platinum',
    isCitizenOnly: false,
    rating: 4.9,
  },
];

interface MarketplacePageProps {
  onBack?: () => void;
  canGoBack?: boolean;
}

export function MarketplacePage({ onBack = () => {}, canGoBack = false }: MarketplacePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getRankColor = (rank: string) => {
    const colors: Record<string, string> = {
      Bronze: 'bg-amber-700',
      Silver: 'bg-gray-400',
      Gold: 'bg-yellow-500',
      Platinum: 'bg-purple-600',
    };
    return colors[rank] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton onBack={onBack} canGoBack={canGoBack} />
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Esanti Marketplace</h1>
          <p className="text-gray-600">Curated digital products, merchandise, and services for the African community</p>
        </div>

        {/* Info Card */}
        <Card className="mb-8 border-l-4" style={{ borderLeftColor: 'var(--esanti-green)' }}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Verified className="w-6 h-6 mt-1" style={{ color: 'var(--esanti-green)' }} />
              <div>
                <h3>Curated Marketplace</h3>
                <p className="text-gray-600 mt-1">
                  All products and sellers are verified and curated to ensure high quality and ethical standards.
                  Citizens can create stores after verification.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Digital Goods">Digital Goods</SelectItem>
                <SelectItem value="Merch">Merchandise</SelectItem>
                <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                <SelectItem value="Services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  {product.isCitizenOnly && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white border-0">
                      Citizen Only
                    </Badge>
                  )}
                  <Badge className="absolute top-3 left-3 bg-white text-gray-700 border-0">
                    {product.category}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <h3 className="mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{product.seller}</span>
                    <Badge className={`${getRankColor(product.sellerRank)} text-white border-0 text-xs`}>
                      {product.sellerRank}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">KES</span>
                    <span className="text-xl ml-1" style={{ color: 'var(--esanti-dark-green)' }}>
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button className="w-full bg-gradient-to-r from-[var(--esanti-green)] to-[var(--esanti-dark-green)] text-white hover:opacity-90">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
