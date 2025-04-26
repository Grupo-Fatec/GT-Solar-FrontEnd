import { Children } from "./Children.type";

export type RouterRaw = {
    title: string;
    path: string;
    layout: any
    children?: Children[]
}