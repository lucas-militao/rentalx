**RF** => Requisitos funcionais
 - São as funcionalidades que nossa aplicação vai poder ter.

**RNF** => Requisitos não funcionais
- Requisitos que não estão ligados a regra de negócio da aplicação, ex: os dados do usuário devem ser salvos em um banco de dados, isso entra em uma discussão sobre ferramentas externas, como qual o banco de dados que será utilizado, e isso não repercute nas regras de negócio da aplicação

**RN** => Regra de negócio
- Consistem em regras e diretrizes que estão por trás dos nossos requisitos, ex: o nome do usuário deve exceder 5 caracteres

/=======================================================================================================================================

# Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade por padrão.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
- Deve ser possível possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível listar todos os carros disponíveis pelo nome da marca.
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro.

**RNF**
- Utilizar o multer para o upload dos arquivos.

**NF**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel.

**RN**
- O aluguel deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação.
- Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível.

# Devolução de carro

**RF**
- Deve ser possível realizar a devolução de um carro.

**RN**
- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega,deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa 

# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuáio deve receber um -mail com o passo a passo parra recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas

/=======================================================================================================================================

## Storages
São armazenamentos specíficos dentro da nuvem onde é possível realizar o upload de arquivos. Toda a parte de hardware torna-se abstrata, deixando o desenvolvedor apenas preocupado com a parte de realizar o upload.