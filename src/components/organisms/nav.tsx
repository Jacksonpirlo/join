'use client';

import Image from 'next/image';
import Logo from "@/../public/logoRiwiJoin.svg"
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname(); // Obtener la ruta actual

  // Determinar qué botón mostrar según la ruta
  const isLoginPage = pathname === '/auth/login';
  const isRegisterPage = pathname === '/auth/register';

  return (
    <section className='flex items-center justify-around flex-wrap'>
      <nav className='mt-4.5 ml-4.5'>
        <ul>
          <li>
            <Image src={Logo} alt="Logo" width={110} height={21} />
          </li>
        </ul>
      </nav>

      {/* Si está en Login, mostrar botón Register */}
      {isLoginPage && (
        <Button onClick={() => router.push("/auth/register")}>
          Registrarse
        </Button>
      )}

      {/* Si está en Register, mostrar botón Login */}
      {isRegisterPage && (
        <Button onClick={() => router.push("/auth/login")}>
          Iniciar Sesión
        </Button>
      )}

      {/* Si no está en ninguna, mostrar ambos botones */}
      {!isLoginPage && !isRegisterPage && (
        <div className='flex gap-4'>
          <Button variant="outline" onClick={() => router.push("/auth/login")}>
            Iniciar Sesión
          </Button>
          <Button onClick={() => router.push("/auth/register")}>
            Registrarse
          </Button>
        </div>
      )}
    </section>
  )
}

export default Nav;
