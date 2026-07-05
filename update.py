import requests
import json

API_KEY = "751d9f00a2ef59d9a40b2edb5f3b1995"

url = f"https://api.metalpriceapi.com/v1/latest?api_key={API_KEY}&base=TRY&currencies=USD,EUR,XAU"

r = requests.get(url, timeout=20)
data = r.json()

rates = data["rates"]

usd = round(1 / rates["USD"], 2)
eur = round(1 / rates["EUR"], 2)

# Gram altın (yaklaşık)
gram_altin = round((1 / rates["XAU"]) / 31.1035, 2)

output = {
    "usd": usd,
    "eur": eur,
    "gold": gram_altin
}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

print("Güncellendi.")
