import supabase from './supabase';

interface Safe {
    nickname: string;
    percentage: number;
}

export const getSafes = async (): Promise<Safe[] | Error> => {
    try {
        let { data: safes, error } = await supabase
            .from('safes')
            .select('nickname,percentage');

        if (!safes || safes.length === 0) {
            console.error(error)
            return new Error("No safes found");
        } else {
            // console.log(safes);
            return safes as Safe[];
        }
    } catch (error: any) {
        console.error("Error while fetching safes:", error);
        throw error;
    }
};
