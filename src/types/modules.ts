interface Module{
    key: string,
    name: string,
    description: string,
    repo: string,
    link: string,
    tags: string[],
    params: Params[],
}

interface Params{
    key: string,
    name: string,
    description: string,
    required: boolean,
}

export interface Modules{
    modules: Module[],
}