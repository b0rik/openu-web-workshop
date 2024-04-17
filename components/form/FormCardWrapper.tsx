import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

interface FormCardWrapperProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}
export const FormCardWrapper = ({
  title,
  description,
  children,
}: FormCardWrapperProps) => {
  return (
    <Card className='w-fit max-w-[290px] sm:max-w-[714px] bg-[#eaf5f9] text-[#1e7489]'>
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
