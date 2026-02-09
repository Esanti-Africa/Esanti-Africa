
import { useState, useEffect } from 'react';
import { Mail, ArrowLeft, ArrowRight, User, Calendar, Clock, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { getBlogPosts, BlogPost, Comment, addComment, getCategories } from '../data/blog';

interface BlogPageProps {
    onBack?: () => void;
    canGoBack?: boolean;
}

export function BlogPage({ onBack = () => { }, canGoBack = false }: BlogPageProps) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    // Comment State
    const [commentName, setCommentName] = useState('');
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        setPosts(getBlogPosts().filter(p => p.status === 'published'));
        setCategories(['All', ...getCategories()]);
    }, []);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop'; // Fallback
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPost || !commentText.trim()) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            user: commentName || 'Anonymous',
            text: commentText,
            date: new Date().toISOString().split('T')[0]
        };

        addComment(selectedPost.id, newComment);

        // Update local state to reflect change immediately
        const updatedPost = { ...selectedPost, comments: [...(selectedPost.comments || []), newComment] };
        setSelectedPost(updatedPost);

        // Update posts list as well
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));

        setCommentName('');
        setCommentText('');
    };

    const filteredPosts = selectedCategory === 'All'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    if (selectedPost) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Button variant="ghost" className="mb-4 flex items-center gap-2" onClick={() => setSelectedPost(null)}>
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Button>

                    <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                        {/* Reduced image height by approx 40-50% from original h-96 -> h-56/64 */}
                        <div className="w-full h-64 bg-gray-200">
                            <img
                                src={selectedPost.image}
                                alt={selectedPost.title}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                        </div>

                        <div className="p-8 md:p-12">
                            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-4">
                                {selectedPost.category && (
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-0">
                                        {selectedPost.category}
                                    </Badge>
                                )}
                                <span className="flex items-center gap-1">
                                    <User className="w-4 h-4" /> {selectedPost.author}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> {selectedPost.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" /> {selectedPost.readTime}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">{selectedPost.title}</h1>

                            <div className="prose prose-lg max-w-none prose-green">
                                {selectedPost.content.split('\n').map((line, i) => (
                                    <p key={i} className="mb-4 text-gray-700 leading-relaxed text-lg">{line}</p>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Comments Section */}
                    <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <MessageSquare className="w-6 h-6 text-green-700" />
                            Comments ({selectedPost.comments?.length || 0})
                        </h3>

                        <div className="space-y-6 mb-8">
                            {selectedPost.comments && selectedPost.comments.length > 0 ? (
                                selectedPost.comments.map((comment) => (
                                    <div key={comment.id} className="border-b last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900">{comment.user}</span>
                                            <span className="text-sm text-gray-500">{comment.date}</span>
                                        </div>
                                        <p className="text-gray-700">{comment.text}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                            )}
                        </div>

                        <form onSubmit={handleAddComment} className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-bold mb-4">Leave a Reply</h4>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name (Optional)</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={commentName}
                                        onChange={(e) => setCommentName(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                    <textarea
                                        id="comment"
                                        rows={4}
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        placeholder="Share your thoughts..."
                                        required
                                    ></textarea>
                                </div>
                                <Button type="submit" className="bg-green-700 hover:bg-green-800 text-white">
                                    Post Comment
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="p-8 border-t border-gray-100 bg-white rounded-lg shadow-sm text-center">
                        <h3 className="font-bold text-lg mb-2">Subscribe to our newsletter</h3>
                        <p className="text-gray-600 mb-4">Get the latest impact stories directly in your inbox.</p>
                        <div className="flex gap-2 max-w-sm mx-auto">
                            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 border rounded-md" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center md:mb-12 mb-8">
                    <h1 className="text-4xl font-bold mb-4">Impact Stories</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
                        Read about the incredible change happening across Africa, driven by our community and partners.
                    </p>

                    {/* Categories */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-green-700 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <Card
                            key={post.id}
                            className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col border-0"
                            onClick={() => {
                                setSelectedPost(post);
                                window.scrollTo(0, 0);
                            }}
                        >
                            <div className="h-56 overflow-hidden relative bg-gray-200">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    onError={handleImageError}
                                />
                                {post.category && (
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-green-800 backdrop-blur-sm hover:bg-white border-0 shadow-sm">
                                            {post.category}
                                        </Badge>
                                    </div>
                                )}
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
                                <div className="flex items-center text-green-700 font-medium group-hover:gap-2 transition-all mt-auto">
                                    Read Story <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No stories found in this category.</p>
                        <Button variant="link" onClick={() => setSelectedCategory('All')} className="mt-2 text-green-700">
                            View all stories
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
