export interface GithubApiCallSetting{
    method?: string,
    url?: string,
    params?: object,
}

export interface GithubApiCallReturn{
    sha?: string,
}