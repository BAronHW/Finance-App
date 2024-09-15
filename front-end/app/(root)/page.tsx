'use client'
import Link from 'next/link';
import ClientButton from '../../components/ui/ClientButton';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"sign-up"}>
        <Button onClick={()=>{alert("test")}}>Click Me</Button>
      </Link>
    </div>
  );
}