import * as React from 'react';
export const validateControlled = (target: React.Component, value = 'value', onChange = 'onChange') => {
    let props = target.props;
    if(value in props && !(onChange in props)){
        throw new Error('受控 ' + target.constructor.name + ' 组件必须传入 ' + onChange + ' 参数！');
    }
};
