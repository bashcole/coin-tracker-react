import React, {useState} from 'react';
import {useRouter} from "next/router";
import useFetchCurrency from "@/hooks/useFetchCurrency";
import {createPriceAlert, formatPrice, generateChartData, generateChartOptions} from "@/utils";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import 'chartjs-adapter-moment';
import useSWR, {mutate} from 'swr'
interface IFormInputs {
    email: string;
    limit: number;
}

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import useFetchExchangePairHistory from "@/hooks/useFetchExchangePairHistory";
import PeriodList from "@/components/PeriodList";
import {useForm} from "react-hook-form";

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)
const Pair = () => {
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [timeframe, setTimeframe] = useState('1D');
    const options = generateChartOptions(timeframe);
    const router = useRouter()
    const {pair} = router.query

    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        formState: {errors, isValid, isDirty, isSubmitting}
    } = useForm<IFormInputs>({mode: "onChange"});

    const symbol = pair?.toString().split('-')[0];
    const {currency} = useFetchCurrency(symbol)
    // @ts-ignore
    const {history, mutate} = useFetchExchangePairHistory(timeframe, pair)
    const data = generateChartData(history, timeframe)

    const handleTimeframeChange = async (timeframe: string) => {
        setTimeframe(timeframe);
    }

    const handleFormSubmit = async(data: any) => {
       const response = await createPriceAlert(data.email, data.limit, 1);
       if(response){
           setSuccessMessage(true);
       } else {
           setErrorMessage(true);
       }
        reset()
    }

    // @ts-ignore
    return <div className="max-w-7xl mx-auto flex justify-center flex-col">

        {
            currency && <div
                className="flex flex-wrap justify-between w-full p-4 my-6 bg-white rounded-md xl:px-6 xl:py-0 xl:h-20 xl:items-center md:mt-0">
                <div className="flex items-center justify-center order-1 xl:justify-start xl:w-3/12">
                    <img src={currency.icon} alt={currency.name}/>
                    <div className="flex flex-wrap ml-4"><span
                        className="block w-full text-lg font-bold text-alpha-700">{currency.name}</span>
                        <span className="block text-alpha-200">{currency.symbol}</span></div>
                </div>
                <div
                    className="items-center justify-between order-3 hidden w-full px-1 mt-4 xl:flex xl:flex-wrap xl:order-2 xl:mt-0 xl:w-3/12">
        <span className="order-2 block font-bold text-lg xl:order-1 text-alpha-700 xl:text-left xl:w-full"><data
            data-price="379620611007.00" data-decimals="2"
            data-symbol="USD">{formatPrice(currency.market_cap, currency.decimals, 'USD')}</data></span> <span
                    className="order-1 block xl:order-2 text-alpha-200 xl:w-full xl:text-left">
                                Market Cap
                            </span></div>
                <div
                    className="flex flex-col items-center justify-center order-2 px-1 xl:order-5 xl:w-1/5"><span
                    className="self-end block text-lg font-bold text-alpha-700 xl:w-full xl:text-right">
        <data data-price="19163837.00"
              data-decimals="8">{formatPrice(currency.circulating_supply, 8, '')}</data>
                                BTC
                            </span> <span className="self-end block text-lg text-alpha-700 xl:w-full xl:text-right">
                                Circulating Supply
                            </span></div>
            </div>
        }

        {!currency && <Skeleton
            className=" w-full p-4 my-6 bg-white rounded-md xl:px-6 xl:py-0 xl:h-20 xl:items-center md:mt-0"/>
        }

        <div className="box center">

            {data && <PeriodList onClick={handleTimeframeChange}/>}

            {!data && <span
                className="skeleton pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Loading...</span>}
            {data && <>
                {/* @ts-ignore */}
                <Line options={options} data={data}/>
            </>
            }
        </div>

        <div className="mt-10 sm:mt-12">
            <form className="max-w-xl mx-auto" method="post" onSubmit={handleSubmit(handleFormSubmit)}>
                {errorMessage && <span className="mb-4 border border-red-400 px-4 py-3 rounded bg-red-100 block text-red-700">Something seriously bad happened.</span>}

                {successMessage && <span className="mb-4 border border-green-400 px-4 py-3 rounded bg-green-100 block text-green-700">Alert successfully set.</span>}
                <div className="gap-4 flex-col flex lg:flex-row">
                    <div className="min-w-0 flex-1">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input defaultValue={''} {...register("email", {required: true})} required id="email" autoComplete="off" type="email"
                               placeholder="Enter your email"
                               className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"/>
                    </div>

                    <div className="min-w-0 flex-1">
                        <label htmlFor="limit" className="sr-only">Price</label>
                        <input defaultValue={''} {...register("limit", {required: true})} required id="limit" autoComplete="off" type="number"
                               placeholder="Enter your price point"
                               className="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"/>
                    </div>
                    <div className="">
                        <button type="submit"
                                className="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
                            Notify me
                        </button>
                    </div>
                </div>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="mt-3 text-sm text-gray-300 sm:mt-4">Get notified when the price drops, don't miss the
                    chance
                    of
                    becoming a <strong>gazillionaire</strong>!</p>
            </form>
        </div>
    </div>
}

export default Pair;