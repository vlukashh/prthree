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
    mounted() {
        this.loadTasksFromStorage(); // Загрузка задач из хранилища при монтировании компонента
    },
    watch: {
        plannedTasks: {
            handler() {
                this.saveTasksToStorage(); // Сохранение задач в хранилище при изменении массива запланированных задач
            },
            deep: true,
        },
        inProgressTasks: {
            handler() {
                this.saveTasksToStorage(); // Сохранение задач в хранилище при изменении массива задач в процессе выполнения
            },
            deep: true,
        },
        testingTasks: {
            handler() {
                this.saveTasksToStorage(); // Сохранение задач в хранилище при изменении массива задач на тестировании
            },
            deep: true,
        },
        completedTasks: {
            handler() {
                this.saveTasksToStorage(); // Сохранение задач в хранилище при изменении массива выполненных задач
            },
            deep: true,
        },
    },
    methods: {
        saveTasksToStorage() {
            const tasks = {
                plannedTasks: this.plannedTasks,
                inProgressTasks: this.inProgressTasks,
                testingTasks: this.testingTasks,
                completedTasks: this.completedTasks
            };

            localStorage.setItem('tasks', JSON.stringify(tasks)); // Сохранение задач в локальное хранилище
        },
        loadTasksFromStorage() {
            const storedTasks = localStorage.getItem('tasks');

            if (storedTasks) {
                const tasks = JSON.parse(storedTasks);

                this.plannedTasks = tasks.plannedTasks || [];
                this.inProgressTasks = tasks.inProgressTasks || [];
                this.testingTasks = tasks.testingTasks || [];
                this.completedTasks = tasks.completedTasks || [];
            }
        },
        addCard() {
            const currentDateTime = new Date();
            const enteredDeadline = new Date(this.newCardDeadline);

            if (enteredDeadline < currentDateTime) {
                console.log('Ошибка! Вы выбрали прошедшую дату в качестве дедлайна.');
                return; // Прекращаем выполнение метода, если выбрана прошедшая дата
            }
            // Добавление новой задачи
            const newCard = {
                id: Date.now(),
                title: this.newCardTitle,
                description: this.newCardDescription,
                deadline: this.newCardDeadline,
                lastEdited: new Date().toLocaleString(),
                returnReason: ''
            };

            this.plannedTasks.push(newCard); // Добавление новой задачи в массив запланированных задач
            this.clearForm(); // Очистка формы
        },
    },


})