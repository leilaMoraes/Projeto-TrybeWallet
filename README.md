# ⭐ Boas-Vindas ao Repositório TrybeWallet 💸
> *Clique nas setas para ver mais* 
<details>
<summary><strong>👩‍💻 O Que Foi Desenvolvido</strong></summary><br />

Neste projeto foi desenvolvida uma carteira de controle de gastos com conversor de moedas, ao utilizar essa aplicação um usuário deverá ser capaz de:

- Adicionar, remover e editar um gasto;
- Visualizar uma tabela com seus gastos;
- Visualizar o total de gastos convertidos para uma moeda de escolha;

<div align="center">

![loginPage](https://github.com/leilaMoraes/Projeto-TrybeWallet/assets/109045940/8b8458bd-7aa5-4829-9d48-c4b7f879886a)
![WalletPage](https://github.com/leilaMoraes/Projeto-TrybeWallet/assets/109045940/50aa485d-6e7f-4b1d-a451-83eb1daaf5d6)
</div>
</details>

<details>
<summary><strong>👀 Para Rodar Localmente</strong></summary><br />

1. Clone o repositório   
  `git clone git@github.com:leilaMoraes/Projeto-TrybeWallet.git`
2. Navegue até a pasta do repositório clonado  
    `cd Projeto-TrybeWallet`
3. Instale as dependências no diretório raiz  
  `npm install`
</details>

<details>
<summary><strong>⚙️ API de Cotações de Moedas</strong></summary><br />

A página _web_ irá consumir os dados da API do _awesomeapi API de Cotações_ para realizar a busca de câmbio de moedas. Para realizar essas buscas, é necessário consultar o seguinte _endpoint_:

  - <https://economia.awesomeapi.com.br/json/all>

  O retorno desse endpoint será algo no formato:

  ```json
  {
    {
      "USD": {
        "code":"USD",
        "codein":"BRL",
        "name":"Dólar Americano/Real Brasileiro",
        "high":"5.6689",
        "low":"5.6071",
        "varBid":"-0.0166",
        "pctChange":"-0.29",
        "bid":"5.6173",
        "ask":"5.6183",
        "timestamp":"1601476370",
        "create_date":"2020-09-30 11:32:53"
        },
        ...
    }
  }
  ```
Mais informações sobre a API? Veja a [documentação](https://docs.awesomeapi.com.br/api-de-moedas).
</details>

## Requisitos do Projeto

1. Crie uma página inicial de login. ✔️
2. Crie um header na página da carteira. ✔️
3. Desenvolva um formulário para adicionar uma despesa. ✔️
4. Salve todas as informações do formulário no estado global. ✔️
5. Desenvolva testes para atingir 60% de cobertura total da aplicação. ✖️
6. Desenvolva uma tabela com os gastos. ✔️
7. Implemente a lógica para que a tabela seja alimentada pelo estado da aplicação. ✔️
8. Crie um botão para deletar uma despesa da tabela. ✔️
9. Crie um botão para editar uma despesa da tabela. ✔️
10. Desenvolva testes para atingir 90% de cobertura total da aplicação. ✖️
