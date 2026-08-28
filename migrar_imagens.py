import mysql.connector
import cloudinary
import cloudinary.uploader
import requests

cloudinary.config(
    cloud_name="zdg4jn9j",
    api_key="679368213449457",
    api_secret="FffPypL-k8rQypIpTafYIxDswok"
)

conn = mysql.connector.connect(
    host='switchback.proxy.rlwy.net',
    port=43418,
    user='root',
    password='YFyDxMoxDOMyqRbQyLNiEstbvgEiXBwp',
    database='railway'
)
cursor = conn.cursor()

cursor.execute("SELECT Id, FotoUrl FROM Produtos WHERE FotoUrl IS NOT NULL AND FotoUrl != ''")
produtos = cursor.fetchall()

total = len(produtos)
print(f"Total de produtos com foto: {total}")

for i, (produto_id, foto_url) in enumerate(produtos):
    try:
        print(f"[{i+1}/{total}] Produto {produto_id}...")
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(foto_url, headers=headers, verify=False, timeout=10)

        if response.status_code == 200:
            resultado = cloudinary.uploader.upload(
                response.content,
                folder="formafantasia",
                public_id=f"produto_{produto_id}"
            )
            novo_url = resultado['secure_url']
            cursor.execute("UPDATE Produtos SET FotoUrl = %s WHERE Id = %s", (novo_url, produto_id))
            conn.commit()
        else:
            print(f"Imagem não encontrada: {foto_url}")

    except Exception as e:
        print(f"Erro no produto {produto_id}: {e}")
        continue

conn.close()
print("Migração concluída!")