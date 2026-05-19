// export type DbOperationResult<T> = {
//     kind: "ok" | "not-found",
//     value: T | null
// }

// export type DbOperationSuccessResultNoValue = {
//     kind: "ok",
// }

export type DbOperationSuccessResult<T> = {
    kind: "ok",
    value: T
}

export type DbOperationNotFoundResult = {
    kind: "not-found",
}

export type DbOperationResult<T> = DbOperationSuccessResult<T> | DbOperationNotFoundResult