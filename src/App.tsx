// import { useState, useEffect } from 'react';
// import supabase from './utils/supabase';
import { Outlet} from 'react-router-dom';
import Header from './components/Header';

// interface account {
//   id: number;
//   created_at: string;
//   user_id: string;
//   nickname?: string;
//   public_key: string;
//   private_key?: string;
//   first_connected_at?: Date;
//   last_connected_at?: Date;
// }

function App()  {
  // const [accounts, setAccounts] = useState<account[]>([]);

  // useEffect(() => {
  //   getAccounts();
  // }, []);

  // async function getAccounts() {
  //   try {
      
  //     let { data: accounts, error } = await supabase
  //     .from('accounts')
  //     .select('*')

  //     console.log(accounts);

  //     if (accounts && accounts.length > 0) {
  //       setAccounts(accounts);
  //       console.log(accounts);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }

  return (
    <div className='layout'>
      <Header />
      <div className="content">
        <Outlet /> 
      </div>
      {/* <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.nickname}</li>
        ))}
      </ul>  Just testing the Supabase connection */}
      
    </div>
  );
}

export default App;
