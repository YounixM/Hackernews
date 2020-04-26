export function getFormattedDate (date) {
    let formattedDate = Date.parse(date);
    formattedDate = new Date(formattedDate);

    return formattedDate;
}