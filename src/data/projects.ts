
export interface Milestone {
    id: string;
    title: string;
    amount: number;
    status: 'pending' | 'in-progress' | 'completed' | 'verified';
    description?: string; // Added description
}

export interface ProjectUpdate {
    id: string;
    date: string;
    title: string;
    description: string;
    image?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    detailedDescription?: string;
    category: string;
    location: string;
    targetAmount: number;
    raisedAmount: number;
    backers: number;
    image: string;
    gallery?: string[];
    creator: string;
    milestones: Milestone[];
    updates?: ProjectUpdate[];
    daysLeft: number;
    isVerified: boolean;
    videoUrl?: string;
}

const initialProjects: Project[] = [
    {
        id: '1',
        title: 'Clean Water Well for Kitui Village',
        description: 'Building a sustainable water well to provide clean drinking water for 500 families.',
        detailedDescription: 'This project aims to drill a deep borehole in Kitui Village to provide reliable, clean water. The current water source is 5km away and often contaminated. This project will reduce waterborne diseases and save time for women and children.',
        category: 'Infrastructure',
        location: 'Kitui, Kenya',
        targetAmount: 4000000,
        raisedAmount: 2000000,
        backers: 500,
        image: 'https://picsum.photos/seed/kitui/800/600',
        gallery: [
            'https://picsum.photos/seed/kitui1/800/600',
            'https://picsum.photos/seed/kitui2/800/600'
        ],
        creator: 'Kitui Community Tech Hub',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        milestones: [
            {
                id: 'm1',
                title: 'Site Survey & Hydrological Study',
                amount: 500000,
                status: 'completed',
                description: 'Completed geological survey ensuring water availability.'
            },
            {
                id: 'm2',
                title: 'Drilling Phase 1',
                amount: 1500000,
                status: 'completed',
                description: 'Drilling to 150m depth.'
            },
            {
                id: 'm3',
                title: 'Pump Installation & Solar Setup',
                amount: 1200000,
                status: 'in-progress',
                description: 'Installing solar-powered pumps for sustainability.'
            },
            {
                id: 'm4',
                title: 'Distribution Network',
                amount: 800000,
                status: 'pending',
                description: 'Piping water to 3 central kiosks.'
            }
        ],
        updates: [
            {
                id: 'u1',
                date: '2025-10-01',
                title: 'Survey Completed',
                description: 'Our team successfully completed the hydrological survey. Water table confirmed at 120m.',
                image: 'https://picsum.photos/seed/kitui_update1/800/600'
            },
            {
                id: 'u2',
                date: '2025-10-20',
                title: 'Drilling Rig Arrival',
                description: 'The heavy machinery has arrived on site and drilling begins tomorrow!',
                image: 'https://picsum.photos/seed/drilling/800/600'
            }
        ],
        daysLeft: 12,
        isVerified: true,
    },
    {
        id: '2',
        title: 'Girls Education Fund - Lagos',
        description: 'Providing school fees, uniforms, and supplies for 100 girls from low-income families.',
        detailedDescription: 'Empowering the next generation of female leaders by removing financial barriers to education. This fund covers tuition, books, and uniforms for high-potential students in underserved communities.',
        category: 'Education',
        location: 'Lagos, Nigeria',
        targetAmount: 300000,
        raisedAmount: 285000,
        backers: 456,
        image: 'https://picsum.photos/seed/education/800/600',
        creator: 'Educate Her Initiative',
        milestones: [
            { id: '1', title: 'Student selection', amount: 30000, status: 'completed', description: 'Selecting 100 beneficiaries based on need and potential.' },
            { id: '2', title: 'School fees (Term 1)', amount: 120000, status: 'completed', description: 'Paying first term tuition fees directly to schools.' },
            { id: '3', title: 'Uniforms and supplies', amount: 80000, status: 'verified', description: 'Distributing uniforms, bags, and textbooks.' },
            { id: '4', title: 'School fees (Term 2)', amount: 70000, status: 'pending', description: 'Securing second term education.' },
        ],
        updates: [],
        daysLeft: 60,
        isVerified: true,
    },
    {
        id: '3',
        title: 'Organic Farming Cooperative',
        description: 'Establishing a farmer-owned cooperative for organic vegetable production.',
        detailedDescription: 'Supporting local farmers to transition to organic practices. The cooperative provides shared equipment, training on sustainable methods, and direct market access to increase farmer incomes.',
        category: 'Agriculture',
        location: 'Kumasi, Ghana',
        targetAmount: 400000,
        raisedAmount: 165000,
        backers: 89,
        image: 'https://picsum.photos/seed/farming/800/600',
        creator: 'Kumasi Farmers Alliance',
        milestones: [
            { id: '1', title: 'Land lease and preparation', amount: 100000, status: 'completed', description: 'Securing 50 acres of arable land.' },
            { id: '2', title: 'Seeds and organic fertilizer', amount: 80000, status: 'in-progress', description: 'Procuring high-quality organic inputs.' },
            { id: '3', title: 'Irrigation system', amount: 120000, status: 'pending', description: 'Installing drip irrigation for year-round farming.' },
            { id: '4', title: 'Market infrastructure', amount: 100000, status: 'pending', description: 'Building storage and packing facility.' },
        ],
        updates: [],
        daysLeft: 90,
        isVerified: true,
    },
    {
        id: '4',
        title: 'Mobile Health Clinic - Rural Tanzania',
        description: 'Equipping a mobile clinic to serve remote villages with basic healthcare.',
        detailedDescription: 'Bringing essential medical services to isolated communities. The mobile clinic is equipped for maternal health, vaccinations, and basic treatments, bridging the gap in healthcare access.',
        category: 'Healthcare',
        location: 'Mwanza, Tanzania',
        targetAmount: 750000,
        raisedAmount: 423000,
        backers: 312,
        image: 'https://picsum.photos/seed/health/800/600',
        creator: 'Mwanza Health Partners',
        milestones: [
            { id: '1', title: 'Vehicle purchase', amount: 300000, status: 'completed', description: 'Acquiring a rugged 4x4 vehicle.' },
            { id: '2', title: 'Medical equipment', amount: 200000, status: 'in-progress', description: 'Outfitting with diagnostic tools and supplies.' },
            { id: '3', title: 'Staff training', amount: 150000, status: 'pending', description: 'Training nurses and drivers.' },
            { id: '4', title: 'First quarter operations', amount: 100000, status: 'pending', description: 'Fuel and operational costs for 3 months.' },
        ],
        updates: [],
        daysLeft: 75,
        isVerified: true,
    },
];

const STORAGE_KEY = 'esanti_projects_data_v2';

export const getProjects = (): Project[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return initialProjects;
};

export const saveProjects = (projects: Project[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const updateProject = (updatedProject: Project) => {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
        projects[index] = updatedProject;
        saveProjects(projects);
    } else {
        // Add new if not exists
        projects.push(updatedProject);
        saveProjects(projects);
    }
};

export const deleteProject = (id: string) => {
    const projects = getProjects().filter(p => p.id !== id);
    saveProjects(projects);
}
