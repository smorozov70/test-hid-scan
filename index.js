document.addEventListener('DOMContentLoaded', function () {
    const outputDiv = document.getElementById('output');
    let currentText = ''; // Переменная для хранения текущего текста
    let timeoutId = null; // Таймер для отслеживания задержки ввода

    console.log('Загрузка формы');

    // Обработчик события keydown для всего документа
    document.addEventListener('keydown', function (event) {
        // Очищаем предыдущий таймер, если он существует
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Устанавливаем новый таймер на 1 секунду
        timeoutId = setTimeout(() => {
            console.log('Буфер сброшен из-за задержки ввода.');
            currentText = ''; // Сбрасываем текущий текст
            //outputDiv.textContent = ''; // Очищаем вывод
        }, 1000);

        if (event.key === 'Enter') {
            event.preventDefault(); // Предотвращаем отправку формы
            currentText += '\r\n'; // Добавляем CRLF при нажатии Enter
        } else if (event.key === 'Backspace' && currentText.length > 0) {
            currentText = currentText.slice(0, -1); // Удаляем последний символ при Backspace
        } else {
            currentText += event.key; // Добавляем введенный символ
        }

        checkAndDisplayOutput(currentText);
    });

    // Функция для проверки наличия CRLF и отображения результата
    function checkAndDisplayOutput(text) {
        if (text.includes('\r\n')) {
            const crlfPattern = /[\r\n]+(.+?)[\r\n]+/; // Ищем текст между CRLF
            const match = text.match(crlfPattern);

            if (match && match[1]) {
                outputDiv.textContent = `Текст между CRLF: ${match[1]}`;

                // Сбрасываем текущий текст после нахождения текста между CRLF
                currentText = text.substring(match[0].length); // Оставляем только то, что идет после найденной пары CRLF
            } else {
                outputDiv.textContent = '';
            }
        } else {
            outputDiv.textContent = '';
        }
    }
});