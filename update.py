import json
import requests

data = {}

doviz = requests.get(
    "https://api.genelpara.com/json/?list=doviz&sembol=USD,EUR",
    timeout=20
).json()["data"]

altin = requests.get(
    "https://api.genelpara.com/json/?list=altin&sembol=GA,C,Y,T",
    timeout=20
).json()["data"]

data["usd"] = doviz["USD"]["satis"]
data["eur"] = doviz["EUR"]["satis"]

data["gram"] = altin["GA"]["satis"]
data["quarter"] = altin["C"]["satis"]
data["half"] = altin["Y"]["satis"]
data["full"] = altin["T"]["satis"]

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
