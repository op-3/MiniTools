import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

export const load: PageServerLoad = async () => {
  const toolModules = import.meta.glob("../lib/tools/*.ts");
  const toolPromises = Object.entries(toolModules).map(
    async ([path, resolver]) => {
      const resolvedModule = (await resolver()) as { default: Tool };
      return resolvedModule.default;
    }
  );

  try {
    const tools = await Promise.all(toolPromises);
    return { tools };
  } catch (e) {
    console.error("Error loading tools:", e);
    throw error(500, "Error loading tools");
  }
};
