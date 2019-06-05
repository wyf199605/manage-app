import * as React from "react";

export type StorageProps<T extends string = string> = {
    storage: {
        get: () => {[P in T]: string};
        set(name: T, value: string): void;
        set(name: Partial<{[P in T]: string}>): void;
        clear(name: T): void;
        clear(): void;
    };
};

export function storageCreator<T extends string = string> (...names: T[]) {
    type Result = {
        [P in typeof names[number]]: string;
    };

    let res: obj = {};
    names.forEach((name) => {
        res[name] = localStorage.getItem(name) || null;
    });

    function getStorage(): Result{
        return res;
    }

    function setStorage(name: Partial<Result>): void;
    function setStorage(name: typeof names[number], value: string): void;
    function setStorage(values, value?) {
        if(typeof values === 'string') {
            res[values] = value;
            localStorage.setItem(values, value);
        }else if (typeof values === 'object'){
            for(let key in values){
                res[key] = values[key];
                localStorage.setItem(key, values[key]);
            }
        }
    }

    function clear(): void;
    function clear(name: typeof names[number]): void;
    function clear(name?) {
        if(typeof name === 'string'){
            delete res[name];
            localStorage.removeItem(name);
        }else{
            res = {};
            for(let name of names){
                localStorage.removeItem(name);
            }
        }
    }

    return (Wrapper: React.ComponentType<StorageProps>) => {
        return class StorageWrapper extends React.Component {
            render(){
                return <Wrapper storage={{
                    get: getStorage,
                    set: setStorage,
                    clear
                }} {...this.props}/>;
            }

        };
    };
}
