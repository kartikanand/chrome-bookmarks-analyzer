function getWebsiteName(url) {
    let url_mod = url.toLowerCase();
    url_mod = removeProtocol(url_mod);

    const url_split = url_mod.split('.');
    if (url_mod.indexOf('www') !== -1) {
        return url_split[1];
    } else {
        return url_split[0];
    }
}

function removeProtocol(url) {
    let url_mod = url.replace('http://', '');
    url_mod = url_mod.replace('https://', '');

    return url_mod;
}

//exports.removeProtocol = removeProtocol;
//exports.getWebsiteName = getWebsiteName;
