export interface Module{
    key: string,
    name: string,
    description: string,
    repo: string,
    link: string,
    tags: string[],
    params: Params[],
}

export interface Params{
    key: string,
    name: string,
    description: string,
    type: string,
    required: boolean,
}

export interface Modules{
    modules: Module[],
}