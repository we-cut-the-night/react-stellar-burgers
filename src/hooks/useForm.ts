import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { IStringValues } from 'utils/types';

export const useForm = (valuesDefault: IStringValues) => {
  const [formValues, setFormValues] = useState(valuesDefault)
  const [errors, setErrors] = useState<IStringValues>({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement
    setFormValues({ ...formValues, [target.name]: target.value })
    if (target.name === "password") {
      target.value.length < 6 && target.value.length > 0
      ? setErrors({ ...errors, [target.name]: 'Пароль должен содержать не менее 6 символов' })
      : setErrors({ ...errors, [target.name]: '' })
    }
  }

  const resetFormValues = useCallback((values: IStringValues) => {
    setFormValues(values)
    setErrors({})
    setIsValid(false)
  }, [setFormValues, setErrors, setIsValid])

  useEffect(() => {
    (Object.values(formValues).some(element => element === '') || Object.values(errors).some(element => element !== ''))
      ? setIsValid(false)
      : setIsValid(true)
  }, [formValues, errors])

  return { formValues, handleChange, isValid, errors, resetFormValues }
}
