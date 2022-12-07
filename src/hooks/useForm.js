import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidate = {}) => {
    
    const [ formState, setFormState ] = useState(initialForm);
    const [ formValidations, setFormValidations ] = useState({});

    useEffect(() => {
        onCheckValidations();
    }, [formState]) 

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])

    const onInputChange = ({target}) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetValues = () => {
        setFormState(initialForm);
    }

    const onCheckValidations = () => {
        const formValidationValue = {}

        for (const formField of Object.keys(formValidate)) {
            const [fn, errorMessage] = formValidate[formField];
            formValidationValue[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage
        }
        setFormValidations(formValidationValue);
    }
    
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidations)) {
            if(formValidations[formValue] !== null) return false;
        }

        return true;
    }, [formValidations])




    return {
        ...formState,
        ...formValidations,
        formState,
        onInputChange,
        onResetValues,
        isFormValid
    }
}
