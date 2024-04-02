'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form' 
import { useState } from 'react'

import { UserCreateFormSchema } from '@/models/FormSchemas'
import { createUser } from '@/actions/auth'

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
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'

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
    }
  });

  const onSubmit = async (values: z.infer<typeof UserCreateFormSchema>) => {
    const result = await createUser(values);

    if (result.success) {
      form.reset();
    }

    setSuccess(result.success);
    setError(result.error);
  };

  return (
    <FormCardWrapper title='Create user'>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className='space-y-6'
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-1'>
              <h4 className='text-lg font-semibold'>User data</h4>
              <div className='w-[240px] space-y-3'>
                <FormField 
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input 
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Enter username'
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
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Enter password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm password</FormLabel>
                      <FormControl>
                        <Input 
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Re-enter password'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='space-y-1'>
              <h4 className='text-lg font-semibold'>Personal data</h4>
              <div className='w-[240px] space-y-3'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input 
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Enter first name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                        <Input 
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Enter last name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField 
                  control={form.control}
                  name='degree'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input 
                          className='focus-visible:ring-[#096F9F]'
                          placeholder='Enter degree'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <FormSuccess message={success}/>
          <FormError message={error}/>
          <Button type='submit' className='w-full bg-[#0DB14B] hover:bg-[#008000]'>Create</Button>
        </form>
      </Form>
    </FormCardWrapper>
  )
}