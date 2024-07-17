import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ComingSoon = () => {
  return (
    <div className="coming-soon container flex flex-col justify-center items-center">
      <h2>Stay tuned! Exciting new features are coming soon.</h2>
      <p>
        In the meantime, you can check out some of our existing functionalities by
        clicking the link below.
      </p>
      <Link href="/dashboard">
         <Button>Existing Features</Button>
      </Link>
    </div>
  );
};

export default ComingSoon;
