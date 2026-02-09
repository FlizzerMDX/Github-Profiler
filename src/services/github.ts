import { Octokit } from "@octokit/core";

export const getReadmeRepo = async(user, token) =>{
    const usr = user;
    const repo = user;
    const params = {
        method: "GET",
        url: `/repos/${usr}/${repo}`,
        params: {
            owner: usr,
            repo: repo,
        }
    }
    const t = await githubApiCall(token, params);
    console.log(t);
    console.log(t?.data?.private);
}

export const getReadmeContent = async(user, token) =>{
    const usr = user;
    const repo = user;
    const params = {
        method: "GET",
        url: `/repos/${usr}/${repo}/contents/README.md`,
        params: {
            owner: usr,
            repo: repo,
        }
    }
    const t = await githubApiCall(token, params);
    const readme = {
        success: true,
        content: atob(t?.data.content)
    };
    console.log(readme)
    return readme;
}

const githubApiCall = async(token, settings) =>{
    const octokit = new Octokit({
        auth: token
    })

    let data;
    try{
        data = await octokit.request(`${settings.method} ${settings.url}`, {
            ...settings.params,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    }
    catch{
        console.error("REPOSITORY DOESN'T EXIST!");
    }
    return data || undefined;
}