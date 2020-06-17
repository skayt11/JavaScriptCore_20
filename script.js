const btnl = document.querySelector('input[value="Відправити в Local"]');
btnl.addEventListener('click', localSt = () => {
    try {
        const ageinput = document.getElementById('age');
        const setlocal = (name, value) => {
            value = encodeURIComponent(value); // encode
            localStorage.setItem(name, value); // Відправлення в localStorage
        }
        const user = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value
        }
        if (!user.name || !user.age) { // Перевірка чи заповненні всі поля
            local.innerHTML = `Заповніть всі поля.`;
        } else if (typeof (Storage) !== "undefined") { // Перевірка чи підтримує браузер localStorage.
            if (isNaN(user.age)) { // Перевірка поле вік на число
                ageinput.setAttribute("style", "background-color:#6e0214; border: 1px solid #c50021;");
                local.innerHTML = `<p style="color:#c50021">В поле вік дозволяється тільки число!</p>`;
            } else {
                for (const [key, value] of Object.entries(user)) {
                    setlocal(key, value); // Відправлення даних
                }
                ageinput.removeAttribute("style");
                local.innerHTML = `Ви зберегли в localStorage ім'я: ${user.name} і вік: ${user.age}.`;
            }
        } else {
            local.innerHTML = "На жаль, Ваш браузер не підтримує Storage...";
        }
    } catch (err) {
        console.error(err); // Перехоплення помилок
    }
});

const btndel = document.querySelector('input[value="Видалити з Local"]');
btndel.addEventListener('click', cookie = () => {
    try {
        if (localStorage.getItem('name') != null || localStorage.getItem('age') != null) {
            localStorage.clear(); // Видалення даних з localStorage
            local.innerHTML = `<p style="color:#063000">Дані з localStorage видалено!</p>`;
        } else {
            local.innerHTML = `<p style="color:#000283">Даних в localStorage не має!</p>`;
        }
    } catch (err) {
        console.error(err); // Перехоплення помилок видалення
    }
});

const local = document.getElementById('local');
if (localStorage.getItem('name') == null || localStorage.getItem('age') == null) { // При завантажені сторінки перевірка чи є дані в localStorage
    local.innerHTML = `<p style="color:#c50021">Зараз даних в localStorage не має!</p>`;
} else {
    const getname = localStorage.getItem('name');
    const getage = localStorage.getItem('age');
    local.innerHTML = `Поточні дані з localStorage - ім'я: ${decodeURIComponent(getname)}, вік: ${decodeURIComponent(getage)}.`
};

const cookietext = document.getElementById('cookie');
if (!document.cookie) { // При завантажені сторінки перевірка чи є Куки
    cookietext.innerHTML = `<p style="color:#c50021">Зараз Cookie не має!</p>`;
} else {
    cookietext.innerHTML = `Поточні дані з Cookie: ${decodeURIComponent(document.cookie)}.`;
};

const btnc = document.querySelector('input[value="Відправити в Cookie"]');
btnc.addEventListener('click', cookie = () => {
    try {
        const checked = document.getElementById('encode').checked;
        const ageinput = document.getElementById('age');
        const user = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value
        }
        const setCookiename = (userName, namevalue, userAge, agevalue) => {
            const date = new Date();
            date.setTime(date.getTime() + (10 * 1000)); // Встановлення часу для куків 10 секунд
            const expires = 'expires=' + date.toGMTString();
            const encodedname = encodeURIComponent(namevalue);
            const encodedage = encodeURIComponent(agevalue);
            if (checked == true) { // Перевірка чи користувач вибрав encode
                document.cookie = `${userName}=${encodedname};${expires};path=/`;
                document.cookie = `${userAge}=${encodedage};${expires};path=/`;
            } else {
                document.cookie = `${userName}=${namevalue};${expires};path=/`;
                document.cookie = `${userAge}=${agevalue};${expires};path=/`;
            }
        }
        const getCookie = (name) => { // Получення даних з не шифрованих Cookie
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
        if (!user.name || !user.age) { // Перевірка чи заповнені всі поля
            cookietext.innerHTML = `Заповніть всі поля.`;
        } else {
            if (isNaN(user.age)) { // Перевірка поле вік на число
                ageinput.setAttribute("style", "background-color:#6e0214; border: 1px solid #c50021;");
                cookietext.innerHTML = `<p style="color:#c50021">В поле вік дозволяється тільки число!</p>`;
            } else {
                setCookiename('username', JSON.stringify(user.name), 'userage', JSON.stringify(user.age)); // Відправлення даних
                ageinput.removeAttribute("style");
                if (checked == true) { // Перевірка чи користувач вибрав encode
                    cookietext.innerHTML = `Ви зберегли в Cookie ім'я: ${user.name} і вік: ${user.age}. Куки видаляться через 10 секунд.`;
                } else {
                    cookietext.innerHTML = `Ви зберегли в Cookie ім'я: ${getCookie('username')} і вік: ${getCookie('userage')}. Куки видаляться через 10 секунд.`;
                }
            }
        }
    } catch (err) {
        console.error(err); // Перехоплення помилок
    }
})