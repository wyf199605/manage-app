import * as React from "react";
import {TextInput} from "./components/text";
import {hot} from "react-hot-loader/root";


@hot
export class App extends React.Component{
    render(){
        return <div>
            <TextInput />
            <TextInput />
        </div>
    }
}

async function test() {
    setTimeout(() => {
        console.log(1111)
    }, 1000);
    return '1'
}
function *a(){
    yield 1
}

test().then(a => {
    console.log(a);
});

