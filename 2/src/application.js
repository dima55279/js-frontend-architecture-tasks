import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
const toDo = async () => {
    const ul = document.getElementById('tasks');
    const button = document.querySelector('[type="submit"]');
    const input = document.querySelector('[type="text"]');

    const firstResponse = await axios.get(routes.tasksPath());
    ul.innerHTML = '';
    firstResponse.data.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.classList.add('list-group-item');
        ul.appendChild(li);
    });

    button.addEventListener('click', async (e) => {
        e.preventDefault();
        await axios.post(routes.tasksPath(), { name: input.value });
        input.value = '';
        const secondResponse = await axios.get(routes.tasksPath());
        ul.innerHTML = '';
        secondResponse.data.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.name;
            li.classList.add('list-group-item');
            ul.appendChild(li);
        });
    });
};
export default toDo;
// END