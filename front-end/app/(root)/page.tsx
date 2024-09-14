import Link from 'next/link';
import ClientButton from '../../components/ui/ClientButton';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Link href={"sign-up"}>
        <ClientButton hello='hello' age={10}>Click Me!</ClientButton>
      </Link>
    </div>
  );
}