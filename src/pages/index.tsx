import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import useFetchExchangePairs from "@/hooks/useFetchExchangePairs";
import Card from "@/components/Card";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
    const {pairs} = useFetchExchangePairs();

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Coin Tracker</span>
                    <span className="block text-indigo-600 xl:inline"> that works</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Anim
                    aute
                    id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                    fugiat veniam
                    occaecat fugiat aliqua.</p>
            </div>

            <div className="mt-32">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Supported currencies</h3>

                {pairs && <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                    {pairs.map(pair => (
                        <Link href={`/details/${pair.symbol}`} key={pair.symbol}
                              className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                            <Card pair={pair}/>
                        </Link>
                    ))}
                </div>}

                {!pairs && <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                    <Skeleton className="px-4 py-16 bg-white rounded-lg overflow-hidden" />
                    <Skeleton className="px-4 py-16 bg-white rounded-lg overflow-hidden" />
                    <Skeleton className="px-4 py-16 bg-white rounded-lg overflow-hidden" />
                    <Skeleton className="px-4 py-16 bg-white rounded-lg overflow-hidden" />
                </div>}

            </div>
        </>
    )
}
