# EMP-VOCATION

Este software foi desenvolvido com base em um desafio técnico, a fim de testar os conhecimentos técnicos e resolução de problemas dos candidatos.

O EMP-VOCATION é um software de cadastro e gerenciamento de férias dos funcionários de uma empresa fictícia.

</br>
</br>

## Links Uteis

<li>Online Preview: <a href="https://frontend-emp-vocation.vercel.app/" target="_blank">Link</a></li>

</br>
</br>

## Instruções para uso

#### ATENÇÃO: Este projeto depende do seu BackEnd para funcionar corretamente!

Link do repositório do backend: <a href="https://github.com/ViniciusCChagas/backend-emp-vocation" target="_blank">Clique aqui</a>

### 1. Clonar repositório

Você pode clonar esse repositório utilizando o comando: <br>

```bash
$ git clone https://github.com/ViniciusCChagas/frontend-emp-vocation
```

ou você pode baixar o repositório como um arquivo .ZIP

### 2. Instalar as dependências

Após isso, na pasta do projeto rode o comando

```bash
$ npm install
#ou
$ yarn
```

para instalar todas as dependencias do projeto. <br>

### 3. Configurar as variaveis de ambiente

Depois de instalar todas as dependencias do projeto, devemos configurar as variaveis de ambiente:

Devemos criar um arquivo `.env` na raiz do projeto e então copiar o conteudo do arquivo `.env.example` para dentro, preenchendo os dados com as informações corretas.

```env
NEXT_PUBLIC_API_URL=<URL DO BACKEND>
```

### 4. Rodar a aplicação

Depois configurar as variaveis de ambiente, vamos executa-lo em modo de desenvolvimento, utilizando o comando:

```bash
$ npm run dev
# ou
$ yarn dev
```

Após isso podemos acessar o App no endereço: [http://localhost:3000](http://localhost:3000) e conferir o resultado.

</br>
</br>

## Algumas imagens do projeto

#### Lista de funcionários cadastrados:

![Lista de Funcionário](readme/lista-de-funcionarios.png)

<br/>

#### Formulário de cadastro de novo funcionário:

![Cadastro de Funcionáio](readme/cadastro-de-funcionario.png)

<br/>

#### Formulário de edição de funcionário:

![Edição de Funcionáio](readme/edicao-de-funcionario.png)

<br/>

#### Perfil do funcionário / Formulario de cadastro de férias:

![Perfil de Funcionáio](readme/perfil-funcionario.png)

## Ferramentas utilizadas

<li>NextJS</li>
<li>ChakraUI</li>
<li>Date-fns</li>
<li>ContextAPI</li>
<li>TypeScript</li>
<li>Sass</li>
