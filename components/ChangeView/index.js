import dynamic from 'next/dynamic';

const ChangeView = dynamic(() => import('./ChangeView'), {
  ssr: false
});

export default ChangeView;
