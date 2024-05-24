import supabase from "./supabase"

const getUserData = async (id: number) => {
    // Fetch nickname from database
    let { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)

    return users
}

export default getUserData;