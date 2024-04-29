import Quotation from '@/components/NewQuotation/Quotation';
import { GetDataFromId, Save} from '@/app/api/services/Example/data'

async function Home() {
  let res = await GetDataFromId(1);
  let save = await Save();
  console.log("-------------------------------- TESTE DA API ----------------------------")
  console.log(res)
  console.log(save)
  console.log("--------------------------------------------------------------------------")
  return (<div style={{height:'100%'}}>
            <div style={{position: 'absolute',right: "50px", top: '105px', zIndex: 10}}>
            {res.title}
            <br />
            Novo ID: {save.id}
            </div>
            <Quotation/>
          </div>);
  //Quando não precisar mais da referência -- Voltar ao return abaixo
  //  return <Quotation/>;
};

export default Home;