import normalizeUrl from 'normalize-url';
import Chart from 'chart.js';
import Heap from 'heap-js';

function getWebsiteName(url) {
  let url_mod = url.toLowerCase();

  if (url_mod.indexOf('/') !== -1) {
    url_mod = url_mod.split('/')[0];
  }

  return url_mod;
}

function getBookmarks() {
  return new Promise((resolve) => {
    const hmap = new Map();

    chrome.bookmarks.getTree(rootNode => {
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
              let website_name = normalizeUrl(url, {
                stripAuthentication: true,
                stripHash: true,
                stripProtocol: true,
                stripWWW: true,
                removeQueryParameters: true,
                removeTrailingSlash: true,
                removeSingleSlash: true
              });

              website_name = getWebsiteName(website_name);

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
}

function createPieChart(dataMap, bookmarksMap) {
  const ctx = document.getElementById('pieChart');

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

  new Chart(ctx, {
    type: 'doughnut',
    data: data
  });
}

document.getElementById('js-get-bookmarks').addEventListener('click', async () => {
  const bookmarksMap = await getBookmarks();

  const minHeap = new Heap((a, b) => bookmarksMap.get(b) - bookmarksMap.get(a));
  bookmarksMap.forEach((v, k, m) => {
    minHeap.add(k)
  });

  const top_k = minHeap.top(5);
  createPieChart(top_k, bookmarksMap);
});
