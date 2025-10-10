import Image from 'next/image';
import Logo from "@/../public/logoRiwiJoin.svg"
import Greeting from '../molecules/greeting';

const Nav = () => {
  return (
    <section className='flex items-center justify-around flex-wrap'>
    <nav className='mt-4.5 ml-4.5'>
      <ul>
        <li>
          <Image src={Logo} alt="Logo" width={110} height={21} />
        </li>
      </ul>
    </nav>

    <Greeting />
    </section>
  )
}

export default Nav;
