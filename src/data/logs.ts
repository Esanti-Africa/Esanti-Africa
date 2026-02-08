
export interface LogEntry {
    id: string;
    timestamp: string;
    action: string;
    user: string;
    details: string;
}

const STORAGE_KEY = 'esanti_admin_logs';

export const getLogs = (): LogEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    return [];
};

export const addLog = (user: string, action: string, details: string) => {
    const logs = getLogs();
    const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user,
        action,
        details
    };
    logs.unshift(newLog); // Add to beginning
    // Keep only last 100 logs
    if (logs.length > 100) logs.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
};
