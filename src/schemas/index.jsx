import * as Yup from 'yup';

export const contactFormSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter a valid email"),
    message: Yup.string().min(2).required("Please enter message")
})