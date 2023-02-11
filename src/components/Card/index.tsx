import React from 'react';
import {IPair} from "@/interfaces/IPair";
import {formatPrice} from "@/utils";

const Card = ({pair}: {pair: IPair}) => {
    return <div className="flex items-center justify-center order-1 xl:justify-start">
        <img src={pair.icon} alt="coin.name" className="self-start"/>
        <div className="flex flex-col ml-4">
            <span className="block text-lg font-bold text-alpha-700">{pair.name}</span>
            <span className="block text-alpha-200 text-sm">{pair.base_symbol}</span>
            <span className="block mt-4 text-3xl font-semibold text-gray-900">{
                formatPrice(pair.ask, pair.decimals, 'USD')
            }</span>
        </div>
    </div>
};

export default Card;