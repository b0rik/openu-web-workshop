'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' 

import { loginFormSchema } from '@/models/FormSchemas'

import { FormCardWrapper } from '@/components/FormCardWrapper'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
  };

  return (
    <FormCardWrapper title='Login'>
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input 
                    className='focus-visible:ring-[#363636]'
                    placeholder='Enter your username'
                    {...field}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder='********'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full bg-[#0DB14B] hover:bg-[#008000]'>Login</Button>
        </form>
      </Form>
    </FormCardWrapper>
  )
}