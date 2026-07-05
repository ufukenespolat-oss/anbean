import requests
import feedparser
import json
from bs4 import BeautifulSoup

RSS_FEEDS = [
    "https://www.trthaber.com/rss/manset.rss",
    "https://www.ntv.com.tr/son-dakika.rss",
]

haberler = []

for rss in RSS_FEEDS:
    try:
        feed = feedparser.parse(rss)

        for item in feed.entries[:5]:

            aciklama = ""

            if "summary" in item:
                aciklama = BeautifulSoup(
                    item.summary,
                    "html.parser"
                ).get_text()

            haberler.append({
                "title": item.title,
                "link": item.link,
                "summary": aciklama,
                "published": item.get("published", "")
            })

    except Exception as e:
        print(e)

with open(
    "news.json",
    "w",
    encoding="utf-8"
) as f:
    json.dump(
        haberler,
        f,
        ensure_ascii=False,
        indent=2
    )

print("News updated.")
