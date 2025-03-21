'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import '../globals.css'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { useAuth } from '@/lib/contexts/authContext'
import { useRouter } from 'next/navigation'

export default function Landing() {
    const auth = useAuth()
    const router = useRouter()
    if (auth.currentUser && auth.userId) {
        router.push(`home/${auth.userId}`)
    }
    return (
        <div className="min-h-screen">
            <main className="gap-10 m-7">
                <div className="absolute right-20 grid grid-cols-2 gap-2">
                    <Link href="/sign-in" passHref>
                        <Button
                            size="lg"
                            className="text-xl rounded-full bg-slate-800 hover:bg-slate-400"
                            variant="default"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up" passHref>
                        <Button
                            size="lg"
                            className="text-xl rounded-full border-solid border-2 border-slate-400 hover:bg-slate-400"
                            variant="secondary"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col space-y-10">
                        <h1 className="text-9xl font-sans text-center">
                            FinApp
                        </h1>
                        <p className="relative t-100 text-left text-5xl font-mono max-w-3xl">
                            Your personal finance tracker
                        </p>
                    </div>
                </div>
                <Carousel
                    opts={{
                        loop: true,
                    }}
                    className="mt-20"
                >
                    <CarouselContent>
                        <CarouselItem className="flex justify-center">
                            <Image
                                src="/pexels-bemistermister-380782.jpg"
                                alt="Placeholder 1"
                                height={300}
                                width={800}
                                className="rounded-xl shadow-md hover:shadow-lg"
                            />
                        </CarouselItem>
                        <CarouselItem className="flex justify-center">
                            <Image
                                src="/pexels-mayday-1545743.jpg"
                                alt="Placeholder 2"
                                height={300}
                                width={800}
                                className="rounded-xl shadow-md hover:shadow-lg"
                            />
                        </CarouselItem>
                        <CarouselItem className="flex justify-center">
                            <img
                                src="/pexels-vince-2227774.jpg"
                                alt="Placeholder 3"
                                height={300}
                                width={800}
                                className="rounded-xl shadow-md hover:shadow-lg"
                            />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious
                        className="ml-24"
                        variant="outline"
                        size="lg"
                    />
                    <CarouselNext
                        className="mr-24"
                        variant="outline"
                        size="lg"
                    />
                </Carousel>
            </main>
        </div>
    )
}
