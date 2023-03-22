import { useState, useRef } from "react";
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { useFormik } from 'formik';
import { contactFormSchema } from '../schemas';

const Contact = () => {

  const formRef = useRef();

  // Without Formik and Yup library
  // const [form, setForm] = useState({
  //   name: '',
  //   email: '',
  //   message: ''
  // })

  // button loading while submitting the form
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    message: ''
  }

  // Formik
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: contactFormSchema,

    onSubmit: (values, action) => {
      setLoading(true)
      emailjs.send(
        'service_sjb04m6',
        'template_spqdvqz',
        {
          form_name: values.name,
          to_name: 'Saniya Saher',
          from_email: values.email,
          to_email: 'saniyasaher99n@gmail.com',
          message: values.message
        },
        '-C-6dGy1jXpef0SYm'
      )
        .then(() => {
          setLoading(false);
          alert('Thank you! I will get back to you as soon as possible')
          
          action.resetForm();

        }, (error) => {
          setLoading(false)
          console.log(error)
          alert('Something went wrong!')
        }

        );
    }
  })

  // Without Formik and Yup library
  // const handleChange = (e) => {
  // const { name, value } = e.target;
  // setForm({ ...form, [name]: value })
  // console.log(setForm)
  // }

  // Without Formik and Yup library
  // Handle form Submit message Emailjs
  // const handleSubmit = (e) => {
  // e.preventDefault();
  //   setLoading(true)
  //   emailjs.send(
  //     'service_sjb04m6',
  //     'template_spqdvqz',
  //     {
  //       form_name: values.name,
  //       to_name: 'Saniya Saher',
  //       from_email: values.email,
  //       to_email: 'saniyasaher99n@gmail.com',
  //       message: values.message
  //     },
  //     '-C-6dGy1jXpef0SYm'
  //   )
  //     .then(() => {
  //       setLoading(false);
  //       alert('Thank you! I will get back to you as soon as possible')

  //       setForm({
  //         name: '',
  //         email: '',
  //         message: ''
  //       })

  //     }, (error) => {
  //       setLoading(false)
  //       console.log(error)
  //       alert('Something went wrong!')
  //     }

  //     );
  // }

  return (
    <div className="'xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] rounded-2xl bg-black-100 p-8'
      >
        <p className={`${styles.sectionSubText}`}>Get in Touch</p>
        <h3 className={`${styles.sectionHeadText}`}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >

          {/* Name field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.name && touched.name
              ?
              <p className="pl-1 text-red-400 font-light tracking-wide text-sm">{errors.name}</p>
              :
              null}
          </label>

          {/* Email field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.email && touched.email
              ?
              <p className="pl-1 text-red-400 font-light tracking-wide text-sm">{errors.email}</p>
              :
              null}
          </label>

          {/* Message field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              name="message"
              value={values.message}
              placeholder="What's your message?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {errors.message && touched.message
              ?
              <p className="pl-1 text-red-400 font-light tracking-wide text-sm">{errors.message}</p>
              :
              null}
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>

      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')