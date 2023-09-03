import { FC, FormEvent, useEffect } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import { login } from 'services/actions/auth'
import { urls } from 'utils/constants'
import styles from './login.module.css'
import { getStoreUserData } from 'services/selectors'
import { useAppDispatch, useAppSelector } from 'hooks'

const Login: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(getStoreUserData)
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ email: '', password: '' })

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    const userData = {
      email: formValues.email,
      password: formValues.password
    }

    dispatch(login(userData, () => navigate('/')))
  }

  useEffect(() => {
    resetFormValues({ email: '', password: '' })
  }, [dispatch, resetFormValues])

  if (email) {
    return (
      <Navigate to={urls.constructor} replace />
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={`${styles.header} text text_type_main-medium pb-6`}>Вход</h2>
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          noValidate
        >
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
              Войти
            </Button>
          </div>
        </form>
        <p className={`${styles.navigate} text text_type_main-default mt-20`}>
          Вы — новый пользователь?
          <Link to="/register" className={styles.navigateLink}> Зарегистрироваться</Link>
        </p>
        <p className={`${styles.navigate} text text_type_main-default mt-4`}>
          Забыли пароль?
          <Link to="/forgot-password" className={styles.navigateLink}> Восстановить пароль</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
