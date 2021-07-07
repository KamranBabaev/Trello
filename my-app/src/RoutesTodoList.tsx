import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import AppWithRedux from "./AppWithRedux";

export const PATH = {
    APP: '/todolist-app',
}

function Routes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>

                {/*в начале мы попадаем на страницу '/' и переходим сразу на страницу APP*/}
                {/*exact нужен чтоб указать полное совподение (что после '/' ничего не будет)*/}
                <Route path={'/'} exact render={() => <Redirect to={PATH.APP}/>}/>

                {/*// add routes*/}
                <Route path={PATH.APP} render={() => <AppWithRedux/>}/>

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                {/*тут нужен компонент для роута 404*/}
            </Switch>
        </div>
    )
}

export default Routes
