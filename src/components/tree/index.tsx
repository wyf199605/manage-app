
const TREE_PARENT = Symbol('tree_parent_filed');

interface ITreeProps<T> {
    children?: ITreeProps<T>[];
    content?: T;
    [TREE_PARENT]?: Tree<T>;
}

export class Tree<T = any> {

    constructor(props: ITreeProps<T> = {}) {
        this._parent = props[TREE_PARENT];
        this._content = props.content;
        if(props.children){
            this._children = props.children.map((childProps) => {
                return this._nodeCreate(childProps);
            });
        }
    }

    private _nodeCreate(childProps: ITreeProps<T>): Tree<T> {
        return new (this.constructor as any)(Object.assign({
            [TREE_PARENT]: this
        }, childProps));
    }

    private _content: T;
    get content(){
        return this._content;
    }

    private _parent: Tree<T>;
    get parent(){
        return this._parent;
    }

    private _children: Tree<T>[] = [];
    get children(){
        return this._children;
    }

    get siblings(): Tree<T>[]{
        if(this.parent){
            return this.parent.children.filter((child) => child !== this);
        }else{
            return [];
        }
    }

    get deep(): number{
        let deep = 0,
            current: Tree<T> = this;
        while(current = current.parent){
            deep ++;
            if (deep > 10000) {
                return null;
            }
        }
        return deep;
    }

    // 先序遍历
    each(callback: (tnode: Tree<T>, index: number) => void){
        let each = (tnode: Tree<T>, cb: (tnode: Tree<T>, deep: number) => void, startDeep = 0) => {
            if(tnode){
                callback(tnode, startDeep);
                startDeep ++;

                let children = tnode.children;
                Array.isArray(children) && children.forEach((childNode) => {
                    each(childNode, cb, startDeep);
                });
            }
        };
        each(this, callback);
    }

    destroy(){
        this._children && this._children.forEach((child) => {
            child.destroy();
        });
        this._parent = null;
        this._children = null;
        this._content = null;
    }
}


