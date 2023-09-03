import { FC, FormEvent, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import { createUser, getUserData } from 'services/actions/auth'
import { urls } from 'utils/constants'
import styles from './register.module.css'
import { getStoreUserData } from 'services/selectors'
import { useAppDispatch, useAppSelector } from 'hooks'

const Register: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(getStoreUserData)
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ name: "", email: '', password: '' })

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()

    const userData = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    }

    dispatch(createUser(userData, () => navigate('/')))
  };

  useEffect(() => {
    dispatch(getUserData())
    resetFormValues({ name: "", email: '', password: '' })
  }, [dispatch, resetFormValues])

  if (email) {
    return (
      <Navigate to={urls.constructor} replace />
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={`${styles.header} text text_type_main-medium pb-6`}>Регистрация</h2>
        <form
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
