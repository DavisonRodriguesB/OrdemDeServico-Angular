Sistema de Ordem de Serviço e Roteirização (Em desenvolvimento)

(Angular • Standalone • Frontend)

🔹  Objetivo do Projeto

Este projeto tem como objetivo demonstrar, de forma prática, a construção de um Sistema de Gestão de Ordens de Serviço (OS) voltado para planejamento, execução e acompanhamento de serviços em campo.

O foco principal é arquitetura frontend, organização de código, roteamento, componentização e lógica de negócio, utilizando Angular moderno (Standalone) e Tailwind CSS, com dados mockados (sem backend).

🔹  Tecnologias Utilizadas

- Angular (Standalone Components)
- Angular Router
- TypeScript
- Tailwind CSS
- Git & GitHub

⚠️ Este projeto não utiliza backend. Todos os dados são simulados (mock).

🔹 Arquitetura do Projeto

O projeto segue uma arquitetura organizada e escalável:

src/app/

├── core/ 

├── shared/ 

├── features/

├── app.routes.ts

├── app.ts

└── app.component.*

🔹 Padrão adotado

Angular Standalone
Lazy loading por componente (loadComponent)
Rotas centralizadas em app.routes.ts
Separação clara de responsabilidades


🔹  Regras de Negócio

- Equipes só recebem serviços compatíveis com seu tipo
- Serviços concluídos não podem ser editados
- Execução só ocorre após atribuição
- Retorno de campo obrigatório para conclusão



🎓 Objetivo Profissional

Este projeto foi desenvolvido com foco em: Portfólio pessoal, Processos seletivos, Demonstração de domínio em Angular moderno, Boas práticas de arquitetura frontend

👤 Autor: Davison Rodrigues

Projeto em desenvolvimento para fins educacionais e profissionais.
