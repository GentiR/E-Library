import { error } from 'console';
import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

export default observer(function RegisterAdmin() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{Firstname: '',Lastname: '', Username: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.registerAdmin(values).catch(error => 
                setErrors({error}))}
            validationSchema={Yup.object({
                Firstname: Yup.string().required(),
                Lastname: Yup.string().required(),
                Username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}    
        >
           {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivites' color='teal' textAlign='center' />
                    <MyTextInput name='Firstname' placeholder='Firstname' />
                    <MyTextInput name='Lastname' placeholder='Lastname' />
                    <MyTextInput name='Username' placeholder='Username' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage 
                        name='error' render={() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting} 
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}
        </Formik>
    )
})