import * as React from "react";
import {ComponentType} from "react";

type PageType = {default: ComponentType};

interface ILoadingProps{
    error: any;
    timeout: boolean;
    onRetry: Function;
}

interface IOption {
    loader: () => Promise<PageType>;
    loading?: ComponentType<ILoadingProps>;
    timeout?: number;
}

interface IProps extends obj {}

interface ILoadState {
    loading: boolean;
    error: any;
    loaded: PageType;
}

interface IState extends ILoadState{
    timeout: boolean;
}

function createElement(obj: any, props: obj) {
    let Component = obj && obj.__esModule ? obj.default : obj;
    return <Component {...props}/>;
}

function Loading(){
    return <div>loading</div>;
}

function load(loader: () => Promise<PageType>): {
    state: ILoadState;
    promise: Promise<PageType>;
} {
    let state: ILoadState = {
        error: null,
        loading: true,
        loaded: null
    };
    let promise = loader().then((res) => {
        console.log(res);
        state.loading = false;
        state.loaded = res;
        return res;
    }).catch((err) => {
        state.loading = false;
        state.error = err;
        throw err;
    });

    return {
        state,
        promise
    };
}

export function PageLoader(option: IOption): ComponentType {
    let LoadingComponent = option.loading || Loading,
        timeout = option.timeout,
        state: ILoadState,
        promise: Promise<PageType>;

    function init(){
        let res = load(option.loader);
        state = res.state;
        promise = res.promise;
    }

    class LoadComponent extends React.Component<IProps, IState>{
        constructor(props){
            super(props);
            init();
            this.state = {
                error: state.error,
                loading: state.loading,
                loaded: state.loaded,
                timeout: false
            };
        }

        componentWillMount() {
            this._mounted = true;
            this._loadModule();
        }

        private _mounted: boolean;
        private _timer: number;
        clearTimer(){
            clearTimeout(this._timer);
        }

        // 加载页面
        private _loadModule(){
            if(!state.loading){
                return ;
            }

            if(typeof timeout === 'number'){
                this._timer = setTimeout(() => {
                    this.setState({timeout: true});
                }, timeout);
            }

            promise.finally(() => {
                if(!this._mounted){
                    return;
                }
                this.setState({
                    error: state.error,
                    loading: state.loading,
                    loaded: state.loaded
                });
                this.clearTimer();
            });
        }

        componentWillUnmount(){
            this._mounted = false;
            this.clearTimer();
        }

        // 重新加载
        protected retry(){
            init();
            this.setState({
                error: null,
                loading: true,
                timeout: false
            }, () => {
                this._loadModule();
            });
        }

        render() {
            let {
                error,
                loading,
                loaded,
                timeout
            } = this.state;

            if(loading || error) {
                return <LoadingComponent error={error}
                    timeout={timeout}
                    onRetry={() => this.retry()}/>;
            }else if(loaded) {

                return createElement(loaded, this.props);
            }else {
                return null;
            }
        }
    }

    return LoadComponent;
}
