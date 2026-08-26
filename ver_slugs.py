import pandas as pd
import re

df = pd.read_excel('/home/rafael/Projetos/Produtos.xlsx')

def extrair_slug_categoria(url):
    if pd.isna(url):
        return None
    partes = str(url).split('/')
    if len(partes) >= 4:
        return partes[3]
    return None


slugs = df['Link do produto'].apply(extrair_slug_categoria).dropna().unique()
for s in sorted(slugs):
    print(s)