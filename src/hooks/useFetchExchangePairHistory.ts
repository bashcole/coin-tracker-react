import useSWR from "swr";
import {publicFetcher} from "@/utils";
import {ICoinDetails} from "@/interfaces/ICoinDetails";

const useFetchExchangePairHistory = (timeframe: string, pair: string | string[]) => {

    const {data, mutate} = useSWR(pair ? `/price-history/${pair}/${timeframe}` : null, publicFetcher.get)

    return {
        mutate,
        history: data?.data
    }
}

export default useFetchExchangePairHistory;