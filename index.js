const DEFAULT_TASKS = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


function handleDelete(event) {
    const itemElement = event.target.closest(".to-do__item");
    itemElement.remove();
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
}

function handleDuplicate(event) {
    const itemElement = event.target.closest(".to-do__item");
    const itemText = itemElement.querySelector(".to-do__item-text").textContent;
    const newItem = createItem(itemText);
    listElement.prepend(newItem);
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
}

function handleEdit(event) {
    const textElement = event.target.closest(".to-do__item").querySelector(".to-do__item-text");
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
}

function handleBlur(event) {
    const textElement = event.target;
    textElement.setAttribute('contenteditable', 'false');
    const tasks = getTasksFromDOM();
    saveTasks(tasks);
}

function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        return JSON.parse(storedTasks);
    } else {
        return DEFAULT_TASKS.slice();
    }
}

function createItem(item) {
    const template = document.getElementById("to-do__item-template");
    const clone = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = clone.querySelector(".to-do__item-text");
    const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
    const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
    const editButton = clone.querySelector(".to-do__item-button_type_edit");

    textElement.textContent = item;

    deleteButton.addEventListener('click', handleDelete);
    duplicateButton.addEventListener('click', handleDuplicate);
    editButton.addEventListener('click', handleEdit);
    textElement.addEventListener('blur', handleBlur);

    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
    const tasks = [];
    itemsNamesElements.forEach(function(element) {
        tasks.push(element.textContent);
    });
    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const initialTasks = loadTasks();

// Инициализация приложения
function init() {
    initialTasks.forEach(function(task) {
        const newItem = createItem(task);
        listElement.append(newItem);
    });
}

init();

formElement.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = inputElement.value.trim();

    if (taskText) {
        const newItem = createItem(taskText);
        listElement.prepend(newItem);

        const tasks = getTasksFromDOM();
        saveTasks(tasks);

        inputElement.value = '';
    }
});