
export const UnixToYYYYMMdd = (unixTime) => new Date(unixTime * 1000).toISOString().slice(0, 10);