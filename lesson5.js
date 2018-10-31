function makeCalendar(year, month){
    const firstDayOfMonth = new Date(year, month-1, 1);

    let dayOfWeek = firstDayOfMonth.getDay(); // день недели первого дня месяца

    //т.к. в js воскресенье - 0 день, переделываем его в 7й
    if (dayOfWeek === 0) {
        dayOfWeek = 7;
    }

    const lastDayOfMonth = new Date(year, month, 0); //последний день месяца

    const numberOfWeeks = Math.ceil((lastDayOfMonth.getDate() - (8 - dayOfWeek))/7) + 1; // количество недель в месяце

    const calendar = document.createElement('table'); //создание таблицы
    calendar.style.borderStyle = 'solid';
    calendar.style.borderWidth = '1px';
    calendar.style.borderCollapse = 'collapse';

    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']; // для заполнения заголовка таблицы
    let count = 1;

    for (let i = 0; i < numberOfWeeks + 1; i++){
        let week = document.createElement('tr');
        calendar.appendChild(week);

        for (let j = 0; j < 7; j++){
            let day = document.createElement('td');
            week.appendChild(day);

            if (i === 0) {
                day.textContent = days[j];
                day.style.backgroundColor = 'grey';
            } else if (i === 1) {
                if (j >= dayOfWeek - 1) {
                    day.textContent = count.toString();
                    count++;
                    day.onclick = function () {
                        const activeCell = document.getElementById('activeCell'); //поиск по body активной ячейки

                        if (activeCell !== null ) { //если такая ячейка есть - изменяем ее настройки на дефолтные, убираем id
                            activeCell.style.backgroundColor = '';
                            activeCell.style.color = '';
                            activeCell.removeAttribute('id');
                        }
                        //форматируем новую активную ячейку, добавляем id
                        day.style.backgroundColor = 'red';
                        day.style.color = 'white';
                        day.setAttribute('id', 'activeCell');
                    }
                }
            } else if (count <= lastDayOfMonth.getDate()) {
                day.textContent = count.toString();
                count++;

                day.onclick = function () {
                    const activeCell = document.getElementById('activeCell'); //поиск по body активной ячейки

                    if (activeCell !== null ) { //если такая ячейка есть - изменяем ее настройки на дефолтные, убираем id
                        activeCell.style.backgroundColor = '';
                        activeCell.style.color = '';
                        activeCell.removeAttribute('id');
                    }
                    //форматируем новую активную ячейку, добавляем id
                    day.style.backgroundColor = 'red';
                    day.style.color = 'white';
                    day.setAttribute('id', 'activeCell');
                }
            }

            //общие настройки форматирования для всех ячеек
            day.style.borderStyle = 'solid';
            day.style.borderWidth = '1px';
            day.style.width = '20px';
            day.style.height = '20px';
            day.style.textAlign = 'center';

        }
    }

    //добавляем дочерний элемент в body
    return document.body.appendChild(calendar);
}

//makeCalendar(2018,12);

