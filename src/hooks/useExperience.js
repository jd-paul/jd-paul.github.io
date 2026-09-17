import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export function useExperience() {
  return useQuery({
    queryKey: ["experience"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("experience")
        .select("id, role, company, dates, highlights, display_order")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 minutes
  });
}
