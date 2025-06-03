import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
const formState = () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = document.querySelector('[data-form="sign-up"]');
  const submitButton = form.querySelector('[type="submit"]');

  const state = onChange({
    values: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    errors: {},
    isSubmitting: false,
  }, () => {
    updateForm();
  });

  const updateForm = () => {
    Object.entries(state.values).forEach(([name, value]) => {
      const input = form.querySelector(`[name="${name}"]`);
      if (input && input.value !== value) {
        input.value = value;
      }
    });
    form.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    form.querySelectorAll('.invalid-feedback').forEach(el => {
      el.remove();
    });
    Object.entries(state.errors).forEach(([field, error]) => {
      const input = form.querySelector(`[name="${field}"]`);
      if (!input) return;
      input.classList.add('is-invalid');
      const feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      feedback.textContent = error.message;
      input.parentNode.appendChild(feedback);
    });
    submitButton.disabled = state.isSubmitting || !isEmpty(state.errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmpty(state.errors) || state.isSubmitting) {
      return;
    }
    state.isSubmitting = true;
    try {
      await axios.post(routes.usersPath(), state.values);
      container.innerHTML = 'User Created!';
    } catch (error) {
      state.isSubmitting = false;
      alert(errorMessages.network.error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    state.values[name] = value;
    state.errors = validate(state.values);
  };

  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', handleChange);
  });
  form.addEventListener('submit', handleSubmit);

  submitButton.disabled = true;
}
export default formState;
// END
