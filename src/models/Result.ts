export interface ResultGenerics<T> extends Result {
    data: T;
}

export interface Result {
    code: number;
    message: string;
}
