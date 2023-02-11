import React from 'react';
import PeriodButton from "@/components/PeriodButton";

const PeriodList = ({onClick} : {onClick: any}) => {
    return <div className="flex justify-center absolute top-0 left-5 mt-4 gap-4">
        <PeriodButton type="1D" onClick={onClick}/>
        <PeriodButton type="7D" onClick={onClick}/>
        <PeriodButton type="1M" onClick={onClick}/>
        <PeriodButton type="6M" onClick={onClick}/>
        <PeriodButton type="1Y" onClick={onClick}/>
    </div>
}

export default PeriodList;