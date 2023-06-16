import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import styles from './register.module.css'

function Register() {
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ name: "", email: '', password: '' })

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  };

  useEffect(() => resetFormValues({ name: "", email: '', password: '' }), [resetFormValues])

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={`${styles.header} text text_type_main-medium pb-6`}>Регистрация</h2>
        <form
          type="submit"
          className={styles.form}
          onSubmit={handleFormSubmit}
          noValidate
        >
          <div className={`mb-6`}>
            <Input
              name={'name'}
              type={'text'}
              placeholder={'Имя'}
              value={formValues.name}
              onChange={handleChange}
              error={Boolean(errors.name)}
            />
          </div>
          <div className={`mb-6`}>
            <Input
              name={'email'}
              type={'email'}
              placeholder={'E-mail'}
              value={formValues.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
            />
          </div>
          <div className={`${Boolean(errors.password) ? "mb-0" : "mb-6"}`}>
            <PasswordInput
              name={'password'}
              placeholder={'Пароль'}
              value={formValues.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
              errorText={errors.password}
            />
          </div>
          <div className={styles.buttonSubmit}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid}
              size="large"
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className={`${styles.navigate} text text_type_main-default mt-20`}>
          Уже зарегистрированы?
          <Link to="/login" className={styles.navigateLink}> Войти</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
