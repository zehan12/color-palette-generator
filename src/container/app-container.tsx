import { FC, memo, ReactNode } from "react"

interface AppContainerPropsType {
    children:ReactNode;
}

export const AppContainer:FC<AppContainerPropsType> = memo(({children}) => {
    return(<>
    {children}
    </>)
});

AppContainer.displayName = "AppContainer";