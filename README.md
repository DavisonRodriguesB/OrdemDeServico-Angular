Sistema de Ordem de Serviço e Roteirização

(Em desenvolvimento - fins educacionais e profissionais)

Angular • Standalone • Frontend

🔹 Objetivo do Projeto

Este projeto tem como objetivo demonstrar, de forma prática e profissional, a construção de um Sistema de Gestão de Ordens de Serviço (OS) voltado para o planejamento, execução e acompanhamento de serviços em campo, incluindo roteirização inteligente por equipes.

O foco principal está em:

Arquitetura frontend moderna

Organização e escalabilidade de código

Boas práticas com Angular Standalone

Regras de negócio bem definidas

Simulação realista de cenários operacionais

Todo o sistema é desenvolvido sem backend, utilizando dados mockados, com ênfase total em lógica de negócio e experiência frontend.

🔹 Tecnologias Utilizadas

Angular (Standalone Components)

Angular Router

TypeScript

Tailwind CSS

Git & GitHub

⚠️ Observação:
Este projeto não utiliza backend. Todos os dados são simulados via mocks, com serviços responsáveis pela lógica de negócio.
🔹 Arquitetura do Projeto

O projeto segue uma arquitetura organizada e escalável:

src/app/

├── core/ 

├── shared/ 

├── features/

├── app.routes.ts

├── app.ts

└── app.component.*

🔹 Padrões Adotados

- Angular Standalone Components

- Lazy Loading por componente (loadComponent)

- Rotas centralizadas em app.routes.ts

- Separação clara de responsabilidades

- Componentização focada em reutilização

- Serviços responsáveis por regras de negócio

🔹 Regras de Negócio Implementadas

- Equipes só recebem ordens compatíveis com seu tipo

- Ordens concluídas não podem ser editadas

- Execução do serviço só ocorre após atribuição

- Retorno de campo obrigatório para conclusão

- Roteirização inteligente:

- O ponto inicial é a base operacional

- Após cada atendimento, a próxima OS considera o último ponto atendido

- Prioridade do serviço influencia a ordem de execução

- Distância calculada de forma sequencial (rota realista)

🔹 Funcionalidades em Destaque

- Login Auth e Guard

- Gestão de equipes

- Gestão de ordens de serviço

- Atribuição de ordens por equipe

- Roteirização baseada em prioridade e distância

- Cálculo de distância e tempo estimado

- Interface moderna com Tailwind CSS

🎓 Objetivo Profissional

Este projeto foi desenvolvido com foco em:

📌 Portfólio pessoal

📌 Processos seletivos

📌 Demonstração de domínio em Angular moderno

📌 Aplicação prática de regras de negócio

📌 Boas práticas de arquitetura frontend


👤 Autor

Davison Rodrigues Bentes
Projeto em desenvolvimento para fins educacionais e profissionais.
