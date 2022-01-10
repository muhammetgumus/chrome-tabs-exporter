export function convertUrlsToString(urls) {
    var result = "";
    urls.forEach(url => result += url + "\n");
    return encodeURIComponent(result);
}