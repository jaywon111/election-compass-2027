export type ProviderMode = 'mock' | 'real';
export interface AiProvider { readonly mode: ProviderMode; summarize(text: string): Promise<{ label: string; text: string }> }
export interface EmailProvider { readonly mode: ProviderMode; sendMagicLink(email: string, url: string): Promise<void> }
export interface StorageProvider { readonly mode: ProviderMode; store(file: File): Promise<{ url: string }> }
export interface RealtimeProvider { readonly mode: ProviderMode; subscribe(topic: string, listener: (payload: unknown) => void): () => void }
export interface AnalyticsProvider { readonly mode: ProviderMode; track(event: string): void }
const mockAi: AiProvider = { mode: 'mock', async summarize() { return { label: 'DEMO SUMMARY', text: 'A demo summary is shown here. No live AI service is connected.' }; } };
const mockEmail: EmailProvider = { mode: 'mock', async sendMagicLink(_email, url) { console.info('[mock email] sign-in link:', url); } };
const mockStorage: StorageProvider = { mode: 'mock', async store(file) { return { url: `local-mock://${encodeURIComponent(file.name)}` }; } };
const mockRealtime: RealtimeProvider = { mode: 'mock', subscribe() { return () => undefined; } };
const mockAnalytics: AnalyticsProvider = { mode: 'mock', track(event) { console.info('[mock analytics]', event); } };
export const providers = { ai: mockAi, email: mockEmail, storage: mockStorage, realtime: mockRealtime, analytics: mockAnalytics };
console.info('[Election Compass] provider modes:', Object.values(providers).map(p => p.mode).join(', '));
