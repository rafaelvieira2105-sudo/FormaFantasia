import pandas as pd
import mysql.connector
import re

conn = mysql.connector.connect(
    host='switchback.proxy.rlwy.net',
    port=43418,
    user='root',
    password='YFyDxMoxDOMyqRbQyLNiEstbvgEiXBwp',
    database='railway'
)

cursor = conn.cursor()

df = pd.read_excel('/home/rafael/Projetos/Produtos.xlsx')

def limpar_html(texto):
    if pd.isna(texto):
        return ''
    return re.sub(r'<[^>]+>', '', str(texto)).strip()

# Extrair slug da categoria do URL
def extrair_slug_categoria(url):
    if pd.isna(url):
        return None
    partes = str(url).split('/')
    if len(partes) >= 4:
        return partes[3]
    return None

# Extrair categorias únicas do Excel
slugs_unicos = df['Link do produto'].apply(extrair_slug_categoria).dropna().unique()

for slug in slugs_unicos:
    nome = slug.replace('-', ' ').title()
    cursor.execute("SELECT Id FROM Categorias WHERE Slug = %s", (slug,))
    existe = cursor.fetchone()
    if not existe:
        cursor.execute("INSERT INTO Categorias (Nome, Slug, Descricao, EmDestaque) VALUES (%s, %s, %s, %s)", (nome, slug, '', False))

conn.commit()

for _, row in df.iterrows():
    nome = row['Nome do Produto (Português (Portuguese))']
    referencia = row['Referência do produto']
    preco = row['Preço do produto (imposto incl.)']
    if pd.isna(preco):
        continue
    stock = int(row['Quantidade do produto em estoque'])
    descricao = limpar_html(row['longa descrição (Português (Portuguese))'])
    foto_url = row['Link da imagem da capa do produto']
    url = row['Link do produto']
    slug_categoria = extrair_slug_categoria(url)

    if slug_categoria:
        cursor.execute("SELECT Id FROM Categorias WHERE Slug = %s", (slug_categoria,))
        resultado = cursor.fetchone()
        categoria_id = resultado[0] if resultado else 1
    else:
        categoria_id = 1
    cursor.execute("INSERT INTO Produtos (Nome, Descricao, Preco, Stock, FotoUrl, Referencia, CategoriaId) VALUES (%s, %s, %s, %s, %s, %s, %s)", (nome, descricao, preco, stock, foto_url, referencia, categoria_id))

conn.commit()
conn.close()   