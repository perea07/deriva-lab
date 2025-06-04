import { Link } from 'react-router-dom';

function Home() {
  const cards = [
    { title: 'Ley de Ohm', path: '/ohm-law' },
    { title: 'Ley de Newton', path: '/newton-law' },
    { title: 'Mantenimiento de Autos', path: '/car-maintenance' },
    { title: 'Derivada con Raíz', path: '/derivada-raiz' }
  ];

  return (
    <div className="">
      <h1 className='text-center py-3'>Ejemplos</h1>
      <div className='d-flex flex-wrap justify-content-center gap-3'>
        {cards.map((card) => (
          <Link
            key={card.path}
            to={card.path}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              width: '230px',
              textAlign: 'center',
              background: '#62436d',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
