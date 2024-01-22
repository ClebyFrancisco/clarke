# Clk API

Este é o repositório da API Clk, que é uma aplicação Flask com SQLAlchemy para interação com um banco de dados PostgreSQL.

## Configuração do Ambiente

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/ClebyFrancisco/clarke.git
   cd claker-api

2. **Configurar Ambiente Virtual:**

 ```python3 -m venv .venv```
2.1 **Ativar Ambiente Virtual:**

    No Windows:
        .venv\Scripts\activate

        
    No Linux/Mac:
        source .venv/bin/activate
3. **Instalar Dependências:**
   ```pip install -r requirements.txt```
4. **Configurar o Arquivo .env:**
5. **Rodar Migrations:**
    ```flask db upgrade```
6. **Iniciar a Aplicação:**
    ```python app.py```

Com isso, a aplicação Flask será iniciada. Acesse a API em http://localhost:5000/