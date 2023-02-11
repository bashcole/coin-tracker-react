import type {NextPage} from 'next'
import Link from "next/link";

const MainLayout: NextPage = (props: any) => {

    return (
        <>
            <div className="relative bg-gray-50 overflow-hidden flex-grow">

                <div className="relative pt-6 pb-16 sm:pb-24">
                    <div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6">
                            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center"
                                 aria-label="Global">
                                <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                    <div className="flex items-center justify-between w-full md:w-auto">
                                        <Link href="/">
                                            <span className="sr-only">CoinTracker</span>
                                            <img className="h-8 w-auto sm:h-10"
                                                 src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                                 alt=""/>
                                        </Link>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>

                    <main className="mt-2 mx-auto max-w-7xl px-4 sm:mt-12">
                        {props.children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default MainLayout
