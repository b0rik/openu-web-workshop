import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

interface FormCardWrapperProps {
  title: string,
  description?: string,
  children?: React.ReactNode,
}
export const FormCardWrapper = ({
  title,
  description,
  children
}: FormCardWrapperProps) => {
  return (
    <Card className='w-fit max-w-[290px] md:max-w-[714px] text-[#363636]'>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {/* <CardFooter>

      </CardFooter> */}
    </Card>
  )
}