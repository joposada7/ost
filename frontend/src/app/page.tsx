
'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./(components)/leaflet'), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

function Page() {
  return (
    <div>
      <MapComponent />
    </div>
  )
}


export default Page;