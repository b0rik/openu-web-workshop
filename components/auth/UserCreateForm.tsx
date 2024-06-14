'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { UserCreateFormSchema } from '@/models/FormSchemas';
import { createUser } from '@/actions/auth';

import { Form } from '@/components/ui/form';
import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import { FormButton } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';

export const UserCreateForm = ({ roles }: { roles: string[] }) => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof UserCreateFormSchema>>({
    resolver: zodResolver(UserCreateFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (values: z.infer<typeof UserCreateFormSchema>) => {
    const result = await createUser(values);

    if (result.success) {
      form.reset();
      setSuccess(result.success);
      setError(undefined);
      setTimeout(() => {
        setSuccess(undefined);
      }, 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <FormCardWrapper title='Create a user'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid gap-6 md:grid-cols-2'>
            <FormInput
              name='username'
              label='Username'
              placeholder='Enter username'
            />

            <FormSelect
              name='role'
              label='Role'
              placeholder='Select a role'
              options={roles}
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
              name='password'
              label='Password'
              placeholder='Enter password'
              type='password'
            />

            <FormInput
              name='confirmPassword'
              label='Confirm password'
              placeholder='Re-enter password'
              type='password'
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
