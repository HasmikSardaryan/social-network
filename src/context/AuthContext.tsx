import { useState, useEffect, useMemo } from "react";
import { Axios } from "../lib/api";
import type { IResponse, IUser } from "../types";

const useAuthContext = () => {
  const [user, setUser] = useState<IUser|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Axios.get<IResponse>("/verify");
        const userData = res.data.payload as IUser ;
        setUser(userData);
      } 
      catch (err) {
        setUser(null);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const memoizedValue = useMemo(() => ({ user, loading }), [user, loading]);
  return memoizedValue;
};

export default useAuthContext;
