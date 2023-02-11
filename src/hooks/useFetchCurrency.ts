import useSWR from "swr";
import {publicFetcher} from "@/utils";
import {ICoinDetails} from "@/interfaces/ICoinDetails";

interface IResponse {
    data: ICoinDetails
}
const useFetchExchangePairs = (symbol: string | undefined) => {

    const {data} = useSWR<IResponse>(symbol ? `/currency/${symbol}` : null, publicFetcher.get)

    return {
        currency: data?.data
    }
}

export default useFetchExchangePairs;