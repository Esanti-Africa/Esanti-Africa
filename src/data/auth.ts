
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'visitor' | 'member' | 'editor' | 'admin';
    donorRank?: string;
}

const STORAGE_KEY_AUTH = 'esanti_auth_session';

export const getCurrentUser = (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY_AUTH);
    if (stored) return JSON.parse(stored);
    return null;
};

export const loginUser = (email: string, role: User['role']): User => {
    const user: User = {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email,
        role,
        donorRank: 'Gold' // Demo
    };
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(user));
    return user;
};

export const logoutUser = () => {
    localStorage.removeItem(STORAGE_KEY_AUTH);
};

export const canAccessAdmin = (user: User | null): boolean => {
    if (!user) return false;
    return user.role === 'admin' || user.role === 'editor';
};
