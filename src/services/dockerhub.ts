"use server";

import { Tag } from "@/types/docker";

export const getDockerhubStats = async() =>{
    const imageResponse = await fetch("https://hub.docker.com/v2/repositories/flizzermdx/moonarr");
    const imageData = await imageResponse.json();

    const latestResponse = await fetch('https://hub.docker.com/v2/repositories/flizzermdx/moonarr/tags/latest');
    const latestData = await latestResponse.json();

    const tagResponse = await fetch("https://hub.docker.com/v2/repositories/flizzermdx/moonarr/tags");
    const tagData = await tagResponse.json();
    const tag = tagData?.results?.filter((tag: Tag) => tag.digest == latestData.digest && tag.name != "latest")[0]

    const response = {
        ...imageData,
        tags: {
            latest: {
                ...tag
            }
        }
    }
    return response;
}