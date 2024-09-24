import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header name='Aaron' appMoto='Manage your student funds' accBal={10} />
      </div>
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to Your Finance App</h1>
      </main>
    </div>
  );
}