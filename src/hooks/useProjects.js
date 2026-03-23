import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabaseClient";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title, image_url, description, tools, project_link, display_order")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000, // treat data as fresh for 5 minutes
  });
}
