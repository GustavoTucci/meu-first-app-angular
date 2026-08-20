# Gira & Ganha

Aplicação de roleta e sorteio feita com Angular 19. Adicione participantes, gire a roleta e registre os resultados de forma rápida e visual.

## Funcionalidades

- Roleta com uma fatia e uma cor para cada participante.
- Cores associadas aos nomes, preservadas enquanto a lista é editada.
- Opção para remover automaticamente o vencedor após o sorteio.
- Histórico dos últimos 20 resultados, salvo no `localStorage` do navegador.
- Efeitos sonoros opcionais com Web Audio API.
- Fanfarra instrumental ao revelar o vencedor.
- Confetes e animações visuais opcionais.
- Interface responsiva para desktop e dispositivos móveis.
- Renderização com Angular SSR.

## Requisitos

- Node.js 18.19 ou superior.
- npm.

## Instalação

```bash
npm install
```

## Desenvolvimento

Inicie o servidor local com:

```bash
npm start
```

Abra `http://localhost:4200/` no navegador. A aplicação recarrega automaticamente após alterações nos arquivos.

## Como usar

1. Edite a lista no painel **Participantes**, usando um nome por linha.
2. Escolha se o vencedor deve ser removido após o sorteio.
3. Ative ou desative **sons** e **efeitos visuais**.
4. Clique em **girar a roleta**.

Os participantes permanecem salvos apenas enquanto estiverem na lista atual. O histórico é persistido localmente no navegador e pode ser apagado pelo botão **limpar**.

Os sons são iniciados por uma ação do usuário, conforme as regras de reprodução dos navegadores. Eles podem ser desligados a qualquer momento.

## Build

Gere a versão otimizada para produção com:

```bash
npm run build
```

Os arquivos compilados são gerados em `dist/meu-app-angular/`.

Para iniciar a versão SSR depois do build:

```bash
npm run serve:ssr:meu-app-angular
```

## Testes

Execute os testes unitários:

```bash
npm test
```

Para uma execução única em ambiente headless:

```bash
npx ng test --watch=false --browsers=ChromeHeadless
```

Os testes cobrem a criação do componente, a seleção de vencedores, a remoção opcional e a associação dinâmica de cores aos participantes.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run watch` | Compila continuamente em modo desenvolvimento |
| `npm test` | Executa os testes com Karma |
| `npm run serve:ssr:meu-app-angular` | Inicia o servidor SSR após o build |

## Estrutura principal

```text
src/
  app/
    app.component.ts    # Estado e regras do sorteio
    app.component.html  # Interface da roleta
    app.component.css   # Layout, cores e animações
  styles.css            # Estilos globais e fontes
```