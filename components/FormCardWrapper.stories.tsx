import { FormCardWrapper } from './FormCardWrapper'

export default {
  component: FormCardWrapper,
  title: 'FormCardWrapper',
  tags: ['autodocs'],
}

export const Default = {
  args: {
    title: 'Title',
    children: <div>Hello World!</div>,
  }
}

export const WithDescription = {
  args: {
    ...Default.args,
    description: 'description',
  }
}