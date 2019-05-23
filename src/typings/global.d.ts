// 允许导入scss文件
declare module '*.scss'{
    const content: any;
    export default content;
}

// 自定义JSON格式
interface obj<T = any> {
    [any: string]: T;
}

// 基本类型
type Primitive = string | number | boolean | symbol | null | undefined;