export interface OrderProduct{
    id?: number,
    product_id: number,
    order_id?: number,
    name: string,
    price: number,
    quantity: number,
    total?: number,
    imagecode?: string
}