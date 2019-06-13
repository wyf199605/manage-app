import * as React from 'react';
export const validateControlled = (target: React.Component, value = 'value', onChange = 'onChange') => {
    let props = target.props;
    if(value in props && !(onChange in props)){
        if(process.env.NODE_ENV !== 'production'){
            console.error('受控 ' + target.constructor.name + ' 组件必须传入 ' + onChange + ' 参数！');
        }
    }
};
