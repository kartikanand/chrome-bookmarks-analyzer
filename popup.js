function getBookmarks() {
    const bookmarkPromise = new Promise(function (resolve, reject) {
        chrome.bookmarks.getTree(rootNode => {
            const hmap = new Map();

            let frontier = rootNode;
            while (frontier.length) {
                let nxt = [];
                for (let node of frontier) {
                    if ('children' in node) {
                        for (let child of node.children) {
                            nxt.push(child);
                        }
                    } else {
                        if ('url' in node) {
                            const url = node.url;
                            const website_name = getWebsiteName(url);

                            if (website_name in hmap) {
                                hmap[website_name]++;
                            } else {
                                hmap[website_name] = 1;
                            }
                        }
                    }
                }

                frontier = nxt;
            }

            resolve(hmap);
        });
    });

    return bookmarkPromise;
}

document.getElementById('js-get-bookmarks').addEventListener('click', () => {
    getBookmarks()
    .then((hmap) => {
        console.log(hmap);
    });
});
