new Vue({
    el: '#app',
    data: {
        plannedTasks: [], // Массив для запланированных задач
        inProgressTasks: [], // Массив для задач в процессе выполнения
        testingTasks: [], // Массив для задач на тестировании
        completedTasks: [], // Массив для выполненных задач
        newCardTitle: '', // Заголовок новой задачи
        newCardDescription: '', // Описание новой задачи
        newCardDeadline: '', // Дедлайн новой задачи
        currentDateTime: '',
        enteredDeadline: '',
    },
})