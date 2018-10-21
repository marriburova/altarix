/*1.	Функция – калькулятор. Получает 3 аргумента: первый операнд, оператор (+, -, *, /),
второй операнд. Если операнды не являются числами, функция выбрасывает исключение. Если передан неизвестный оператор –
функция выбрасывает исключение. Возвращает результат операции.*/

//Проверка количества переданных аргументов. Генерирует исключение, если параметров меньше 3
function checkNumberOfParameters(parameters) {
    if (parameters.length < 3) {
        throw 1;
    }
}

//Проверка, что первый и третий переданный аргумент являются конечныи числами
function isNumber(operand) {
    if (typeof(operand)!=='number' || !isFinite(operand)) {
        throw 2;
    }
}

//Проверка, что второй переданный аргумент является допустимым оператором
function checkOperator(operator) {
    if (operator !== '+' && operator !== '-' && operator !== '*' && operator !== '/') {
        throw 3;
    }
}

function getResult(operand1, operator, operand2) {
    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            throw 4;
    }
    return result;
}

function calc(operand1, operator, operand2) {
    try {
        checkNumberOfParameters(arguments);
    } catch(e) {
        if (e === 1) {
            return("Введены не все аргументы! Введите три аргумента (операнд1, 'оператор', операнд2)");
        }
    }

    try {
        isNumber(operand1);
    } catch(e) {
        if (e === 2) {
            return("Первый аргумент не является числом!");
        }
    }

    try {
        isNumber(operand2);
    } catch(e) {
        if (e === 2) {
            return("Третий аргумент не является числом!");
        }
    }

    try {
        checkOperator(operator);
    } catch (e) {
        if (e === 3) {
            return("Введен неверный оператор. Введите один из операторов: +, -, *, /");
        }
    }

    let result;

    try {
        result = getResult(operand1, operator, operand2);
    } catch(e) {
        if (e === '4') {
            return("Что-то пошло не так... Недостаточно проверок!");
        }
    }

    return result;
}

//Вызов функции calc() для проверки
console.log(calc(1, '+', 2));
console.log(calc(54, '$', 8));
console.log(calc(96, 75));
console.log(calc(65, '+', 134));
console.log(calc(54, '*', 2.4));
console.log(calc());

/*  2.	Функция получает первым параметром массив, каждый элемент которого является строкой.
Вторым параметром подстроку для поиска. Возвращает количество элементов массива, которые содержат переданную подстроку.*/

//Проверка количества переданных аргументов. Генерирует исключение, если параметров меньше 2
function checkNumberOfParameters2(parameters) {
    if (parameters.length < 2) {
        throw 1;
    }
}

//Проверка, что переданный аргумент является объектом, при этом не является null или {}, т.е. является массивом
function isObject(arr) {
    if (typeof arr !== "object" || arr === null || arr.length === undefined) { //если тип arr не объект, не null и обычный обеъкт, а не массив
        throw 2;
    }
}

//Проверка, что второй аргумент и элементы массива являются строками
function isString(str) {
    if (typeof(str) !== "string") {
        throw 3;
    }
}

//Проверка, что второй аргумент не пустая строка
function isEmptyString(str) {
    if (str.length === 0) {
        throw 4;
    }
}

function findString(arr, str) {
    try {
        checkNumberOfParameters2(arguments);
    } catch(e) {
        if (e === 1) {
            return("Введены не все аргументы! Введите два аргумента ([массив строчных элементов], 'подстрока для поиска')");
        }
    }

    try {
        isObject(arr);
    } catch (e) {
        if (e === 2) {
            return ("Первый аргумент не массив!");
        }
    }

    try {
        isString(str);
    } catch (e) {
        if (e === 3) {
            return ("Второй аргумент не является строкой!");
        }
    }

    try {
        isEmptyString(str);
    } catch (e) {
        if (e === 4) {
            return ("Второй аргумент является пустой строкой!");
        }
    }

    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        try {
            isString(arr[i]);
        } catch (e) {
            if (e === 3) {
                return (`Элемент массива с индексом ${i} не является строкой`);
            }
        }
        if (arr[i].indexOf(str) !== -1) {
            count++;
        }
    }

    return count;
}

console.log(findString('1'));
console.log(findString('1', '1'));
console.log(findString({},'1'));
console.log(findString(['we', 'rt'], 123));
console.log(findString(['123','456', 789, '123'], '3'));
console.log(findString(['dfh', 'swe'], ''));
console.log(findString(['qwe', 'wert', 'rty', 'qaswed', 'rwq1'], 'we'));

/* 3.	Функция получает число и возвращает строку с отформатированным значением вида «(-) 00 000 000,00».
Разделитель разрядов – пробел, разделитель целой и дробной части - запятая. Количество знаков после запятой –
от 0 до 2-х.*/


//Проверка количества переданных аргументов. Генерирует исключение, если параметров меньше 1
function checkNumberOfParameters3(parameters) {
    if (parameters.length < 1) {
        throw 1;
    }
}

function isNumber3(num) {
    if (typeof(num)!=='number' || !isFinite(num)) {
        throw 2;
    }
}

function makeStringIntPart (num, intPart) {
    let reminder; // остаток от деления
    let strIntPart = '';

    if (intPart < 1000) {
        strIntPart = intPart.toString();
        return(strIntPart);
    }
    //разбиение по разрядам
    do {
        reminder = intPart % 1000;
        if (reminder !== 0) {
            strIntPart = reminder.toString() + ' ' + strIntPart;
            intPart = Math.trunc(intPart / 1000);
        }
    } while (reminder !== 0);

    return(strIntPart.slice(0, -1));
}

function makeStringFractionPart (num, intPart) {
    let fractionPart; //дробная часть
    let comma = '';

    fractionPart = num - intPart;

    if (fractionPart > 0) { //если дробная часть есть - добавится разделитель запятая
        comma = ',';
    }

    return(comma+(+fractionPart.toFixed(2)).toString().slice(2,4)); // округление до двух знаков после запятой и вырезание только дроной части
}

function makeFormatString(num) {
    let minus = '';

    // Если число отрицательное, то в конце в строку добавиться минус
    if (num < 0) {
        minus = '- ';
        num = -1 * num;
    }

    let intPart; //целая часть числа
    intPart = Math.trunc(num);
    let str = minus + makeStringIntPart(num, intPart) + makeStringFractionPart(num, intPart);

    return(str);
}

function formatNumber(num) {
    try {
        checkNumberOfParameters3(arguments);
    } catch(e) {
        if (e === 1) {
            return('Вы не ввели ни одного аргумента! Введите число');
        }
    }
    try {
        isNumber3(num);
    } catch(e) {
        if (e === 2) {
            return('Введенное значение не является конечным числом!');
        }
    }

    //Округление до 2-х знаков после запятой
    num = Math.round(num * 100) / 100;

    return (makeFormatString(num));
}

console.log(formatNumber(-2432431234.1249234));
console.log(formatNumber(432431234.54821));
console.log(formatNumber(-756.4));
console.log(formatNumber(1395.46));
console.log(formatNumber(56));
console.log(formatNumber('1234'));
console.log(formatNumber());
