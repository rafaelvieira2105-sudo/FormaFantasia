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

def extrair_slug_categoria(url):
    if pd.isna(url):
        return None
    partes = str(url).split('/')
    if len(partes) >= 4:
        return partes[3]
    return None

mapeamento_categorias = {
    'calhas-tecto': 'calhas',
    'calhas-decorativas': 'calhas',
    'calhas-motorizadas': 'calhas',
    'calhas-estores-japoneses': 'calhas',
    'puxadores': 'varoes',
    'rosetas': 'varoes',
    'peles': 'tapeçarias',
    'pelo-baixo': 'tapeçarias',
    'fibras-naturais': 'tapeçarias',
    'personalizados-por-medida': 'tapeçarias',
    'todos-os-tapetes': 'tapeçarias',
    'varoes-de-escada-passadeira': 'tapeçarias',
    'colas-': 'colas',
    'vinil-decorativo-3d': 'vinil-decorativo',
    'decorativos': 'paineis-decorativos',
    'decorativos-infantis': 'paineis-decorativos',
    'decorativos-portas': 'paineis-decorativos',
    'decorativos-portas-infantil': 'paineis-decorativos',
    'panoramicos': 'paineis-decorativos',
    'panoramicos-infantil': 'paineis-decorativos',
    'essentials': 'paineis-decorativos',
    'kikki-belle-oliver-robins': 'paineis-decorativos',
    'decorativos-de-editor': 'paineis-decorativos',
    'the-wall-metropolitan-stories': 'paineis-decorativos',
}

# Cache de categorias para não ir à BD em cada produto
cache_categorias = {}

def obter_categoria_id(slug_colecao):
    slug_cat = mapeamento_categorias.get(slug_colecao, 'papel-de-parede')
    
    if slug_cat in cache_categorias:
        return cache_categorias[slug_cat]
    
    cursor.execute("SELECT Id FROM Categorias WHERE Slug = %s", (slug_cat,))
    resultado = cursor.fetchone()
    categoria_id = resultado[0] if resultado else 1
    cache_categorias[slug_cat] = categoria_id
    return categoria_id

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
    slug_colecao = extrair_slug_categoria(url)
    categoria_id = obter_categoria_id(slug_colecao) if slug_colecao else 1

    cursor.execute(
        "INSERT INTO Produtos (Nome, Descricao, Preco, Stock, FotoUrl, Referencia, CategoriaId) VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (nome, descricao, preco, stock, foto_url, referencia, categoria_id)
    )

conn.commit()
conn.close()
print("Importação concluída!")