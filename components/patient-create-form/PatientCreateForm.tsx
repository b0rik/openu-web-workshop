'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { PatientCreateFormSchema } from '@/models/FormSchemas';
import { createPatient } from '@/actions/patients';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import { FormButton } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';
import { FormDatePicker } from '@/components/form/FormDatePicker';

const PatientCreateForm = ({ units }: { units: string[] }) => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof PatientCreateFormSchema>>({
    resolver: zodResolver(PatientCreateFormSchema),
    defaultValues: {
      id: '',
      firstName: '',
      lastName: '',
      dateOfBirth: undefined,
      unitName: '',
      roomNumber: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (values: z.infer<typeof PatientCreateFormSchema>) => {
    const result = await createPatient(values);

    if (result.success) {
      form.reset();
      setSuccess(result.success);
      setError(undefined);
      setTimeout(() => {
        setSuccess(undefined);
      }, 3000);
      // redirect to patients list?
    } else {
      setError(result.error);
    }
  };

  return (
    <FormCardWrapper title='Create a patient'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormField
              control={form.control}
              name='id'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <FormInput field={field} placeholder='Enter id' />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='unitName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <FormSelect
                      field={field}
                      placeholder='Select a unit'
                      options={units}
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <FormInput field={field} placeholder='Enter first name' />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <FormInput field={field} placeholder='Enter last name' />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='roomNumber'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room number</FormLabel>
                  <FormControl>
                    <FormInput field={field} placeholder='Enter room number' />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dateOfBirth'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of birth</FormLabel>
                  <FormControl>
                    <FormDatePicker field={field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormButton>Create</FormButton>
        </form>
      </Form>
    </FormCardWrapper>
  );
};

export default PatientCreateForm;
