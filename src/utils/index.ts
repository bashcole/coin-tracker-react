import {publicRequest} from "@/services/axios";
import moment from "moment/moment";

export const publicFetcher = {
    get: (url: string) => publicRequest.get(url).then(res => res.data),
    post: (url: string, data: object) => publicRequest.post(url, data).then(res => res.data)
}

export function formatPrice(price: any, decimals: number, symbol: string) {
    let options = {
        style: 'decimal',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }

    if (symbol)
        Object.assign(options, {
            style: 'currency',
            currency: symbol,
            currencyDisplay: 'narrowSymbol',
        });

    return new Intl.NumberFormat('en', options)
        .format(+price)
        .replace(/0+$/, '')
        .replace(/[.,]$/, '');
}


export const createPriceAlert = async (email: string, limit: number, pair_id: number) => {
    try {
        const response = await publicFetcher.post(`/price-alert/store`, {
            email,
            limit,
            pair_id,
        });
        return true;
    } catch (error: any) {
        console.log(error.response);
        return error.response;
    }
}

export const generateChartOptions = (timeframe: string) => {
    const unit = timeframe !== '1D' ? 'day' : 'hour';
    return {
        animations: {
            x: {
                duration: 500
            },
            y: {
                duration: 500
            },
        },
        interaction: {
            intersect: false,
            axis: 'x'
        },
        maintainAspectRatio: false,
        plugins: {
            legend: false // Hide legend
        },
        layout: {
            padding: 0
        },
        responsive: true,
        scaleShowVerticalLines: false,
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: "MM/DD/YYYY HH:mm",
                    tooltipFormat: 'll HH:mm',
                    unit,
                    displayFormats: {
                        'millisecond': 'HH:mm',
                        'second': 'HH:mm',
                        'minute': 'HH:mm',
                        'hour': 'HH:mm',
                        'day': 'MMM DD',
                        'week': 'MMM DD',
                        'month': 'MMM DD',
                        'quarter': 'MMM DD',
                        'year': 'MMM DD',
                    },
                },
                ticks: {
                    maxRotation: 0,
                    minRotation: 45,
                    maxTicksLimit: 8,
                    autoSkip: false
                },
                display: true,
                grid: {
                    display: false
                }
            },
            y: {
                display: true,
                ticks: {
                    callback: function (label: number) {
                        return `${Math.round(label / 1000)}k`;
                    }
                }
            }
        },
        animation: {
            duration: 0
        },
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0.5
            }
        },
        tooltips: {
            enabled: true,
            intersect: false,
            // callbacks: {
            //     label: (tooltip, data) => data.datasets[tooltip.datasetIndex].data[tooltip.index].y
            // }
        },
    }
}

export const generateChartData = (data: [] | undefined | null, timeframe: string) => {
    if (data == null) return  false;

    return {
        labels: data.map((price: any) => moment.utc(price.date).local().toDate()),
        datasets: [
            {
                backgroundColor: 'rgba(25, 119, 212, 0.12)',
                borderColor: 'rgba(25, 119, 212, 0.5)',
                borderWidth: 2,
                pointBorderWidth: 0,
                lineTension: 0,
                fill: true,
                data: data.map((price: any) => ({
                    x: moment.utc(price.date).local().toDate(),
                    y: price.ask
                }))
            }
        ]
    }
}
