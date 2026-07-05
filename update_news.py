import requests
import json

url = "https://api.rss2json.com/v1/api.json?rss_url=https://www.aa.com.tr/tr/rss/default?cat=guncel"

try:
    r = requests.get(url, timeout=20)
    data = r.json()

    news = []

    for item in data["items"][:10]:
        news.append({
            "title": item["title"],
            "link": item["link"],
            "image": item.get("thumbnail", "")
        })

    with open("news.json", "w", encoding="utf-8") as f:
        json.dump(news, f, ensure_ascii=False, indent=2)

    print("Haberler güncellendi.")

except Exception as e:
    print(e)
