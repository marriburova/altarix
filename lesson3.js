// принимает функцию и контекст вызова, возвращает функцию,
// которая всегда будет иметь корректный контекст вызова

function bind(func, context) {
    return function() {
        func.call(context); // вернется функция, которая вызывается через метод call с указанием контекста вызова 'context'
    }
}

const test = {
    key: 'test',
    f: function() {
        console.log(this.key);
    }
};

//Проверка
setTimeout(test.f, 1000); // будет ошибка, потерян контекст вызова
setTimeout(bind(test.f, test), 1000); // будет работать


// которая возвращает результат parseInt, если вызвана с таким аргументом впервые,
// иначе не вычисляет заново, а возвращает сохранённое значение

function parseIntWithCache() {
    let cache = null;
    let cacheArguments = null;

    return function () {
        if (arguments[0] === cacheArguments) {
            console.log("Значение из кэша "); // вывод для проверки откуда берется значение
            return cache;
        } else {
            cacheArguments = arguments[0];
            console.log("Новое значение "); // вывод для проверки откуда берется значение
            return cache = parseInt(arguments[0]);
        }
    }
}

// Проверка
// в int записывается анонимная функция из parseIntCaсhe с Lexical Environment
// в данном Lexical Environment объявлены переменные cache и caсheArguments
let int = parseIntWithCache();

console.log(int('14px'));
console.log(int('16px'));
console.log(int('16px'));
console.log(int('14px'));


// принимает любое количество аргументов,
// возвращает их сумму, без for

function getTotalSum() {
    const result = new Function('return ' + [].join.call(arguments, '+'));

    return result();
}

//Проверка
console.log(getTotalSum(1,2,3,4,5,6));
console.log(getTotalSum(1,2,-3,4,-5,6));
