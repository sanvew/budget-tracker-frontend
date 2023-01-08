
export const dateByParts = (options: Intl.DateTimeFormatOptions, date: Date): Record<keyof Intl.DateTimeFormatPartTypesRegistry, string> => {
    const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
    return dateTimeFormat.formatToParts(date)
        .filter((item) => item.type !== 'literal')
        .reduce((obj, item) => ({...obj, [item.type]: item.value}), {} as Record<keyof Intl.DateTimeFormatPartTypesRegistry, string>);
}