Estrutura de pastas e arquivos do projeto Agendei – WEB

AgendeiJS-WEB/  
├── public/  
│   ├── favicon.ico  
│   ├── index.html  
│   ├── logo.png  
│   └── manifest.json  
├── src/  
│   ├── assets/  
│   │   ├── images/  
│   │   │   ├── logo.png  
│   │   │   ├── banner.jpg  
│   │   │   └── avatar.png  
│   │   ├── styles/  
│   │   │   ├── global.css  
│   │   │   ├── buttons.css  
│   │   │   └── forms.css  
│   │   └── icons/  
│   │       ├── calendar.svg  
│   │       ├── user.svg  
│   │       └── doctor.svg  
│   ├── components/  
│   │   ├── Button.jsx  
│   │   ├── InputField.jsx  
│   │   ├── Modal.jsx  
│   │   ├── Navbar.jsx  
│   │   ├── Sidebar.jsx  
│   │   └── Table.jsx  
│   ├── pages/  
│   │   ├── appointment-add/  
│   │   │   ├── AppointmentAdd.jsx  
│   │   │   └── styles.css  
│   │   ├── appointments/  
│   │   │   ├── AppointmentsList.jsx  
│   │   │   ├── AppointmentDetails.jsx  
│   │   │   └── styles.css  
│   │   ├── doctors-add/  
│   │   │   ├── DoctorAdd.jsx  
│   │   │   └── styles.css  
│   │   ├── doctors/  
│   │   │   ├── DoctorsList.jsx  
│   │   │   ├── DoctorProfile.jsx  
│   │   │   └── styles.css  
│   │   ├── login/  
│   │   │   ├── Login.jsx  
│   │   │   ├── LoginForm.jsx  
│   │   │   └── styles.css  
│   │   ├── register/  
│   │   │   ├── Register.jsx  
│   │   │   ├── RegisterForm.jsx  
│   │   │   └── styles.css  
│   │   ├── users-add/  
│   │   │   ├── UserAdd.jsx  
│   │   │   └── styles.css  
│   │   ├── users/  
│   │   │   ├── UsersList.jsx  
│   │   │   ├── UserProfile.jsx  
│   │   │   └── styles.css  
│   ├── services/  
│   │   ├── api.js  
│   │   ├── authService.js  
│   │   ├── appointmentService.js  
│   │   ├── doctorService.js  
│   │   └── userService.js  
│   ├── utils/  
│   │   ├── helpers.js  
│   │   ├── validators.js  
│   │   └── constants.js  
│   ├── App.jsx  
│   ├── main.jsx  
│   └── routes.jsx  
├── .gitignore  
├── package.json  
├── package-lock.json  
├── README.md  
├── vite.config.js  
└── jsconfig.json  

📌 Estrutura e Conexões entre os Arquivos
A API é responsável pelo backend do sistema AgendeiJS, gerenciando autenticação, usuários, médicos e agendamentos. Ela segue um padrão MVC (Model-View-Controller) e usa Express.js para criação de rotas.
________________________________________
🔹 Arquivos Principais e Suas Funções
1️⃣ Configuração (config/)
Essa pasta gerencia as configurações gerais do sistema.
•   db.js
  - Realiza a conexão com o banco de dados (provavelmente MongoDB ou PostgreSQL).
  - Exporta essa conexão para ser usada nos modelos (models/).
•   default.json
  - Contém variáveis de ambiente, como:
    - URL do banco de dados.
    - Segredo para autenticação JWT.
    - Porta do servidor.
📌 Conexões:
•   db.js é chamado no app.js para conectar a API ao banco de dados.
________________________________________
2️⃣ Modelos (models/)
Define as estruturas dos dados no banco.
•   User.js → Define os usuários (pacientes ou administradores).
•   Doctor.js → Define os médicos registrados.
•   Appointment.js → Representa os agendamentos.
📌 Conexões:
•   São utilizados pelos controladores em controllers/ para buscar, criar ou alterar dados.
•   Interagem com db.js para acessar o banco de dados.
________________________________________
3️⃣ Controladores (controllers/)
Implementam a lógica de cada funcionalidade do sistema.
•   authController.js
  - Realiza login e registra usuários.
  - Gera e valida tokens JWT para autenticação.
  - Chamado em authRoutes.js.
•   userController.js
  - Gerencia usuários: criação, atualização e listagem.
  - Chamado em userRoutes.js.
•   doctorController.js
  - Gerencia médicos cadastrados.
  - Chamado em doctorRoutes.js.
•   appointmentController.js
  - Gerencia os agendamentos: criação, atualização e exclusão.
  - Chamado em appointmentRoutes.js.
📌 Conexões:
•   Chamam os modelos (models/) para interagir com o banco.
•   São chamados pelas rotas (routes/) para processar requisições.
________________________________________
4️⃣ Rotas (routes/)
Gerenciam os endpoints da API.
•   authRoutes.js → Login, logout e registro de usuários.
•   userRoutes.js → Gerencia usuários do sistema.
•   doctorRoutes.js → Gerencia médicos.
•   appointmentRoutes.js → Gerencia agendamentos.
📌 Conexões:
•   Chamam os controladores (controllers/) para processar requisições.
•   São incluídos no app.js para serem usados na API.
________________________________________
5️⃣ Middleware (middleware/)
São funções que interceptam requisições para adicionar segurança e tratamento de erros.
•   authMiddleware.js
  - Protege rotas privadas verificando tokens JWT.
  - Chamado em rotas protegidas (ex: agendamentos).
•   errorHandler.js
  - Captura erros e os padroniza em respostas JSON.
📌 Conexões:
•   authMiddleware.js é usado nas rotas para restringir acesso.
•   errorHandler.js é incluído em app.js para capturar erros da API.
________________________________________
6️⃣ Utilitários (utils/)
Contém funções auxiliares usadas em diferentes partes da API.
•   emailService.js → Envia emails (exemplo: confirmação de agendamento).
•   logger.js → Registra logs do sistema.
📌 Conexões:
•   emailService.js pode ser usado em appointmentController.js.
•   logger.js pode ser usado em errorHandler.js para registrar erros.
________________________________________
7️⃣ Arquivos de Inicialização
•   app.js
  - Arquivo principal que inicia o servidor.
  - Configura Express.js e carrega as rotas.
•   .env
  - Armazena variáveis de ambiente sensíveis (ex: senha do banco).
•   package.json
  - Lista as dependências do projeto.
📌 Conexões:
•   app.js chama db.js, routes/, middleware/ e inicia o servidor.
________________________________________
🔗 Fluxo Geral da API
1.  O usuário faz login em /api/auth/login.
2.  O token JWT é gerado e usado para acessar rotas protegidas.
3.  O usuário pode:
  - Criar um agendamento (/api/appointments).
  - Ver médicos cadastrados (/api/doctors).
  - Gerenciar usuários (/api/users).
4.  A API se comunica com o banco de dados através dos modelos.
5.  As requisições passam por middlewares para autenticação e tratamento de erros.


Telas:
![image](https://github.com/user-attachments/assets/3bf4dc6a-eb41-462a-93ff-0d30467540f8)
![image](https://github.com/user-attachments/assets/7e053205-6ff9-44ec-9b59-8c5400d70938)
![image](https://github.com/user-attachments/assets/1f966fa2-a6ad-4d83-a2ce-6b00a1803514)
![image](https://github.com/user-attachments/assets/21ee47a9-2b8c-4dd6-a9eb-db35c34c2f60)
![image](https://github.com/user-attachments/assets/6e0377c5-b182-4c8a-b0f0-c1cc96d98558)
![image](https://github.com/user-attachments/assets/ce9838b9-c194-475b-a679-297322febae7)
![image](https://github.com/user-attachments/assets/85af59df-3072-40da-bfb5-337dbac3490f)
![image](https://github.com/user-attachments/assets/2d93f4eb-2316-499b-a715-7e6bb2080635)
![image](https://github.com/user-attachments/assets/084833c0-19ac-4e5f-94eb-e67e652e98c8)
![image](https://github.com/user-attachments/assets/bfba9cc5-72be-453f-a958-f660fa3c5f50)














