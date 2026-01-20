# Sistema de Ordem de Serviço e Roteirização
*(Em desenvolvimento – fins educacionais e profissionais)*

🚀 **Demo online:** https://ordem-de-servico-angular.vercel.app/login

---

## 📌 Sobre o Projeto
Sistema frontend para **gestão de Ordens de Serviço (OS)**, com foco em planejamento, execução e acompanhamento de serviços em campo, incluindo **roteirização inteligente por equipes com visualização em mapa**.

O projeto simula cenários reais de operação, aplicando **regras de negócio**, organização de código e **integração com Google Maps**, mesmo sem backend.

> ⚠️ Os dados são simulados (mocks), com foco total em lógica de negócio, arquitetura frontend e experiência do usuário.

---

## 🗺️ Integração com Google Maps
O sistema possui **integração com a API do Google Maps**, configurada via **Google Cloud**, permitindo:

- Exibição da **roteirização diretamente no mapa**
- Visualização da base operacional e dos pontos de atendimento
- Representação visual da sequência de ordens de serviço
- Simulação realista do deslocamento das equipes em campo

Essa integração reforça o foco do projeto em **experiência do usuário** e **simulação de cenários operacionais reais**.

---

## 🛠️ Tecnologias Utilizadas
- Angular (Standalone Components)
- Angular Router
- TypeScript
- Tailwind CSS
- Google Maps API (Google Cloud)
- Git & GitHub

---

## ⚙️ Funcionalidades
- Autenticação (Login e Auth Guard)
- Gestão de equipes
- Gestão de ordens de serviço
- Atribuição de ordens por equipe
- Roteirização baseada em prioridade e distância
- Visualização da rota no Google Maps
- Cálculo de distância e tempo estimado
- Interface moderna e responsiva com Tailwind CSS

---

## 🧠 Regras de Negócio Implementadas
- Equipes recebem apenas ordens compatíveis com seu tipo
- Ordens concluídas não podem ser editadas
- Execução ocorre somente após atribuição
- Retorno de campo obrigatório para conclusão
- Roteirização inteligente:
  - Ponto inicial definido pela base operacional
  - Próxima OS considera o último ponto atendido
  - Prioridade influencia a ordem de execução
  - Distância calculada de forma sequencial (rota realista)

---

## 🧱 Arquitetura do Projeto
Estrutura organizada e escalável:

```txt
src/app/
├── core/
├── shared/
├── features/
├── app.routes.ts
├── app.ts
└── app.component.*
