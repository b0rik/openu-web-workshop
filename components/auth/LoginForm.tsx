'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { LoginFormSchema } from '@/models/FormSchemas';

import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormInput } from '@/components/form/FormInput';
import { FormButton } from '@/components/form/FormButton';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log(values);
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
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <FormInput field={field} placeholder='Enter username' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <FormInput
                      field={field}
                      placeholder='Enter password'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormButton>Login</FormButton>
          </form>
        </Form>
      </div>
    </FormCardWrapper>
  );
};
