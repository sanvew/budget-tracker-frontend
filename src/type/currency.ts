export interface Currency {
    id: string,
    alfa: string,
    numeric: number,
    name: string
}

export const DEFAULT_CURRENCIES: Omit<Currency, 'id'>[] = [
    {alfa: 'USD', numeric: 840, name: 'US dollar'}, {alfa: 'EUR', numeric: 978, name: 'Euro'},
    {alfa: 'GEL', numeric: 981, name: 'Georgian lari'}, {alfa: 'RSD', numeric: 941, name: 'Serbian Dinar'}
]