import { useState, useEffect, useCallback } from 'react'

export const useForm = (valuesDefault) => {
  const [formValues, setFormValues] = useState(valuesDefault)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const handleChange = (event) => {
    const target = event.target
    setFormValues({ ...formValues, [target.name]: target.value })
    if (target.name === "password") {
      target.value.length < 6 && target.value.length > 0
      ? setErrors({ ...errors, [target.name]: 'Пароль должен содержать не менее 6 символов' })
      : setErrors({ ...errors, [target.name]: '' })
    }
  }

  const resetFormValues = useCallback((values) => {
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
