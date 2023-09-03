import { FC, FormEvent, useEffect } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import { getUserData, resetPasswordEnd } from 'services/actions/auth'
import { urls } from 'utils/constants'
import styles from './reset-password.module.css'
import { getStoreUserData } from 'services/selectors'
import { useAppDispatch, useAppSelector } from 'hooks'

const ResetPassword: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email } = useAppSelector(getStoreUserData)
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ password: '', code: '' })

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(formValues)
    const data = { password: formValues.password, token: formValues.code }

    dispatch(resetPasswordEnd(data, () => navigate('/login')))
  };

  useEffect(() => {
    dispatch(getUserData())
    resetFormValues({ password: '', code: '' })
  }, [dispatch, resetFormValues])

  if (email) {
    return (
      <Navigate to={urls.constructor} replace />
    )
  }

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={`${styles.header} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form
          className={styles.form}
          onSubmit={handleFormSubmit}
          noValidate
        >
          <div className={`${Boolean(errors.password) ? "mb-0" : "mb-6"}`}>
            <PasswordInput
              name={'password'}
              placeholder={'Введите новый пароль'}
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className={`mb-6`}>
            <Input
              name={'code'}
              type={'text'}
              placeholder={'Введите код из письма'}
              value={formValues.code}
              onChange={handleChange}
              error={Boolean(errors.code)}
            />
          </div>
          <div className={styles.buttonSubmit}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid}
              size="large"
            >
              Сохранить
            </Button>
          </div>
        </form>
        <p className={`${styles.navigate} text text_type_main-default mt-20`}>
          Вспомнили пароль?
          <Link to="/login" className={styles.navigateLink}> Войти</Link>
        </p>
      </div>
    </section>
  );
}

export default ResetPassword;
