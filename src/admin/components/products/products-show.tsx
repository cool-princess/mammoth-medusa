import { useAdminCustomQuery } from "medusa-react";

export function ProductsShow(link, name) {
    const { data, isLoading } = useAdminCustomQuery<any, any>(link, [name]);
    return data;
}