import Link from 'next/link';
import { ModeToggle } from './ui/toggle-mode';

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <p className="text-xl font-bold text-black dark:text-white">Contact app mo to</p>
          </Link>
        </div>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="/">
              <p className="hover:text-gray-300 dark:text-white">Home</p>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <p className="hover:text-gray-300 dark:text-white">About</p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:text-gray-300 dark:text-white">Contact</p>
            </Link>
          </li>
          <li>
            <ModeToggle className="h-6 w-6" />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
