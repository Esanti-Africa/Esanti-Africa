
import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { getBlogPosts, BlogPost } from '../data/blog';

interface BlogPageProps {
    onBack?: () => void;
    canGoBack?: boolean;
}

export function BlogPage({ onBack = () => { }, canGoBack = false }: BlogPageProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        setPosts(getBlogPosts().filter(p => p.status === 'published'));
    }, []);

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => setSelectedPost(null)}>
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Button>

                    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-96 object-cover" />
                        <div className="p-8 md:p-12">
                            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                <Badge variant="secondary">{selectedPost.author}</Badge>
                                <span>{selectedPost.date}</span>
                                <span>{selectedPost.readTime}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">{selectedPost.title}</h1>
                            <div className="prose prose-lg max-w-none prose-green">
                                {selectedPost.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4 text-gray-700 leading-relaxed text-lg">{line}</p>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 border-t border-gray-100 bg-gray-50">
                            <h3 className="font-bold text-lg mb-2">Subscribe to our newsletter</h3>
                            <p className="text-gray-600 mb-4">Get the latest impact stories directly in your inbox.</p>
                            <div className="flex gap-2 max-w-sm">
                                <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 border rounded-md" />
                                <Button>Subscribe</Button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center md:mb-12 mb-8">
                    <h1 className="text-4xl font-bold mb-4">Impact Stories</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Read about the incredible change happening across Africa, driven by our community and partners.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col"
                            onClick={() => {
                                setSelectedPost(post);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <div className="h-56 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                                    <span className="font-medium text-green-700">{post.readTime}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-green-700 font-medium group-hover:gap-2 transition-all">
                                    Read Story <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
