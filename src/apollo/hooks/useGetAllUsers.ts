import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../queries/user";

export const useGetAllUsers = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  return { data, loading, error };
};
