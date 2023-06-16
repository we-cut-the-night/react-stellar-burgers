import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import styles from './reset-password.module.css'

function ResetPassword() {
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ password: '', code: '' })

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  };

  useEffect(() => resetFormValues({ password: '', code: '' }), [resetFormValues])

  return (
    <section className={styles.root}>
      <div className={styles.content}>
        <h2 className={`${styles.header} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
        <form
          type="submit"
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
              error={Boolean(errors.password)}
              errorText={errors.password}
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
