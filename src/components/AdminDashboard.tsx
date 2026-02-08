import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, DollarSign, CheckCircle, Users, Activity, Settings, FileText, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { getProjects, saveProjects, Project, Milestone } from '../data/projects';
import { getBlogPosts, saveBlogPosts, deleteBlogPost, BlogPost } from '../data/blog';
import { getLogs, addLog, LogEntry } from '../data/logs';
import { toast } from 'sonner';


export function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Project Editing State
    const [isEditingProject, setIsEditingProject] = useState<boolean>(false);
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    // Blog Editing State
    const [isEditingPost, setIsEditingPost] = useState<boolean>(false);
    const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        setProjects(getProjects());
        setBlogPosts(getBlogPosts());
        setLogs(getLogs());
    }, [activeTab]); // Refresh data on tab change


    const handleDeleteProject = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter(p => p.id !== id);
            setProjects(updatedProjects);
            saveProjects(updatedProjects);
            addLog('Current User', 'DELETE_PROJECT', `Deleted project ${id}`);
            toast.success('Project deleted');
        }
    };

    const handleEditProject = (project: Project) => {
        setCurrentProject(project);
        setIsEditingProject(true);
    };

    const handleAddNewProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: '',
            description: '',
            detailedDescription: '',
            category: 'Education',
            location: '',
            targetAmount: 0,
            raisedAmount: 0,
            backers: 0,
            image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop',
            creator: 'New Creator',
            milestones: [],
            daysLeft: 30,
            isVerified: false,
        };
        setCurrentProject(newProject);
        setIsEditingProject(true);
    };

    const handleSaveProject = () => {
        if (!currentProject) return;

        // Basic validation
        if (!currentProject.title || !currentProject.description) {
            toast.error('Title and description are required');
            return;
        }

        let updatedProjects = [...projects];
        const index = updatedProjects.findIndex(p => p.id === currentProject.id);

        if (index !== -1) {
            updatedProjects[index] = currentProject;
            addLog('Current User', 'UPDATE_PROJECT', `Updated project ${currentProject.title}`);
        } else {
            updatedProjects.push(currentProject);
            addLog('Current User', 'CREATE_PROJECT', `Created project ${currentProject.title}`);
        }

        setProjects(updatedProjects);
        saveProjects(updatedProjects);
        setIsEditingProject(false);
        setCurrentProject(null);
        toast.success('Project saved successfully');
    };

    // Blog Handlers
    const handleAddNewPost = () => {
        const newPost: BlogPost = {
            id: Date.now().toString(),
            title: '',
            excerpt: '',
            content: '',
            author: 'Admin',
            date: new Date().toISOString().split('T')[0],
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop',
            readTime: '5 min read',
            status: 'draft'
        };
        setCurrentPost(newPost);
        setIsEditingPost(true);
    };

    const handleSavePost = () => {
        if (!currentPost) return;
        if (!currentPost.title) {
            toast.error('Title is required');
            return;
        }

        let updatedPosts = [...blogPosts];
        const index = updatedPosts.findIndex(p => p.id === currentPost.id);

        if (index !== -1) {
            updatedPosts[index] = currentPost;
            addLog('Current User', 'UPDATE_POST', `Updated post ${currentPost.title}`);
        } else {
            updatedPosts.push(currentPost);
            addLog('Current User', 'CREATE_POST', `Created post ${currentPost.title}`);
        }

        setBlogPosts(updatedPosts);
        saveBlogPosts(updatedPosts);
        setIsEditingPost(false);
        setCurrentPost(null);
        toast.success('Post saved successfully');
    };

    const handleDeletePost = (id: string) => {
        if (confirm('Delete this post?')) {
            deleteBlogPost(id);
            setBlogPosts(getBlogPosts()); // refresh
            addLog('Current User', 'DELETE_POST', `Deleted post ${id}`);
            toast.success('Post deleted');
        }
    };


    const updateProjectField = (field: keyof Project, value: any) => {
        if (currentProject) {
            setCurrentProject({ ...currentProject, [field]: value });
        }
    };

    const updatePostField = (field: keyof BlogPost, value: any) => {
        if (currentPost) {
            setCurrentPost({ ...currentPost, [field]: value });
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600">Overview of platform activity and content management</p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white p-1 rounded-lg border">
                        <TabsTrigger value="projects" className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Projects</TabsTrigger>
                        <TabsTrigger value="blog" className="flex items-center gap-2"><FileText className="w-4 h-4" /> Blog</TabsTrigger>
                        <TabsTrigger value="users" className="flex items-center gap-2"><Users className="w-4 h-4" /> Users</TabsTrigger>
                        <TabsTrigger value="logs" className="flex items-center gap-2"><Activity className="w-4 h-4" /> Activity Logs</TabsTrigger>
                        <TabsTrigger value="settings" className="flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</TabsTrigger>
                    </TabsList>

                    {/* PROJECTS TAB */}
                    <TabsContent value="projects">
                        {!isEditingProject ? (
                            <div className="space-y-6">
                                <div className="flex justify-end">
                                    <Button onClick={handleAddNewProject} className="bg-green-600 hover:bg-green-700">
                                        <Plus className="w-4 h-4 mr-2" /> Add New Project
                                    </Button>
                                </div>
                                <Card>
                                    <CardHeader><CardTitle>Projects Overview</CardTitle></CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Title</TableHead>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>Raised (FCFA)</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {projects.map((project) => (
                                                    <TableRow key={project.id}>
                                                        <TableCell className="font-medium">{project.title}</TableCell>
                                                        <TableCell>{project.category}</TableCell>
                                                        <TableCell>{project.raisedAmount.toLocaleString()}</TableCell>
                                                        <TableCell><Badge variant={project.isVerified ? "default" : "secondary"}>{project.isVerified ? 'Verified' : 'Unverified'}</Badge></TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEditProject(project)}><Edit2 className="w-4 h-4" /></Button>
                                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteProject(project.id)}><Trash2 className="w-4 h-4" /></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold">{currentProject?.id ? 'Edit Project' : 'New Project'}</h2>
                                    <Button variant="ghost" onClick={() => setIsEditingProject(false)}><X className="w-4 h-4" /></Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="space-y-4">
                                        <div><label className="block text-sm font-medium mb-1">Title</label><Input value={currentProject?.title} onChange={(e) => updateProjectField('title', e.target.value)} /></div>
                                        <div><label className="block text-sm font-medium mb-1">Category</label><Input value={currentProject?.category} onChange={(e) => updateProjectField('category', e.target.value)} /></div>
                                        <div><label className="block text-sm font-medium mb-1">Target (FCFA)</label><Input type="number" value={currentProject?.targetAmount} onChange={(e) => updateProjectField('targetAmount', Number(e.target.value))} /></div>
                                        <div><label className="block text-sm font-medium mb-1">Raised (FCFA)</label><Input type="number" value={currentProject?.raisedAmount} onChange={(e) => updateProjectField('raisedAmount', Number(e.target.value))} /></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div><label className="block text-sm font-medium mb-1">Location</label><Input value={currentProject?.location} onChange={(e) => updateProjectField('location', e.target.value)} /></div>
                                        <div><label className="block text-sm font-medium mb-1">Video URL (YouTube Embed)</label><Input value={currentProject?.videoUrl || ''} onChange={(e) => updateProjectField('videoUrl', e.target.value)} /></div>
                                        <div><label className="block text-sm font-medium mb-1">Image URL</label><Input value={currentProject?.image} onChange={(e) => updateProjectField('image', e.target.value)} /></div>
                                    </div>
                                </div>
                                <div className="mb-6"><label className="block text-sm font-medium mb-1">Detailed Description (Markdown)</label><textarea className="w-full border rounded-md p-2 h-32" value={currentProject?.detailedDescription} onChange={(e) => updateProjectField('detailedDescription', e.target.value)} /></div>
                                <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setIsEditingProject(false)}>Cancel</Button><Button onClick={handleSaveProject} className="bg-green-600 hover:bg-green-700">Save Project</Button></div>
                            </div>
                        )}
                    </TabsContent>

                    {/* BLOG TAB */}
                    <TabsContent value="blog">
                        {!isEditingPost ? (
                            <div className="space-y-6">
                                <div className="flex justify-end">
                                    <Button onClick={handleAddNewPost} className="bg-green-600 hover:bg-green-700">
                                        <Plus className="w-4 h-4 mr-2" /> New Blog Post
                                    </Button>
                                </div>
                                <Card>
                                    <CardContent className="pt-6">
                                        <Table>
                                            <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Author</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                                            <TableBody>
                                                {blogPosts.map((post) => (
                                                    <TableRow key={post.id}>
                                                        <TableCell className="font-medium">{post.title}</TableCell>
                                                        <TableCell>{post.author}</TableCell>
                                                        <TableCell>{post.date}</TableCell>
                                                        <TableCell><Badge variant={post.status === 'published' ? 'default' : 'secondary'}>{post.status}</Badge></TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="icon" onClick={() => { setCurrentPost(post); setIsEditingPost(true); }}><Edit2 className="w-4 h-4" /></Button>
                                                            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeletePost(post.id)}><Trash2 className="w-4 h-4" /></Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-semibold">Edit Post</h2><Button variant="ghost" onClick={() => setIsEditingPost(false)}><X className="w-4 h-4" /></Button></div>
                                <div className="space-y-4 mb-6">
                                    <div><label className="block text-sm font-medium mb-1">Title</label><Input value={currentPost?.title} onChange={(e) => updatePostField('title', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium mb-1">Excerpt</label><Input value={currentPost?.excerpt} onChange={(e) => updatePostField('excerpt', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium mb-1">Image URL</label><Input value={currentPost?.image} onChange={(e) => updatePostField('image', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium mb-1">Content (Markdown)</label><textarea className="w-full border rounded-md p-2 h-64" value={currentPost?.content} onChange={(e) => updatePostField('content', e.target.value)} /></div>
                                    <div><label className="block text-sm font-medium mb-1">Status</label>
                                        <select className="w-full border rounded-md p-2" value={currentPost?.status} onChange={(e) => updatePostField('status', e.target.value)}>
                                            <option value="draft">Draft</option><option value="published">Published</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3"><Button variant="outline" onClick={() => setIsEditingPost(false)}>Cancel</Button><Button onClick={handleSavePost} className="bg-green-600 hover:bg-green-700">Save Post</Button></div>
                            </div>
                        )}
                    </TabsContent>

                    {/* USERS TAB (Mock) */}
                    <TabsContent value="users">
                        <Card>
                            <CardHeader><CardTitle>User Management (Mock)</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell><div><p className="font-medium">Admin User</p><p className="text-xs text-gray-500">admin@esantiafrica.org</p></div></TableCell>
                                            <TableCell><Badge>Super Admin</Badge></TableCell>
                                            <TableCell><span className="text-green-600 text-sm">Active</span></TableCell>
                                            <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><div><p className="font-medium">Editor User</p><p className="text-xs text-gray-500">editor@esantiafrica.org</p></div></TableCell>
                                            <TableCell><Badge variant="secondary">Editor</Badge></TableCell>
                                            <TableCell><span className="text-green-600 text-sm">Active</span></TableCell>
                                            <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell><div><p className="font-medium">John Doe</p><p className="text-xs text-gray-500">john@example.com</p></div></TableCell>
                                            <TableCell>Member</TableCell>
                                            <TableCell><span className="text-green-600 text-sm">Active</span></TableCell>
                                            <TableCell className="text-right"><Button variant="ghost" size="sm">Manage</Button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* LOGS TAB */}
                    <TabsContent value="logs">
                        <Card>
                            <CardHeader><CardTitle>System Logs</CardTitle></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>User</TableHead><TableHead>Action</TableHead><TableHead>Details</TableHead></TableRow></TableHeader>
                                    <TableBody>
                                        {logs.map((log) => (
                                            <TableRow key={log.id}>
                                                <TableCell className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</TableCell>
                                                <TableCell>{log.user}</TableCell>
                                                <TableCell><Badge variant="outline">{log.action}</Badge></TableCell>
                                                <TableCell className="text-sm">{log.details}</TableCell>
                                            </TableRow>
                                        ))}
                                        {logs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-4 text-gray-500">No logs found.</TableCell></TableRow>}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SETTINGS TAB */}
                    <TabsContent value="settings">
                        <Card>
                            <CardHeader><CardTitle>Platform Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div><h3 className="font-medium mb-4">General Information</h3><div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-sm font-medium">Site Name</label><Input defaultValue="Esanti Africa" /></div><div className="space-y-2"><label className="text-sm font-medium">Contact Email</label><Input defaultValue="info@esantiafrica.org" /></div></div></div>
                                <div className="border-t pt-6"><h3 className="font-medium mb-4">Security</h3><div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"><div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-gray-500">Require 2FA for all admin accounts</p></div><Button variant="outline">Enabled</Button></div></div>
                                <div className="flex justify-end pt-4"><Button className="bg-green-600">Save Settings</Button></div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

