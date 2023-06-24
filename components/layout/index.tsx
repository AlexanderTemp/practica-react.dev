import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout = ({title = 'Práctica React', children}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="sticky top-0 justify-between p-2">
        <div>
          <h2>Práctica React</h2>
        </div>
        <nav>
          <ul>
            <li>Basico</li>
            <li>Medio</li>
            <li>Avanzado</li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Layout;
