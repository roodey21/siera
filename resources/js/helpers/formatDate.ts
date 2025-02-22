import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatGmailDate = (date: string | Date): string => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (!parsedDate) return "Invalid Date";

    return format(parsedDate, "eeee, dd MMMM yyyy", { locale: id });
};
