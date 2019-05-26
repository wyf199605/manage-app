import * as React from "react";
import {ComponentType} from "react";
import {func} from "prop-types";

type LoadFn = () => Promise<typeof import("page")>;


interface IOption{
    loader: LoadFn;
    loading?: ComponentType;
    error?: ComponentType;
    timeout?: number;
    delay?: number;
}

interface IProps extends obj{}

interface IState {
    status: "pending" | "resolve" | "reject";
}

function createElement (component: typeof import("page"), props: obj) {
    let Component = component.default;
    return <Component {...props}/>
}

function Loading(){
    return <div>loading...</div>
}

function Fail(){
    return <div>error</div>
}

export function PageLoader(option: IOption): obj {
    let LoadingComponent = option.loading || Loading,
        FailComponent = option.error || Fail;
    let promise: Promise<typeof import("page")>;



    return class AsyncComponent extends React.Component<IProps, IState>{
        constructor(props){
            super(props);
            this.state = {
                status: "pending"
            };

            promise = option.loader();
        }

        componentWillMount(){

        }

        private loadModule(){
            if(this.state.status !== "pending"){
                return
            }
        }

        render(){
            switch (this.state.status) {
                case "pending":
                    return <LoadingComponent/>;
                case "reject":
                    return <FailComponent/>;
            }
        }
    }
}