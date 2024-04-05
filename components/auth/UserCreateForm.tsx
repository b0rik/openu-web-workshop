'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { UserCreateFormSchema } from '@/models/FormSchemas';
import { createUser } from '@/actions/auth';

import { FormCardWrapper } from '@/components/form/FormCardWrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormButton } from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSuccess } from '@/components/form/FormSuccess';
import { FormError } from '@/components/form/FormError';
import { ErrorMessage } from '@hookform/error-message';

export const UserCreateForm = () => {
  const [success, setSuccess] = useState<string | undefined>('');
  const [error, setError] = useState<string | undefined>('');
  const form = useForm<z.infer<typeof UserCreateFormSchema>>({
    resolver: zodResolver(UserCreateFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      degree: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
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
    <FormCardWrapper title='יצירת משתמש'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='w-[240px] md:w-[320px] space-y-1'>
              <h4 className='text-lg font-semibold'>פרטי משתמש</h4>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם משתמש</FormLabel>
                      <FormControl>
                        <FormInput
                          field={field}
                          placeholder='הכנס שם משתמש כאן'
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>סיסמה</FormLabel>
                      <FormControl>
                        <FormInput
                          field={field}
                          placeholder='הכנס סיסמה כאן'
                          type='password'
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>וידוא סיסמה</FormLabel>
                      <FormControl>
                        <FormInput
                          field={field}
                          placeholder='הכנס סיסמה שנית'
                          type='password'
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='w-[240px] md:w-[320px] space-y-1'>
              <h4 className='text-lg font-semibold'>פרטים אישיים</h4>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם פרטי</FormLabel>
                      <FormControl>
                        <FormInput
                          field={field}
                          placeholder='הכנס  שם פרטי כאן'
                        />
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
                      <FormLabel>שם משפחה</FormLabel>
                      <FormControl>
                        <FormInput
                          field={field}
                          placeholder='הכנס  שם משפחה כאן'
                        />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='degree'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תואר</FormLabel>
                      <FormControl>
                        <FormInput field={field} placeholder='הכנס תואר כאן' />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <FormButton>צור משתמש</FormButton>
        </form>
      </Form>
    </FormCardWrapper>
  );
};
