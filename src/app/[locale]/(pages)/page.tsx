import Quotation from '@/components/NewQuotation/Quotation';

async function Home({ params: { locale } }: { params: { locale: string } }) {
  return <Quotation />;
};

export default Home;