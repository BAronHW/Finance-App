import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Home() {
  return (
    <div className="">
      <Link href="/sign-up">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
}