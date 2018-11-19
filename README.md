GET https://localhost:3000/ - просмотр задач текущего пользователя
POST https://localhost:3000/login - авторизация пользователя
POST https://localhost:3000/signup - регистрация пользователя
POST https://localhost:3000/createToDo - создание задачи
POST https://localhost:3000/updateToDo - редактирование текста и/или статуса задачи
POST https://localhost:3000/deleteToDo - удаление задачи
GET https://localhost:3000/logout - выход пользователя из своей учетной записи

Шаблон JSON для регистрации/входа пользователя
{
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": ""
}

Шаблон JSON для создания, редактирования и удаления задач
{
    "id": "", //только для редактирования и удаления
    "text": "", //только для создания и для редактирования
    "status": "", //только для создания и редактирования, по-умолчанию 'Execute'
}
