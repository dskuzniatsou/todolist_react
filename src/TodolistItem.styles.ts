import {CSSProperties} from "react";

export const getListItemSx = (isDone: boolean): CSSProperties => ({

    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? "line-through" : "none",
    fontWeight: isDone ? "300" : "700"

})
export const getBoxSx: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
}
