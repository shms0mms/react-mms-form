# Документация по библиотеке react-mms-form

# Чтобы создать форму, вам нужно вызвать hook - useForm

# Из которого вы можете получить - register

# register - (name: string, params: ValidateParams),

# Функция благодаря которой вы регистрируете поля и заносите их в state (хранилище)

# Также можете получить data - объект со значениями всех полей

# handleSubmit, функция которая делает так, чтобы страница сайта не перезагружалась после отправки формы, также в нее мы закидываем функцию, которая получит data, чтобы при submit работать с данными полей

# Можно получить состояние поля благодаря функции ... -

getFieldValues - (names: string[]) - она возвращает объект с полями, которые имена мы передали в аргументы функции, в объекте присутствуют такие поля, как isValid, isTouched, isInvalid, isFocus, isClick, isHover, а также ... -
поле error: { message: "Название ошибки" }

# Поговорим о параметрах useForm - {}

# Можно передать mode - "onSubmit" или "onChange", по умолчанию - "onChange"

От mode зависит, когда будет вызываться валидация полей, а также сохранение в storage, о котором поговорим чуть позже

# withLocalStorage - объект в который можем передать поля, которые нужно сохранять в localStorage, зависит от mode

# withCookies - тоже самое что и withLocalStorage, но можно сохранять в cookies