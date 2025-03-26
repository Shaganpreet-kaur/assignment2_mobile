import supabase  from "./Supabase";

export const getRecords = async () => {
  const { data, error } = await supabase.from("user_details").select("*");

  if (error) {
    throw error;
  }
  return data;
};
