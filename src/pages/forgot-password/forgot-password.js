import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import styles from './forgot-password.module.css'

function ForgotPassword() {
  const { formValues, handleChange, isValid, errors, resetFormValues } = useForm({ email: '' })

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
  };

  useEffect(() => resetFormValues({ email: '' }), [resetFormValues])

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
          <div className={`mb-6`}>
            <Input
              name={'email'}
              type={'email'}
              placeholder={'Укажите e-mail'}
              value={formValues.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
            />
          </div>
          <div className={styles.buttonSubmit}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isValid}
              size="large"
            >
              Восстановить
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

export default ForgotPassword;
