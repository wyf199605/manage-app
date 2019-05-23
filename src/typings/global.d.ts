declare const module: any;

declare module '*.scss'{
    const content: any;
    export default content;
}

interface obj<T = any> {
    [any: string]: T;
}
