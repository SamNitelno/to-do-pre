let items = [
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

function loadTasks() {
    const tasks = localStorage.getItem('tasks');
    StoredTasks = JSON.parse(tasks);
    if (StoredTasks.length > 0) {
        return StoredTasks;
    }
    else {
        return items;
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

    deleteButton.addEventListener("click", (e) => {
        clone.remove();
        const tasks = getTasksFromDOM();
        saveTasks(tasks);
    })

    duplicateButton.addEventListener("click", (e) => {
        const itemName = textElement.textContent;
        const nemItem = createItem(item);
        listElement.prepend(nemItem);
        items = getTasksFromDOM();
        saveTasks(items);
    })

    editButton.addEventListener("click", (e) => {
        textElement.setAttribute('contenteditable', "true");
        textElement.focus();
    })

    textElement.addEventListener("blur", (e) => {
        textElement.setAttribute('containeditable', 'false');
        items = getTasksFromDOM();
        saveTasks(items);
    })
    return clone;
}

function getTasksFromDOM() {
    const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];

    itemsNamesElements.forEach(itemName => {
        tasks.push(itemName.textContent);
    })

    return tasks;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();
items.forEach(item => {
    newItem = createItem(item);
    listElement.append(newItem);
})

formElement.addEventListener("submit", event => {
    event.preventDefault();

    const inputText = inputElement.value;

    const newItem = createItem(inputText);
    listElement.prepend(newItem);

    inputElement.value = "";
    items = getTasksFromDOM();
    saveTasks(items);
});