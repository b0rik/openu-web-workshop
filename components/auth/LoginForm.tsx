'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { LoginFormSchema } from '@/models/FormSchemas';
import { loginUser } from '@/actions/auth';

import { Form } from '@/components/ui/form';
import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import { FormInput } from '@/components/form/FormInput';
import { FormButton } from '@/components/form/FormButton';
import { FormError } from '@/components/form/FormError';

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    setError(undefined);
    const result = await loginUser(values);
    if (result?.error) {
      setError(result.error);
    }
  };

  const currentHour = new Date().getHours();
  const title =
    currentHour < 4
      ? 'Good Evening'
      : currentHour < 12
        ? 'Good Morning'
        : currentHour < 22
          ? 'Good Afternoon'
          : 'Good Evening';

  return (
    <FormCardWrapper
      title={`Hi, ${title}!`}
      description='Please enter your credentials to login to the system.'
    >
      <div className=''>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormInput
              name='email'
              label='Email'
              placeholder='Enter email'
            />
            <FormInput
              name='password'
              label='Password'
              placeholder='Enter password'
              type='password'
            />
            <FormError message={error} />
            <FormButton>Login</FormButton>
          </form>
        </Form>
      </div>
    </FormCardWrapper>
  );
};
