import useSWR from "swr";
import {publicFetcher} from "@/utils";
import {IPair} from "@/interfaces/IPair";

interface IResponse {
    data: IPair[]
}
const useFetchExchangePairs = () => {

    const {data} = useSWR<IResponse>(`/exchange-pairs`, publicFetcher.get)

    return {
        pairs: data?.data
    }
}

export default useFetchExchangePairs;