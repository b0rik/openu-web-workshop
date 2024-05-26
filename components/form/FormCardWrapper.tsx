import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

type FormCardWrapperProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export const FormCardWrapper = ({
  title,
  description,
  children,
}: FormCardWrapperProps) => {
  return (
    <Card className='bg-sky-50 text-sky-800'>
      <CardHeader className='text-center'>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {/* <CardFooter>

      </CardFooter> */}
    </Card>
  );
};
