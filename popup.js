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
                                hmap.set(website_name, hmap.get(website_name)+1);
                            } else {
                                hmap.set(website_name, 1);
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
        const top_k = get_top_k(hmap, 10);

        console.log(top_k);
    });
});
