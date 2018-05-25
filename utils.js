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

function getBookmarks() {
    chrome.bookmarks.getTree(rootNode => {
        let frontier = rootNode;
        while (frontier.length) {
            let nxt = [];
            for (let node of frontier) {
                if ('children' in node) {
                    if (node.title) {
                        console.log(node.title);
                    }

                    for (let child of node.children) {
                        if ('children' in child) {
                            nxt.push(child);
                        }
                    }
                }
            }

            frontier = nxt;
        }
    });
}

exports.removeProtocol = removeProtocol;
exports.getWebsiteName = getWebsiteName;

