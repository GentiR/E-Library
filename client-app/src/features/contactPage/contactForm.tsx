import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import logo from './logo.svg';
import "./form.css";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';
type FormState ={
  email: string;
  name: string;
  message: string;
}
type ServiceMessage = {
  class: string;
  text: string;
}

function ContactForm() {
  const formId = 'HrHX4pRp';
  const formSparkUrl = `https://submit-form.com/${formId}`;
  const recaptchaKey = '6Ld-3Z0fAAAAAKhk2lOdIS7Cd1IXZaKZhIVgQCBC';
  const recaptchaRef = useRef<any>();
  const initialFormState = {
    email: "",
    name: "",
    message: "",
  };

  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<ServiceMessage>();
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  async function submitForm(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    await postSubmission();
    setSubmitting(false);

  };
  const postSubmission = async () => {
  const payload = {
   ...formState,
   "g-recaptcha-response": recaptchaToken
  };
  try{
    const result = await axios.post(formSparkUrl, payload) ;
    console.log(result);
    setMessage({
      class: 'green',
      text: 'Thankyou, someone will be in touch with you shortly.',
    });
    setFormState(initialFormState);
    recaptchaRef.current.reset();
  }catch(error){
    console.log(error);
    setMessage({
      class: 'red',
      text: 'Sorry, there was a problem. Please try again.',
    });
  }
  };

  const updateFormControl = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    const formKey = id as keyof FormState;
    const updatedFormState = { ...formState };
    updatedFormState[formKey] = value;
    setFormState(updatedFormState);
  };

  const UpdateRecaptchaToken = (token: string | null) => {
    setRecaptchaToken(token as string);
  };

  return (
    <div className="container">
  <div className="container1">
  <h1>
        <span>Contact Us</span>
      </h1>
      {message && <div className={`message  ${message.class}` }>
        {message.text}
        </div>}
      <form className="form" onSubmit={submitForm}>
        <div>
          <label htmlFor="name">Name</label>
          <input onChange={updateFormControl} type="text" id="name" value={formState?.name}/>
          </div>
          <div>
          <label htmlFor="email">Email</label>
          <input onChange={updateFormControl} type="text" id="email" value={formState?.email}/>
          </div>
          <div>
          <label htmlFor="message">Message</label>
          <textarea onChange={updateFormControl}  id="message" value={formState?.message}/>
          </div>
          <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaKey}
          onChange={UpdateRecaptchaToken}
          />
        <button disabled={submitting} className="btn">
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
  </div>
    </div>
  )
}
export default ContactForm;