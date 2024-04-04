'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' 

import { LoginFormSchema } from '@/models/FormSchemas'

import { FormCardWrapper } from '@/components/form/FormCardWrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormInput } from '@/components/form/FormInput'
import { FormButton } from '@/components/form/FormButton'

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log(values);
  };

  const currentHour = new Date().getHours();
  const title = (
    currentHour < 6 ? 'לילה טוב!' 
    : currentHour < 12 ? 'בוקר טוב!' 
    : currentHour < 18 ? 'צהריים טובים!' 
    : currentHour < 22 ? 'ערב טוב!'
    : 'לילה טוב!'
  );

  const usernameFieldState = form.getFieldState('username');
  const passwordFieldState = form.getFieldState('password');

  return (
    <FormCardWrapper title={`היי, ${title}`}>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className='space-y-6 w-[240px] md:w-[320px]'
        >
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
                    showValidIcon={usernameFieldState.isTouched}
                    isValid={!usernameFieldState.invalid}
                  />
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
                <FormLabel>סיסמא</FormLabel>
                <FormControl>
                  <FormInput 
                    field={field}
                    placeholder='הכנס סיסמא כאן'
                    type='password'
                    showValidIcon={passwordFieldState.isTouched}
                    isValid={!passwordFieldState.invalid}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormButton>כניסה למחלקה</FormButton>
        </form>
      </Form>
    </FormCardWrapper>
  )
}