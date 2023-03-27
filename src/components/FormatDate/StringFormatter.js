export const formatDate = (strDate) => {
    var date = new Date(strDate)
    var options = { year: 'numeric', month: 'long', day: 'numeric',hour:'numeric',minute:'numeric'};
    var formattedDate = date.toLocaleDateString("tr-TR", options)
    return formattedDate;
}

