import uniqueId from 'lodash/uniqueId.js';

// BEGIN
const listsCreator = () => {
    const renderLists = () => {
        listsContainer.innerHTML = '';
        const ul = document.createElement('ul');
        state.lists.forEach(list => {
            const li = document.createElement('li');
            if (list.id === state.currentListId) {
                const b = document.createElement('b');
                b.textContent = list.name;
                li.appendChild(b);
            } else {
                const a = document.createElement('a');
                a.href = `#` + list.id;
                a.textContent = list.name;
                li.appendChild(a);
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    state.currentListId = list.id;
                    renderLists();
                    renderTasks();
                });
            }
            ul.appendChild(li);
        });
        listsContainer.appendChild(ul);
    };

    const listsContainer = document.querySelector('[data-container="lists"]');
    const tasksContainer = document.querySelector('[data-container="tasks"]');
    const newListForm = document.querySelector('[data-container="new-list-form"]');
    const newTaskForm = document.querySelector('[data-container="new-task-form"]');
    const newListInput = document.getElementById('new-list-name');
    const newTaskInput = document.getElementById('new-task-name');

    const state = {
        lists: [],
        currentListId: null
    };

    const generalList = {
        id: uniqueId(),
        name: 'General',
        tasks: []
    };
    state.lists.push(generalList);
    state.currentListId = generalList.id;
    renderLists();

    const renderTasks = () => {
        tasksContainer.innerHTML = '';
        const currentList = state.lists.find(list => list.id === state.currentListId);
        if (!currentList || currentList.tasks.length === 0) {
            return;
        }
        const ul = document.createElement('ul');
        currentList.tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.name;
            ul.appendChild(li);
        });
        tasksContainer.appendChild(ul);
    };

    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const listName = newListInput.value.trim();
        if (!listName) return;
        const listExists = state.lists.some(list => list.name === listName);
        if (listExists) {
            newListInput.value = '';
            return;
        }
        const newList = {
            id: uniqueId(),
            name: listName,
            tasks: []
        };
        state.lists.push(newList);
        newListInput.value = '';
        renderLists();
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = newTaskInput.value.trim();
        if (!taskName) return;
        const currentList = state.lists.find(list => list.id === state.currentListId);
        if (!currentList) return;
        currentList.tasks.push({
            id: uniqueId(),
            name: taskName
        });
        newTaskInput.value = '';
        renderTasks();
    });
}
export default listsCreator;
// END