import React from 'react';

const PeriodButton = ({onClick, type}: { onClick: any, type: string }) => {
    return <button
        className="pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
        type="button" onClick={() => onClick(type)}>{type}</button>
}

export default PeriodButton;