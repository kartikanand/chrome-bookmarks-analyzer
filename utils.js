//let BinaryHeap = require('./heap.js');

function getWebsiteName(url) {
    let url_mod = url.toLowerCase();
    url_mod = removeProtocol(url_mod);

    if (url_mod.indexOf('/') !== -1) {
        return url_mod.split('/')[0];
    } else if (url_mod.indexOf('?') !== -1) {
        return url_mod.split('?')[0];
    } else {
        return url_mod;
    }
}

function removeProtocol(url) {
    let url_mod = url.replace('http://', '');
    url_mod = url_mod.replace('https://', '');

    return url_mod;
}

function get_top_k(bookmarksMap, k) {
    const minHeap = new BinaryHeap(function (bookmark) {
        return bookmarksMap.get(bookmark);
    });

    const it = bookmarksMap.keys();
    let value = it.next().value;
    while (value && k) {
        minHeap.push(value);
        value = it.next().value;
        k--;
    }

    while(value) {
        const top = minHeap.top();
        const curr = value;
        value = it.next().value;

        if (bookmarksMap.get(top) < bookmarksMap.get(curr)) {
            minHeap.pop();
            minHeap.push(curr);
        }
    }

    let top_k = [];
    while (minHeap.size()) {
        const bookmark = minHeap.pop();
        top_k.push(bookmark);
    }

    return top_k;
}

//exports.removeProtocol = removeProtocol;
//exports.getWebsiteName = getWebsiteName;
//exports.get_top_k = get_top_k;
