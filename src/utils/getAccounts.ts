import supabase from './supabase';

interface Account {
    nickname: string;
}

export const getAccounts = async (): Promise<Account[] | Error> => {
    try {
        let { data: accounts, error } = await supabase
            .from('accounts')
            .select('nickname');

        if (!accounts || accounts.length === 0) {
            return new Error('No accounts found');
        } else {
            // console.log(accounts);
            return accounts as Account[];
        }
    } catch (error: any) {
        return error as Error;
    }
};
