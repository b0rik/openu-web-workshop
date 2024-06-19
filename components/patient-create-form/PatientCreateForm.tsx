'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { PatientCreateFormSchema } from '@/models/FormSchemas';
import { createPatient } from '@/actions/patients';

import { Form } from '@/components/ui/form';
import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import { FormButton } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';
import { FormDatePicker } from '@/components/form/FormDatePicker';

export const PatientCreateForm = ({ units }: { units: string[] }) => {
  const router = useRouter();
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
        router.push('/patients');
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <FormCardWrapper title='Create a patient'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormInput name='id' label='ID' placeholder='Enter id' />

            <FormSelect
              name='unitName'
              label='Unit'
              placeholder='Select a unit'
              options={units}
            />

            <FormInput
              name='firstName'
              label='First Name'
              placeholder='Enter first name'
            />

            <FormInput
              name='lastName'
              label='Last Name'
              placeholder='Enter last name'
            />

            <FormInput
              name='roomNumber'
              label='Room Number'
              placeholder='Enter room number'
            />

            <FormDatePicker name='dateOfBirth' label='Date of birth' past />
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormButton>Create</FormButton>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
