import { useEffect, FC, FormEvent, FocusEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useForm } from 'hooks/useForm'
import ProfileNavigation from 'components/profile-navigation/profile-navigation'
import { updateUserData } from 'services/actions/auth'
import styles from './profile.module.css'
import { getStoreUserData } from 'services/selectors'
import { AppDispatch } from 'utils/types'

const Profile: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loggedIn, name, email } = useSelector(getStoreUserData)

  const {
    formValues,
    handleChange,
    errors,
    resetFormValues,
  } = useForm({
    name: name,
    email: email,
    password: ''
  })

  const isValid =
    formValues.name !== name ||
    formValues.email !== email ||
    formValues.password !== ''

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    let userData = {}

    if (formValues.name !== name) {
      userData = ({ ...userData, name: formValues.name })
    }
    if (formValues.email !== email) {
      userData = ({ ...userData, email: formValues.email })
    }
    if (formValues.password !== '') {
      userData = ({ ...userData, password: formValues.password })
    }

    dispatch(updateUserData(userData))
    resetFormValues({ name: name, email: email, password: '' })
  };

  const handleCancel = () => resetFormValues({ name: name, email: email, password: '' })

  const deactivateInput = (event?: FocusEvent) => {
    const target = event?.currentTarget
      .closest('.input')
      ?.querySelector('input') as HTMLInputElement
      target.setAttribute('readonly', 'true');
  }

  const activateInput = (event?: React.MouseEvent<HTMLDivElement>) => {
    const target = event?.currentTarget
    .closest('.input')
    ?.querySelector('input') as HTMLDivElement
    target.removeAttribute('readonly')
    target.focus()
  }

  useEffect(() => {
    Array.from(document.querySelectorAll('input')).forEach(input =>
      input.setAttribute('readonly', 'true')
    );
  }, []);

  useEffect(() => {
    if (loggedIn) {
      resetFormValues({ name: name, email: email, password: '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFormValues, name, email])

  return (
    <section className={styles.root} aria-label="Профиль">
      <div className={styles.content}>
        <ProfileNavigation />
        <form
          className={`${styles.form} ml-15 mr-15`}
          noValidate
          onSubmit={handleFormSubmit}
        >
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              value={formValues.name}
              error={Boolean(errors.name)}
              errorText={errors.name}
              onChange={handleChange}
              onIconClick={activateInput}
              onBlur={deactivateInput}
              icon={'EditIcon'}
              name={'name'}
              size={'default'}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'email'}
              placeholder={'Логин'}
              value={formValues.email}
              error={Boolean(errors.email)}
              errorText={errors.email}
              onChange={handleChange}
              onIconClick={activateInput}
              onBlur={deactivateInput}
              icon={'EditIcon'}
              name={'email'}
              size={'default'}
            />
          </div>
          <div className={`${styles.inputWrapper} mb-6`}>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              value={formValues.password}
              error={Boolean(errors.password)}
              errorText={errors.password}
              onChange={handleChange}
              onIconClick={activateInput}
              onBlur={deactivateInput}
              icon={'EditIcon'}
              name={'password'}
              size={'default'}
            />
          </div>
          <div
            className={`${styles.buttonWrapper} ${isValid ? styles.buttonWrapperActive : ''
              }`}
          >
            <Button
              htmlType="submit"
              type="primary"
              disabled={!isValid}
              size="large"
            >
              Сохранить
            </Button>
            <button
              type="button"
              className={`${styles.button} text text_type_main-default`}
              onClick={handleCancel}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile
