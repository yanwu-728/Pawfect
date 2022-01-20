# Credit: https://github.com/RTMJr/Scraping_Data_Project_1/blob/main/scrape.py

import csv
import requests
from bs4 import BeautifulSoup

page = requests.get("https://www.akc.org/expert-advice/dog-breeds/2020-popular-breeds-2019/")

soup = BeautifulSoup(page.content, 'html.parser')

table_data = soup.find_all('td')

temp = []

for i in range(len(table_data)):
    temp.append(table_data[i].get_text())

temp.pop(0)
temp.pop(0)

breeds = []
breed_count = []

for i in range(len(temp)):
    if (i % 2 == 0):
        breeds.append(temp[i].replace("\xa0", " "))
    else:
        breed_count.append(int(temp[i]))

print(breeds)