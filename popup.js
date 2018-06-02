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

                            if (hmap.has(website_name)) {
                                hmap.set(website_name, hmap.get(website_name) + 1);
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

function createPieChart(ctx, dataMap, bookmarksMap) {
    const data = {
        datasets: 
        [{
            data: dataMap.map((elem) => bookmarksMap.get(elem)),
            backgroundColor: [
                '#f1c40f',
                '#3498db',
                '#1abc9c',
                '#8e44ad',
                '#2c3e50',
                '#fd79a8',
                '#fab1a0',
                '#e84393',
                '#a29bfe',
                '#fdcb6e'
            ]
        }],

        labels: dataMap,

    };

    console.log(data);

    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: data
    });
}

document.getElementById('js-get-bookmarks').addEventListener('click', () => {
    getBookmarks()
    .then((hmap) => {

        console.log(hmap);

        const top_k = get_top_k(hmap, 10);
        console.log(top_k);
        const ctx = document.getElementById('pieChart');

        createPieChart(ctx, top_k, hmap);
    });
});
