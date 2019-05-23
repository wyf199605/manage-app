declare const module: any;

declare module '*.scss'{

}

interface obj<T = any> {
    [any: string]: T;
}
