
import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid} from 'uuid';
import { Formik, Form,  } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Event } from "../../../app/models/event";



export default observer (function EventForm() {
    const history = useHistory();
    const {eventStore} = useStore();
    const { createEvent, updateEvent, loading, loadEvent, loadingInitial} = eventStore;
    const {id} = useParams<{id: string}>();

    const [eventt, setEvent] = useState<Event>({
    id: '',
    title: '',
    category: '',
    description: '',
    date: null,
    venue: ''
});
const validationSchema = Yup.object({
    title: Yup.string().required('The event titel is Required'),
    description: Yup.string().required('The event description is Required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required()
})

useEffect(() => {
    if (id) loadEvent(id).then(eventt => setEvent(eventt!))
}, [id, loadEvent]);
    
    function handleFormSubmit(eventt: Event){
      if (eventt.id.length === 0) {
          let newEvent = {
              ...eventt,
              id: uuid()
          };
          createEvent(newEvent).then(() => history.push(`/events/${newEvent.id}`));
      }else{
          updateEvent(eventt).then(() => history.push(`/events/${eventt.id}`));
      }
    }
  

 return(
     <Segment clearing>
         
         <Header content='Event Details' sub color="teal"/>
         <Formik
         validationSchema={validationSchema} 
         enableReinitialize
         initialValues={eventt} 
         onSubmit={values => handleFormSubmit(values)}>
           {({handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name="title" placeholder="Title"/>
             <MyTextArea rows={3} placeholder='Description' name='description'/>
             <MySelectInput placeholder='Category' name='category' options={categoryOptions}/>
             <MyDateInput
              placeholderText="Date"
              name='date'
              showTimeSelect
              timeCaption="time"
              dateFormat='MMMM d, yyyy h:mm aa'/>
              <Header content='Loaction Details' sub color="teal"/>
             <MyTextInput placeholder='Venue' name='venue'/>
             <Button 
             disabled={isSubmitting || !dirty || !isValid}
             loading={loading} floated="right" positive type="submit" content='Submit'/>
             <Button  as={Link} to={`/events/`} floated="right"  type="button" content='Cancel'/>
         </Form>
           )}
         </Formik>
         
     </Segment>
 )
})