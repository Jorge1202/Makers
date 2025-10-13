import { Header } from './Header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="min-h-screen pt-14"> {/* Compensa la altura del header */}
        {children}
      </main>
    </div>
  );
}