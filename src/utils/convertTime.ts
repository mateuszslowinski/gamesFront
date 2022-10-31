export const convertTime = (time: Date) => {
    return new Date(time).toLocaleDateString('pl-pl', {
        year: 'numeric',
        month: "long",
        day: 'numeric'
    });
}